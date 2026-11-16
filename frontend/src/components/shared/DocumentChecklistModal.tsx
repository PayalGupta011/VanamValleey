import React, { useState, useEffect } from 'react';
import {
  X,
  Printer,
  ShieldCheck,
  FileText,
  User,
  Scale,
  CreditCard,
  Users,
  Check,
  ChevronRight,
  Info,
  MessageSquare,
} from 'lucide-react';

interface DocumentChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEnquiry?: () => void;
}

interface ChecklistItem {
  id: string;
  category: 'kyc' | 'legal' | 'finance' | 'nri';
  title: string;
  mandatory: boolean;
  authority: string;
  description: string;
  tip?: string;
}

const CHECKLIST_DATA: ChecklistItem[] = [
  // KYC & Identity
  {
    id: 'doc-1',
    category: 'kyc',
    title: 'Aadhaar Card (UIDAI Linked with Mobile)',
    mandatory: true,
    authority: 'Government of India (UIDAI)',
    description:
      'Mandatory for biometric e-Registry at the Balaghat Sub-Registrar office. Mobile number must be linked for OTP authentication.',
    tip: 'Ensure full name spelling matches exactly with PAN card.',
  },
  {
    id: 'doc-2',
    category: 'kyc',
    title: 'Permanent Account Number (PAN Card)',
    mandatory: true,
    authority: 'Income Tax Department of India',
    description:
      'Required for all property and land transactions exceeding Rs. 5 Lakhs under Section 139A of the IT Act.',
    tip: 'Original physical card or e-PAN copy with QR verification.',
  },
  {
    id: 'doc-3',
    category: 'kyc',
    title: 'Passport Size Photographs (4 Copies)',
    mandatory: true,
    authority: 'Recent Color Photos',
    description:
      'Affixed on the physical Sale Deed conveyance papers, Municipal mutation ledger, and Sub-Registrar archive records.',
    tip: 'White background taken within the last 6 months.',
  },
  {
    id: 'doc-4',
    category: 'kyc',
    title: 'Secondary Address & Identity Proof',
    mandatory: false,
    authority: 'Election Commission / RTO / Passport',
    description:
      'Voter ID card, Driving License, or valid Passport for secondary address verification.',
  },

  // Legal & Title Due Diligence
  {
    id: 'doc-5',
    category: 'legal',
    title: '100% Freehold Title Search Report (30-Year Search)',
    mandatory: true,
    authority: 'Govt. Approved Advocate / Legal Pleader',
    description:
      'Certified document verifying unbroken chain of ownership, non-encumbrance, and clear title deed with zero liens or mortgages.',
    tip: 'Provided complimentary by Vanam Valley legal desk.',
  },
  {
    id: 'doc-6',
    category: 'legal',
    title: 'Town & Country Planning (TNCP) Sanctioned Layout',
    mandatory: true,
    authority: 'Directorate of Town & Country Planning, MP',
    description:
      'Approved master layout sanction plan confirming residential zoning, 30ft road widths, open parks, and green corridors.',
  },
  {
    id: 'doc-7',
    category: 'legal',
    title: 'MP RERA Registration & Project Sanction Order',
    mandatory: true,
    authority: 'Madhya Pradesh Real Estate Regulatory Authority',
    description:
      'Government RERA certification providing complete buyer protection, transparent escrow milestones, and timely infrastructure.',
  },
  {
    id: 'doc-8',
    category: 'legal',
    title: 'Khasra-Khatauni & Land Revenue Diversion NOC',
    mandatory: true,
    authority: 'Revenue Department / SDM Balaghat',
    description:
      'Official revenue records verifying land diversion from agricultural to residential non-agricultural use.',
  },

  // Financial & Banking
  {
    id: 'doc-9',
    category: 'finance',
    title: 'Bank Statement (Last 6 Months)',
    mandatory: true,
    authority: 'Bank Branch / Net Banking PDF',
    description:
      'Required by lending institutions (SBI, HDFC, ICICI, BoB) for home loan disbursement and source of fund verification.',
  },
  {
    id: 'doc-10',
    category: 'finance',
    title: 'Salary Slips (3 Months) or ITR Acknowledgements (2 Years)',
    mandatory: false,
    authority: 'Employer / Income Tax Filing Receipt',
    description:
      'Form 16 / Salary slips for salaried buyers, or 2 years ITR with computation of income for self-employed professionals.',
    tip: 'Required only if applying for bank finance.',
  },
  {
    id: 'doc-11',
    category: 'finance',
    title: 'Cheque / RTGS Payment Clearance Proof for Token',
    mandatory: true,
    authority: 'Buyer Bank Account',
    description:
      'Clear banking transaction trail for token deposit and registry stamp duty fee.',
  },

  // NRI & Outstation Buyers
  {
    id: 'doc-12',
    category: 'nri',
    title: 'Valid Passport & Visa / OCI Card',
    mandatory: true,
    authority: 'Consulate / Ministry of External Affairs',
    description:
      'Required for Non-Resident Indians (NRIs) and Overseas Citizens of India (OCIs) investing in freehold residential property.',
  },
  {
    id: 'doc-13',
    category: 'nri',
    title: 'NRE / NRO Bank Account Details',
    mandatory: true,
    authority: 'Reserve Bank of India (RBI) Authorized Bank',
    description:
      'All property payments from overseas must route through inward remittance in foreign currency or NRE/NRO banking channels.',
  },
  {
    id: 'doc-14',
    category: 'nri',
    title: 'Power of Attorney (POA) Attested by Indian Embassy',
    mandatory: false,
    authority: 'Indian Consulate / High Commission Abroad',
    description:
      'If the NRI buyer cannot travel to Balaghat for registry, a registered POA executed in favor of a family member is required.',
    tip: 'Must be adjudicated at District Registrar office within 90 days.',
  },
];

export const DocumentChecklistModal: React.FC<DocumentChecklistModalProps> = ({
  isOpen,
  onClose,
  onOpenEnquiry,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'kyc' | 'legal' | 'finance' | 'nri'>('all');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Background Scroll Locking
  useEffect(() => {
    if (isOpen) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('modal-open');

      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
        document.body.classList.remove('modal-open');
        document.documentElement.classList.remove('modal-open');
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredDocs = CHECKLIST_DATA.filter((doc) => {
    if (activeTab === 'all') return true;
    return doc.category === activeTab;
  });

  const totalMandatory = CHECKLIST_DATA.filter((d) => d.mandatory).length;
  const completedMandatory = CHECKLIST_DATA.filter((d) => d.mandatory && checkedItems[d.id]).length;
  const progressPercent = Math.round((completedMandatory / totalMandatory) * 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="vanam-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 24, 18, 0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 2.5vh, 2rem) clamp(0.75rem, 2vw, 1.5rem)',
        overflowY: 'auto',
        overscrollBehavior: 'contain',
        boxSizing: 'border-box',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Container */}
      <div
        className="vanam-modal-card"
        style={{
          backgroundColor: '#FAF7F0',
          borderRadius: '28px',
          maxWidth: '960px',
          width: '100%',
          maxHeight: 'min(92vh, 850px)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          overscrollBehavior: 'contain',
          border: '2px solid rgba(201, 154, 67, 0.45)',
          boxShadow:
            '0 30px 80px rgba(0, 28, 20, 0.55), 0 0 40px rgba(201, 154, 67, 0.25)',
          animation: 'fadeScaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          fontFamily: "'Poppins', sans-serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* =========================================================================
            HEADER: DEEP EMERALD WITH GOLDEN LAUREL EMBLEM & SILK WAVE DIVIDER
            ========================================================================= */}
        <div
          style={{
            position: 'relative',
            backgroundColor: '#064B3B',
            backgroundImage:
              'linear-gradient(135deg, #023629 0%, #064B3B 55%, #0B5C49 100%)',
            padding: '24px 28px 16px',
            color: '#FFFFFF',
            flexShrink: 0,
          }}
        >
          {/* Close Button Top Right */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '18px',
              right: '20px',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              color: '#064B3B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
              transition: 'all 0.2s ease',
              zIndex: 10,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F4C66D';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <X size={18} strokeWidth={2.5} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Left Golden Laurel & Shield Emblem */}
            <div style={{ flexShrink: 0 }}>
              <svg width="68" height="68" viewBox="0 0 80 80" fill="none">
                <defs>
                  <linearGradient id="emblemGoldGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFF2D6" />
                    <stop offset="40%" stopColor="#F4C66D" />
                    <stop offset="100%" stopColor="#C99A43" />
                  </linearGradient>
                  <filter id="emblemGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
                  </filter>
                </defs>
                {/* Laurel Leaves Left */}
                <path d="M 22 58 C 16 52 14 38 18 24 C 20 28 22 34 23 42 C 20 46 21 52 22 58 Z" fill="url(#emblemGoldGrad)" opacity="0.9" />
                <path d="M 17 48 C 12 44 11 36 14 30 C 16 34 18 38 18 44 Z" fill="url(#emblemGoldGrad)" />
                <path d="M 19 36 C 15 32 15 24 19 18 C 20 23 21 28 21 33 Z" fill="url(#emblemGoldGrad)" />
                <path d="M 24 26 C 22 20 25 14 30 11 C 29 16 28 21 26 24 Z" fill="url(#emblemGoldGrad)" />
                {/* Laurel Leaves Right */}
                <path d="M 58 58 C 64 52 66 38 62 24 C 60 28 58 34 57 42 C 60 46 59 52 58 58 Z" fill="url(#emblemGoldGrad)" opacity="0.9" />
                <path d="M 63 48 C 68 44 69 36 66 30 C 64 34 62 38 62 44 Z" fill="url(#emblemGoldGrad)" />
                <path d="M 61 36 C 65 32 65 24 61 18 C 60 23 59 28 59 33 Z" fill="url(#emblemGoldGrad)" />
                <path d="M 56 26 C 58 20 55 14 50 11 C 51 16 52 21 54 24 Z" fill="url(#emblemGoldGrad)" />
                {/* Shield Center */}
                <path
                  d="M 40 16 L 56 23 C 56 42 48 55 40 62 C 32 55 24 42 24 23 Z"
                  fill="#043226"
                  stroke="url(#emblemGoldGrad)"
                  strokeWidth="2.5"
                  filter="url(#emblemGlow)"
                />
                <path
                  d="M 40 20 L 52 25.5 C 52 40 45.5 50.5 40 56.5 C 34.5 50.5 28 40 28 25.5 Z"
                  stroke="url(#emblemGoldGrad)"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.6"
                />
                {/* Checklist Rows Inside Shield */}
                <path d="M 33 30 L 36 33 L 41 28" stroke="url(#emblemGoldGrad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 44 31 L 48 31" stroke="url(#emblemGoldGrad)" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M 33 38 L 36 41 L 41 36" stroke="url(#emblemGoldGrad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 44 39 L 48 39" stroke="url(#emblemGoldGrad)" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M 33 46 L 36 49 L 41 44" stroke="url(#emblemGoldGrad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 44 47 L 48 47" stroke="url(#emblemGoldGrad)" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>

            {/* Title & Subtitle */}
            <div style={{ flex: 1, paddingRight: '48px' }}>
              {/* Eyebrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F4C66D', marginBottom: '4px' }}>
                <ShieldCheck size={16} color="#F4C66D" />
                <span
                  style={{
                    fontSize: 'clamp(0.72rem, 0.9vw, 0.78rem)',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}
                >
                  100% CLEAR TITLE & FREEHOLD REGISTRY
                </span>
                <span
                  style={{
                    flex: 1,
                    maxWidth: '120px',
                    height: '1.5px',
                    background: 'linear-gradient(90deg, #F4C66D, transparent)',
                  }}
                />
              </div>

              {/* Main Heading */}
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(1.5rem, 2.4vw, 2.15rem)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  margin: '0 0 5px 0',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                }}
              >
                Property Purchase Document{' '}
                <span style={{ color: '#F4C66D', fontStyle: 'italic', fontWeight: 600 }}>Checklist</span>
              </h2>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: 'clamp(0.8rem, 0.95vw, 0.88rem)',
                  color: '#D2E3DB',
                  margin: 0,
                  lineHeight: 1.45,
                  maxWidth: '740px',
                }}
              >
                Everything required for smooth paperwork, legal search verification, bank loans, and sub-registrar biometric registry at Vanam Valley Balaghat.
              </p>
            </div>
          </div>
        </div>

        {/* Golden Silk Wave Transition Divider */}
        <div style={{ position: 'relative', width: '100%', height: '22px', overflow: 'hidden', marginTop: '-1px' }}>
          <svg viewBox="0 0 1000 36" fill="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} preserveAspectRatio="none">
            <path d="M 0 0 L 1000 0 L 1000 16 C 750 34, 380 4, 0 24 Z" fill="#064B3B" />
            <path d="M 0 24 C 380 4, 750 34, 1000 16" stroke="#C99A43" strokeWidth="2.5" fill="none" />
            <path d="M 0 28 C 420 10, 780 36, 1000 22" stroke="#F4C66D" strokeWidth="1.2" opacity="0.8" fill="none" />
          </svg>
        </div>

        {/* =========================================================================
            READINESS & PROGRESS TRACKER BAR
            ========================================================================= */}
        <div
          style={{
            backgroundColor: '#FAF7F0',
            padding: '14px 28px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            flexShrink: 0,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: '280px' }}>
            {/* Circular Progress Gauge */}
            <div
              style={{
                position: 'relative',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(6, 75, 59, 0.08)',
                border: '3px solid #E5DFD1',
              }}
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                style={{ position: 'absolute', top: -3, left: -3, transform: 'rotate(-90deg)' }}
              >
                <circle
                  cx="30"
                  cy="30"
                  r="25"
                  stroke="#064B3B"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="157.08"
                  strokeDashoffset={157.08 - (157.08 * progressPercent) / 100}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                />
              </svg>
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  color: '#002B20',
                }}
              >
                {progressPercent}%
              </span>
            </div>

            {/* Vertical subtle divider */}
            <div style={{ width: '1.5px', height: '36px', backgroundColor: 'rgba(201, 154, 67, 0.35)' }} />

            {/* Progress Text & Horizontal Bar */}
            <div style={{ flex: 1, maxWidth: '420px' }}>
              <div style={{ marginBottom: '6px' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#002B20', marginRight: '6px' }}>
                  Your Registry Readiness:
                </span>
                <span style={{ fontSize: '0.84rem', fontWeight: 500, color: '#6A665E' }}>
                  {completedMandatory} of {totalMandatory} Mandatory Docs Completed
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '10px',
                  backgroundColor: '#E6DFD1',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progressPercent}%`,
                    background:
                      progressPercent === 100
                        ? 'linear-gradient(90deg, #064B3B, #0D7A58)'
                        : 'linear-gradient(90deg, #C99A43, #F4C66D)',
                    borderRadius: '9999px',
                    transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right: Print Checklist Button */}
          <button
            type="button"
            onClick={handlePrint}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              backgroundColor: '#FFFFFF',
              color: '#002B20',
              border: '1.5px solid rgba(201, 154, 67, 0.45)',
              borderRadius: '12px',
              fontSize: '0.86rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(6, 75, 59, 0.05)',
              transition: 'all 0.2s ease',
              fontFamily: "'Poppins', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FAF6EF';
              e.currentTarget.style.borderColor = '#C99A43';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.borderColor = 'rgba(201, 154, 67, 0.45)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Printer size={16} color="#002B20" />
            <span>Print Checklist</span>
          </button>
        </div>

        {/* =========================================================================
            CATEGORY TABS BAR (FLOATING CAPSULE FILTER BAR)
            ========================================================================= */}
        <div style={{ padding: '0 28px 14px', backgroundColor: '#FAF7F0', flexShrink: 0 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: '9999px',
              padding: '4px',
              border: '1.5px solid rgba(201, 154, 67, 0.35)',
              boxShadow: '0 2px 8px rgba(6, 75, 59, 0.04)',
              overflowX: 'auto',
              maxWidth: '100%',
            }}
          >
            {[
              { id: 'all', label: 'All Documents (14)', icon: FileText },
              { id: 'kyc', label: 'Identity & KYC', icon: User },
              { id: 'legal', label: 'Legal & Approvals', icon: Scale },
              { id: 'finance', label: 'Bank & Payment', icon: CreditCard },
              { id: 'nri', label: 'NRI Buyers', icon: Users },
            ].map((tab, idx, arr) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <React.Fragment key={tab.id}>
                  <button
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      padding: '8px 18px',
                      borderRadius: '9999px',
                      border: 'none',
                      backgroundColor: isActive ? '#064B3B' : 'transparent',
                      color: isActive ? '#FFFFFF' : '#2A3A34',
                      fontSize: '0.84rem',
                      fontWeight: isActive ? 700 : 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.25s ease',
                      boxShadow: isActive ? '0 4px 12px rgba(6, 75, 59, 0.3)' : 'none',
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    <Icon size={15} color={isActive ? '#F4C66D' : '#8A7A63'} />
                    <span>{tab.label}</span>
                  </button>
                  {idx < arr.length - 1 && (
                    <div
                      style={{
                        width: '1px',
                        height: '18px',
                        backgroundColor: 'rgba(201, 154, 67, 0.25)',
                        margin: '0 2px',
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            DOCUMENT CARDS SCROLLABLE LIST
            ========================================================================= */}
        <div
          className="vanam-checklist-scroll"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '4px 28px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            backgroundColor: '#FAF7F0',
            maxHeight: '440px',
          }}
        >
          {filteredDocs.map((doc) => {
            const isChecked = Boolean(checkedItems[doc.id]);
            return (
              <div
                key={doc.id}
                onClick={() => toggleCheck(doc.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '16px 20px',
                  borderRadius: '18px',
                  backgroundColor: '#FFFFFF',
                  border: isChecked
                    ? '1.5px solid #064B3B'
                    : '1.5px solid rgba(201, 154, 67, 0.35)',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isChecked
                    ? '0 6px 18px rgba(6, 75, 59, 0.08)'
                    : '0 3px 12px rgba(6, 75, 59, 0.03)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C99A43';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(201, 154, 67, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isChecked
                    ? '#064B3B'
                    : 'rgba(201, 154, 67, 0.35)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isChecked
                    ? '0 6px 18px rgba(6, 75, 59, 0.08)'
                    : '0 3px 12px rgba(6, 75, 59, 0.03)';
                }}
              >
                {/* Custom Checkbox */}
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    border: isChecked ? '2px solid #064B3B' : '2px solid #6A7A73',
                    backgroundColor: isChecked ? '#064B3B' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '2px',
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isChecked && <Check size={16} color="#FFFFFF" strokeWidth={3} />}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  {/* Top Line: Title + Badge + Divider + Authority + Right Arrow */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                      marginBottom: '5px',
                    }}
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                      <h4
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.98rem',
                          fontWeight: 700,
                          color: '#002B20',
                          margin: 0,
                          textDecoration: isChecked ? 'line-through' : 'none',
                          opacity: isChecked ? 0.75 : 1,
                        }}
                      >
                        {doc.title}
                      </h4>

                      {doc.mandatory ? (
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            color: '#966122',
                            backgroundColor: '#FDF1DF',
                            border: '1px solid rgba(201, 154, 67, 0.4)',
                            padding: '3px 10px',
                            borderRadius: '9999px',
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                          }}
                        >
                          MANDATORY
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            color: '#6A665E',
                            backgroundColor: '#F0ECE4',
                            padding: '3px 10px',
                            borderRadius: '9999px',
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                          }}
                        >
                          AS APPLICABLE
                        </span>
                      )}

                      <span style={{ color: 'rgba(201, 154, 67, 0.45)', margin: '0 2px' }}>|</span>

                      <span style={{ fontSize: '0.82rem', color: '#5A6B63', fontWeight: 500 }}>
                        {doc.authority}
                      </span>
                    </div>

                    {/* Circular Action Badge */}
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#FDF1DF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      <ChevronRight size={18} color="#966122" />
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '0.86rem',
                      color: '#525E57',
                      margin: '0 0 6px 0',
                      lineHeight: 1.5,
                    }}
                  >
                    {doc.description}
                  </p>

                  {/* Mint Green Tip Banner */}
                  {doc.tip && (
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.8rem',
                        color: '#0A543A',
                        backgroundColor: '#E6F4EA',
                        border: '1px solid rgba(13, 98, 68, 0.15)',
                        padding: '5px 12px',
                        borderRadius: '8px',
                        fontWeight: 600,
                        marginTop: '2px',
                      }}
                    >
                      <Info size={14} color="#0D6244" />
                      <span>{doc.tip}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            FOOTER: LEGAL DESK ASSISTANCE BAR
            ========================================================================= */}
        <div
          style={{
            backgroundColor: '#FAF7F0',
            borderTop: '1.5px solid rgba(201, 154, 67, 0.3)',
            padding: '14px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
            flexShrink: 0,
            flexWrap: 'wrap',
          }}
        >
          {/* Left Text with Question Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: '#FDF1DF',
                border: '1.5px solid rgba(201, 154, 67, 0.45)',
                color: '#966122',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.86rem',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              ?
            </div>
            <span style={{ fontSize: '0.88rem', fontWeight: 500, color: '#2E3A33' }}>
              Need our legal team to review your documents or verify registry title deed?
            </span>
          </div>

          {/* Right Action: Divider & Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '1px',
                height: '28px',
                backgroundColor: 'rgba(201, 154, 67, 0.35)',
              }}
            />
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenEnquiry) onOpenEnquiry();
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '9px',
                padding: '10px 24px',
                borderRadius: '9999px',
                backgroundColor: '#064B3B',
                color: '#FFFFFF',
                border: '1.5px solid #C99A43',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(6, 75, 59, 0.25)',
                transition: 'all 0.25s ease',
                fontFamily: "'Poppins', sans-serif",
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#08734F';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(6, 75, 59, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#064B3B';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(6, 75, 59, 0.25)';
              }}
            >
              <MessageSquare size={16} color="#F4C66D" />
              <span>Speak to Legal Desk</span>
              <span style={{ fontSize: '1.1rem', lineHeight: 1, color: '#F4C66D' }}>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
