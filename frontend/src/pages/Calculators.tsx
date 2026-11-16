import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  RotateCcw,
  Sparkles,
  Building2,
  Calendar,
  Wallet,
  Percent,
  Home as HomeIcon,
  TrendingUp,
  Maximize2,
  FileCheck,
  Landmark,
} from 'lucide-react';

interface CalculatorsProps {
  onOpenEnquiry?: (interest?: string) => void;
  onOpenSiteVisit?: (property?: string) => void;
}

export const Calculators: React.FC<CalculatorsProps> = ({
  onOpenEnquiry,
  onOpenSiteVisit,
}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [activeTab, setActiveTab] = useState<'emi' | 'investment' | 'area' | 'stamp_duty'>('emi');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'investment' || tab === 'area' || tab === 'emi' || tab === 'stamp_duty') {
      setActiveTab(tab);
    }
  }, [location.search]);

  // ==========================================
  // 1. EMI CALCULATOR STATE & LOGIC
  // ==========================================
  const [loanAmount, setLoanAmount] = useState<number>(5000000); // 50 Lakhs default
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5% default
  const [loanTenure, setLoanTenure] = useState<number>(20); // 20 years default

  const calculateEMI = () => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = loanTenure * 12;

    if (r === 0) {
      const emi = P / n;
      return { emi: Math.round(emi), totalPayment: P, totalInterest: 0, principalRatio: 100, interestRatio: 0 };
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    const principalRatio = Math.round((P / totalPayment) * 100);
    const interestRatio = 100 - principalRatio;

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      principalRatio,
      interestRatio,
    };
  };

  const emiResults = calculateEMI();

  const resetEMI = () => {
    setLoanAmount(5000000);
    setInterestRate(8.5);
    setLoanTenure(20);
  };

  // Preset Pills
  const loanPresets = [
    { label: '₹25L', val: 2500000 },
    { label: '₹45L', val: 4500000 },
    { label: '₹50L', val: 5000000 },
    { label: '₹75L', val: 7500000 },
    { label: '₹1Cr', val: 10000000 },
    { label: '₹1.5Cr', val: 15000000 },
  ];

  const ratePresets = [7.9, 8.25, 8.5, 8.75, 9.25, 10.0, 14.0];

  const tenurePresets = [5, 10, 15, 20, 25, 30];

  // ==========================================
  // 2. INVESTMENT CALCULATOR STATE & LOGIC
  // ==========================================
  const [initialInvestment, setInitialInvestment] = useState<number>(6000000); // 60 Lakhs
  const [annualAppreciation, setAnnualAppreciation] = useState<number>(8.5); // 8.5% p.a.
  const [holdingPeriod, setHoldingPeriod] = useState<number>(7); // 7 years
  const [monthlyRental] = useState<number>(25000); // 25k/mo

  const calculateInvestment = () => {
    const futureValue = initialInvestment * Math.pow(1 + annualAppreciation / 100, holdingPeriod);
    const totalRentalIncome = monthlyRental * 12 * holdingPeriod;
    const capitalGains = futureValue - initialInvestment;
    const totalWealth = futureValue + totalRentalIncome;
    const totalGain = capitalGains + totalRentalIncome;
    const roi = Math.round((totalGain / initialInvestment) * 100);

    return {
      futureValue: Math.round(futureValue),
      capitalGains: Math.round(capitalGains),
      totalRentalIncome: Math.round(totalRentalIncome),
      totalWealth: Math.round(totalWealth),
      totalGain: Math.round(totalGain),
      roi,
    };
  };

  const investmentResults = calculateInvestment();

  // ==========================================
  // 3. AREA CONVERTER STATE & LOGIC
  // ==========================================
  const [areaValue, setAreaValue] = useState<number>(1551);
  const [areaUnit, setAreaUnit] = useState<string>('sqft');

  const toSqFt: Record<string, number> = {
    sqft: 1,
    sqm: 10.7639,
    sqyd: 9,
    acre: 43560,
    guntha: 1089,
    hectare: 107639,
  };

  const baseSqFt = areaValue * (toSqFt[areaUnit] || 1);

  const conversions = {
    sqft: (baseSqFt / toSqFt.sqft).toLocaleString('en-IN', { maximumFractionDigits: 1 }),
    sqm: (baseSqFt / toSqFt.sqm).toLocaleString('en-IN', { maximumFractionDigits: 2 }),
    sqyd: (baseSqFt / toSqFt.sqyd).toLocaleString('en-IN', { maximumFractionDigits: 2 }),
    acre: (baseSqFt / toSqFt.acre).toLocaleString('en-IN', { maximumFractionDigits: 4 }),
    guntha: (baseSqFt / toSqFt.guntha).toLocaleString('en-IN', { maximumFractionDigits: 2 }),
    hectare: (baseSqFt / toSqFt.hectare).toLocaleString('en-IN', { maximumFractionDigits: 4 }),
  };

  // ==========================================
  // 4. STAMP DUTY & REGISTRATION (MP RATES)
  // ==========================================
  const [propertyPrice, setPropertyPrice] = useState<number>(4500000); // 45 Lakhs
  const [buyerGender, setBuyerGender] = useState<'male' | 'female' | 'joint'>('joint');

  const calculateStampDuty = () => {
    let stampRate = 7.5;
    if (buyerGender === 'female') stampRate = 6.5;
    if (buyerGender === 'joint') stampRate = 7.0;

    const stampDuty = Math.round((propertyPrice * stampRate) / 100);
    const registrationFee = Math.round((propertyPrice * 3.0) / 100);
    const cess = Math.round((propertyPrice * 0.5) / 100);
    const totalGovtCharges = stampDuty + registrationFee + cess;

    return {
      stampRate,
      stampDuty,
      registrationFee,
      cess,
      totalGovtCharges,
    };
  };

  const stampDutyResults = calculateStampDuty();

  const formatINR = (num: number) => {
    return '₹' + num.toLocaleString('en-IN');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F2', fontFamily: "'Poppins', sans-serif" }}>
      {/* =========================================================================
          HERO BANNER: REAL ESTATE & WEALTH CALCULATORS
          Exact Reference Match (media_1794830864535_7bf7ce71.jpg)
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '440px',
          backgroundColor: '#00261E',
          backgroundImage: "url('/curved_villa_hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: 'clamp(4.5rem, 8vh, 6rem) 1.5rem 5rem',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        {/* Deep Sunset Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0, 38, 30, 0.82) 0%, rgba(0, 24, 18, 0.68) 50%, rgba(0, 18, 14, 0.94) 100%)',
            zIndex: 1,
          }}
        />

        {/* Ambient Warm Golden Sunlight Radial Overlay */}
        <div
          style={{
            position: 'absolute',
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '650px',
            height: '350px',
            background: 'radial-gradient(ellipse at center, rgba(244, 198, 109, 0.25) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '880px', margin: '0 auto' }}>
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '0.8rem',
            }}
          >
            <span
              style={{
                fontSize: 'clamp(0.74rem, 0.9vw, 0.82rem)',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#F7D6B0',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              ✦ FINANCIAL ARCHITECTURE &amp; PLANNING SUITE ✦
            </span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              lineHeight: 1.12,
              fontWeight: 800,
              color: '#FFFFFF',
              margin: '0 0 1rem 0',
              letterSpacing: '-0.02em',
              textShadow: '0 4px 20px rgba(0,0,0,0.7)',
            }}
          >
            Real Estate &amp; Wealth<br />
            <span
              style={{
                color: '#F7D6B0',
                fontStyle: 'italic',
                fontWeight: 600,
              }}
            >
              Calculators
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.15vw, 1.1rem)',
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.92)',
              maxWidth: '720px',
              margin: '0 auto',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            Plan smarter for your forest villa. Estimate EMIs, evaluate returns, convert land area, and check registration costs — all in one place.
          </p>
        </div>

        {/* Sweeping Golden Wave Separator */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '45px',
            pointerEvents: 'none',
            zIndex: 3,
          }}
        >
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
            <path d="M 0,35 Q 360,65 720,25 Q 1080,-15 1440,35 L 1440,60 L 0,60 Z" fill="#FAF7F2" />
            <path d="M 0,35 Q 360,65 720,25 Q 1080,-15 1440,35" fill="none" stroke="#C99A43" strokeWidth="2.5" opacity="0.85" />
          </svg>
        </div>
      </section>

      {/* =========================================================================
          TOP SEGMENTED TABS: 4 LUXURY PILL TABS
          Exact Match to Reference Design (media_1794830864535_7bf7ce71.jpg)
          ========================================================================= */}
      <section style={{ padding: '0 clamp(1.2rem, 3vw, 2.5rem)', marginTop: '-28px', position: 'relative', zIndex: 20 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '9999px',
              padding: '6px',
              boxShadow: '0 16px 40px rgba(6, 75, 59, 0.08), 0 2px 10px rgba(0,0,0,0.04)',
              border: '1.5px solid rgba(201, 154, 67, 0.35)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '6px',
            }}
            className="calculator-segmented-tabs"
          >
            {/* Tab 1: Home Loan EMI */}
            <button
              type="button"
              onClick={() => setActiveTab('emi')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                borderRadius: '9999px',
                backgroundColor: activeTab === 'emi' ? '#00382B' : 'transparent',
                color: activeTab === 'emi' ? '#FFFFFF' : '#002B20',
                border: activeTab === 'emi' ? '1.5px solid #C99A43' : '1.5px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: activeTab === 'emi' ? '0 8px 24px rgba(0, 56, 43, 0.3)' : 'none',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: activeTab === 'emi' ? 'rgba(201, 154, 67, 0.25)' : '#FAF7F2',
                  border: `1px solid ${activeTab === 'emi' ? '#C99A43' : '#E8E5DE'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: activeTab === 'emi' ? '#F7D6B0' : '#00382B',
                  flexShrink: 0,
                }}
              >
                <HomeIcon size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: activeTab === 'emi' ? '#FFFFFF' : '#002B20', lineHeight: 1.25 }}>
                  Home Loan EMI
                </div>
                <div style={{ fontSize: '0.72rem', color: activeTab === 'emi' ? '#F7D6B0' : '#7A756C', marginTop: '2px' }}>
                  Plan your home loan
                </div>
              </div>
            </button>

            {/* Tab 2: Wealth Growth (ROI) */}
            <button
              type="button"
              onClick={() => setActiveTab('investment')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                borderRadius: '9999px',
                backgroundColor: activeTab === 'investment' ? '#00382B' : 'transparent',
                color: activeTab === 'investment' ? '#FFFFFF' : '#002B20',
                border: activeTab === 'investment' ? '1.5px solid #C99A43' : '1.5px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: activeTab === 'investment' ? '0 8px 24px rgba(0, 56, 43, 0.3)' : 'none',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: activeTab === 'investment' ? 'rgba(201, 154, 67, 0.25)' : '#FAF7F2',
                  border: `1px solid ${activeTab === 'investment' ? '#C99A43' : '#E8E5DE'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: activeTab === 'investment' ? '#F7D6B0' : '#00382B',
                  flexShrink: 0,
                }}
              >
                <TrendingUp size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: activeTab === 'investment' ? '#FFFFFF' : '#002B20', lineHeight: 1.25 }}>
                  Wealth Growth (ROI)
                </div>
                <div style={{ fontSize: '0.72rem', color: activeTab === 'investment' ? '#F7D6B0' : '#7A756C', marginTop: '2px' }}>
                  Estimate returns
                </div>
              </div>
            </button>

            {/* Tab 3: Land Area Converter */}
            <button
              type="button"
              onClick={() => setActiveTab('area')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                borderRadius: '9999px',
                backgroundColor: activeTab === 'area' ? '#00382B' : 'transparent',
                color: activeTab === 'area' ? '#FFFFFF' : '#002B20',
                border: activeTab === 'area' ? '1.5px solid #C99A43' : '1.5px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: activeTab === 'area' ? '0 8px 24px rgba(0, 56, 43, 0.3)' : 'none',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: activeTab === 'area' ? 'rgba(201, 154, 67, 0.25)' : '#FAF7F2',
                  border: `1px solid ${activeTab === 'area' ? '#C99A43' : '#E8E5DE'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: activeTab === 'area' ? '#F7D6B0' : '#00382B',
                  flexShrink: 0,
                }}
              >
                <Maximize2 size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: activeTab === 'area' ? '#FFFFFF' : '#002B20', lineHeight: 1.25 }}>
                  Land Area Converter
                </div>
                <div style={{ fontSize: '0.72rem', color: activeTab === 'area' ? '#F7D6B0' : '#7A756C', marginTop: '2px' }}>
                  Convert land units
                </div>
              </div>
            </button>

            {/* Tab 4: MP Stamp Duty & Registry */}
            <button
              type="button"
              onClick={() => setActiveTab('stamp_duty')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                borderRadius: '9999px',
                backgroundColor: activeTab === 'stamp_duty' ? '#00382B' : 'transparent',
                color: activeTab === 'stamp_duty' ? '#FFFFFF' : '#002B20',
                border: activeTab === 'stamp_duty' ? '1.5px solid #C99A43' : '1.5px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: activeTab === 'stamp_duty' ? '0 8px 24px rgba(0, 56, 43, 0.3)' : 'none',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: activeTab === 'stamp_duty' ? 'rgba(201, 154, 67, 0.25)' : '#FAF7F2',
                  border: `1px solid ${activeTab === 'stamp_duty' ? '#C99A43' : '#E8E5DE'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: activeTab === 'stamp_duty' ? '#F7D6B0' : '#00382B',
                  flexShrink: 0,
                }}
              >
                <FileCheck size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: activeTab === 'stamp_duty' ? '#FFFFFF' : '#002B20', lineHeight: 1.25 }}>
                  MP Stamp Duty &amp; Registry
                </div>
                <div style={{ fontSize: '0.72rem', color: activeTab === 'stamp_duty' ? '#F7D6B0' : '#7A756C', marginTop: '2px' }}>
                  Calculate total charges
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN CALCULATOR INTERACTIVE STAGE
          Split Card Layout: Left Inputs Card + Right Emerald Results Card
          ========================================================================= */}
      <section style={{ padding: 'clamp(2.5rem, 5vh, 4rem) clamp(1.2rem, 3.5vw, 3.5rem)', backgroundColor: '#FAF7F2' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* TAB 1: HOME LOAN EMI (EXACT MATCH TO REFERENCE IMAGE 3) */}
          {activeTab === 'emi' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
                gap: 'clamp(1.5rem, 3vw, 2.5rem)',
                alignItems: 'stretch',
              }}
            >
              {/* -------------------------------------------------------------
                  LEFT BOX: INPUTS FORM CARD
                  ------------------------------------------------------------- */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '28px',
                  border: '1.5px solid rgba(201, 154, 67, 0.4)',
                  padding: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                  boxShadow: '0 16px 40px rgba(6, 75, 59, 0.06), 0 2px 8px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem',
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        backgroundColor: '#FFE6BD',
                        border: '1.5px solid #C99A43',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 10px rgba(201, 154, 67, 0.25)',
                        flexShrink: 0,
                      }}
                    >
                      <HomeIcon size={22} color="#00382B" />
                    </div>
                    <div>
                      <h2
                        style={{
                          fontSize: 'clamp(1.2rem, 1.6vw, 1.45rem)',
                          fontWeight: 800,
                          color: '#002B20',
                          margin: 0,
                          lineHeight: 1.25,
                        }}
                      >
                        Home Loan EMI Calculator
                      </h2>
                      <p style={{ fontSize: '0.8rem', color: '#6B665E', margin: '3px 0 0', lineHeight: 1.4 }}>
                        Get an instant estimate of your monthly EMI and total repayment.
                      </p>
                    </div>
                  </div>

                  {/* Reset Button */}
                  <button
                    type="button"
                    onClick={resetEMI}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      backgroundColor: '#FAF7F2',
                      border: '1px solid #D1CDC4',
                      color: '#5C574F',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFE6BD';
                      e.currentTarget.style.color = '#002B20';
                      e.currentTarget.style.borderColor = '#C99A43';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FAF7F2';
                      e.currentTarget.style.color = '#5C574F';
                      e.currentTarget.style.borderColor = '#D1CDC4';
                    }}
                  >
                    <RotateCcw size={13} />
                    <span>Reset</span>
                  </button>
                </div>

                {/* Slider 1: Loan Amount */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: 700, color: '#002B20' }}>
                      <Wallet size={17} color="#004B3C" />
                      <span>Loan Amount</span>
                    </label>
                    <div
                      style={{
                        padding: '5px 16px',
                        borderRadius: '9999px',
                        backgroundColor: '#FAF0E1',
                        border: '1px solid rgba(201, 154, 67, 0.45)',
                        color: '#00382B',
                        fontWeight: 800,
                        fontSize: '1.05rem',
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      {formatINR(loanAmount)}
                    </div>
                  </div>

                  <input
                    type="range"
                    min={1000000}
                    max={30000000}
                    step={100000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    style={{
                      width: '100%',
                      accentColor: '#004B3C',
                      cursor: 'pointer',
                      height: '7px',
                    }}
                  />

                  {/* Range Labels */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#7A756C', marginTop: '4px' }}>
                    <span>₹25 Lakhs</span>
                    <span>₹1.5 Crores</span>
                    <span>₹3 Crores</span>
                  </div>

                  {/* Quick Preset Pills */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                    {loanPresets.map((preset) => {
                      const isSel = loanAmount === preset.val;
                      return (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setLoanAmount(preset.val)}
                          style={{
                            padding: '4px 14px',
                            borderRadius: '9999px',
                            backgroundColor: isSel ? '#00382B' : '#FAF7F2',
                            color: isSel ? '#F7D6B0' : '#4A463F',
                            border: `1.2px solid ${isSel ? '#C99A43' : '#D1CDC4'}`,
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Slider 2: Interest Rate (p.a.) */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: 700, color: '#002B20' }}>
                      <Percent size={17} color="#004B3C" />
                      <span>Interest Rate (p.a.)</span>
                    </label>
                    <div
                      style={{
                        padding: '5px 16px',
                        borderRadius: '9999px',
                        backgroundColor: '#FAF0E1',
                        border: '1px solid rgba(201, 154, 67, 0.45)',
                        color: '#00382B',
                        fontWeight: 800,
                        fontSize: '1.05rem',
                      }}
                    >
                      {interestRate}%
                    </div>
                  </div>

                  <input
                    type="range"
                    min={7.0}
                    max={15.0}
                    step={0.05}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    style={{
                      width: '100%',
                      accentColor: '#004B3C',
                      cursor: 'pointer',
                      height: '7px',
                    }}
                  />

                  {/* Quick Preset Pills */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                    {ratePresets.map((r) => {
                      const isSel = interestRate === r;
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setInterestRate(r)}
                          style={{
                            padding: '4px 14px',
                            borderRadius: '9999px',
                            backgroundColor: isSel ? '#00382B' : '#FAF7F2',
                            color: isSel ? '#F7D6B0' : '#4A463F',
                            border: `1.2px solid ${isSel ? '#C99A43' : '#D1CDC4'}`,
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {r}%
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Slider 3: Tenure */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: 700, color: '#002B20' }}>
                      <Calendar size={17} color="#004B3C" />
                      <span>Tenure</span>
                    </label>
                    <div
                      style={{
                        padding: '5px 16px',
                        borderRadius: '9999px',
                        backgroundColor: '#FAF0E1',
                        border: '1px solid rgba(201, 154, 67, 0.45)',
                        color: '#00382B',
                        fontWeight: 800,
                        fontSize: '1rem',
                      }}
                    >
                      {loanTenure} Years ({loanTenure * 12} Months)
                    </div>
                  </div>

                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={1}
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    style={{
                      width: '100%',
                      accentColor: '#004B3C',
                      cursor: 'pointer',
                      height: '7px',
                    }}
                  />

                  {/* Quick Preset Pills */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                    {tenurePresets.map((t) => {
                      const isSel = loanTenure === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setLoanTenure(t)}
                          style={{
                            padding: '4px 14px',
                            borderRadius: '9999px',
                            backgroundColor: isSel ? '#00382B' : '#FAF7F2',
                            color: isSel ? '#F7D6B0' : '#4A463F',
                            border: `1.2px solid ${isSel ? '#C99A43' : '#D1CDC4'}`,
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {t} Yrs
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------------
                  RIGHT BOX: DEEP FOREST EMERALD RESULTS CARD
                  Exact Match to Reference Design (media_1794830864535_7bf7ce71.jpg)
                  ------------------------------------------------------------- */}
              <div
                style={{
                  backgroundColor: '#00382B',
                  borderRadius: '28px',
                  border: '1.5px solid rgba(201, 154, 67, 0.55)',
                  padding: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                  boxShadow: '0 24px 60px rgba(0, 38, 30, 0.35), 0 0 30px rgba(201, 154, 67, 0.15)',
                  color: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.75rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Card Top Row: Eyebrow + Reducing Balance Chip */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={16} color="#F4C66D" />
                      <span
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: '#F4C66D',
                        }}
                      >
                        YOUR EMI ESTIMATE
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(74, 222, 128, 0.15)',
                        border: '1px solid rgba(74, 222, 128, 0.4)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#4ADE80',
                      }}
                    >
                      <span>🍃</span>
                      <span>Reducing Balance</span>
                    </div>
                  </div>

                  {/* Monthly Payment Big Text */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
                      ₹{emiResults.emi.toLocaleString('en-IN')}{' '}
                      <span style={{ fontSize: '1rem', fontWeight: 500, color: 'rgba(255, 255, 255, 0.7)' }}>/ month</span>
                    </div>
                  </div>

                  {/* Dual Progress Bar Breakdown */}
                  <div style={{ marginBottom: '1.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
                      <span style={{ color: '#34D399' }}>Principal: {emiResults.principalRatio}%</span>
                      <span style={{ color: '#FBBF24' }}>Interest: {emiResults.interestRatio}%</span>
                    </div>

                    <div
                      style={{
                        width: '100%',
                        height: '9px',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        overflow: 'hidden',
                        display: 'flex',
                      }}
                    >
                      <div
                        style={{
                          width: `${emiResults.principalRatio}%`,
                          height: '100%',
                          backgroundColor: '#10B981',
                          transition: 'width 0.4s ease',
                        }}
                      />
                      <div
                        style={{
                          width: `${emiResults.interestRatio}%`,
                          height: '100%',
                          backgroundColor: '#F59E0B',
                          transition: 'width 0.4s ease',
                        }}
                      />
                    </div>
                  </div>

                  {/* 3 Metric Rows */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.12)', paddingTop: '1.25rem' }}>
                    {/* Row 1: Principal Loan Amount */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.88rem' }}>
                        <Building2 size={16} color="#F4C66D" />
                        <span>Principal Loan Amount</span>
                      </div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF' }}>
                        {formatINR(loanAmount)}
                      </div>
                    </div>

                    {/* Row 2: Total Interest Payable */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.88rem' }}>
                        <Percent size={16} color="#F4C66D" />
                        <span>Total Interest Payable</span>
                      </div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF' }}>
                        {formatINR(emiResults.totalInterest)}
                      </div>
                    </div>

                    {/* Row 3: Total Repayment (P + I) with Gold Pill Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.88rem' }}>
                        <Landmark size={16} color="#F4C66D" />
                        <span>Total Repayment (P + I)</span>
                      </div>
                      <div
                        style={{
                          padding: '6px 18px',
                          borderRadius: '9999px',
                          backgroundColor: '#FDE7BE',
                          color: '#00261E',
                          fontWeight: 800,
                          fontSize: '1.15rem',
                          fontFamily: "'Poppins', sans-serif",
                          boxShadow: '0 4px 14px rgba(244, 198, 109, 0.35)',
                        }}
                      >
                        {formatINR(emiResults.totalPayment)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions & Notice */}
                <div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '12px',
                      marginBottom: '1.25rem',
                    }}
                  >
                    {/* Primary Button: Get Bank Loan Assistance */}
                    <button
                      type="button"
                      onClick={() => onOpenEnquiry && onOpenEnquiry('Home Loan & Bank Assistance')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        borderRadius: '9999px',
                        background: 'linear-gradient(135deg, #FFE7CE 0%, #F7D6B0 45%, #E2B27B 100%)',
                        color: '#00261E',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 8px 24px rgba(247, 214, 176, 0.35)',
                        transition: 'all 0.25s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 12px 28px rgba(247, 214, 176, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(247, 214, 176, 0.35)';
                      }}
                    >
                      <Landmark size={16} color="#00261E" />
                      <span>Get Bank Loan Assistance →</span>
                    </button>

                    {/* Secondary Button: Book Site Tour */}
                    <button
                      type="button"
                      onClick={() => onOpenSiteVisit && onOpenSiteVisit('Vanam Valley Villa')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        borderRadius: '9999px',
                        backgroundColor: 'transparent',
                        color: '#FFFFFF',
                        border: '1.5px solid rgba(247, 214, 176, 0.6)',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(212, 168, 90, 0.2)';
                        e.currentTarget.style.borderColor = '#FFE5C2';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = 'rgba(247, 214, 176, 0.6)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Calendar size={16} color="#F4C66D" />
                      <span>Book Site Tour</span>
                    </button>
                  </div>

                  {/* Disclaimer Notice */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.45 }}>
                    <span style={{ fontSize: '0.9rem', color: '#F4C66D' }}>ⓘ</span>
                    <span>
                      Indicative amortization model based on reducing balance interest. Partner banks include SBI, HDFC, ICICI &amp; Bank of Baroda.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WEALTH GROWTH (ROI) */}
          {activeTab === 'investment' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
                gap: 'clamp(1.5rem, 3vw, 2.5rem)',
                alignItems: 'stretch',
              }}
            >
              {/* Left Inputs */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '28px',
                  border: '1.5px solid rgba(201, 154, 67, 0.4)',
                  padding: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                  boxShadow: '0 16px 40px rgba(6, 75, 59, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.75rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: '#FFE6BD',
                      border: '1.5px solid #C99A43',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TrendingUp size={22} color="#00382B" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#002B20', margin: 0 }}>
                      Wealth Growth &amp; Appreciation
                    </h2>
                    <p style={{ fontSize: '0.8rem', color: '#6B665E', margin: '3px 0 0' }}>
                      Estimate capital gains and compounded rental returns on Vanam forest residences.
                    </p>
                  </div>
                </div>

                {/* Investment Input */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#002B20' }}>Initial Capital</label>
                    <div style={{ padding: '4px 14px', borderRadius: '9999px', backgroundColor: '#FAF0E1', fontWeight: 800, color: '#00382B' }}>
                      {formatINR(initialInvestment)}
                    </div>
                  </div>
                  <input
                    type="range"
                    min={2000000}
                    max={30000000}
                    step={500000}
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#004B3C' }}
                  />
                </div>

                {/* Annual Appreciation Rate */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#002B20' }}>Annual Land Appreciation (% p.a.)</label>
                    <div style={{ padding: '4px 14px', borderRadius: '9999px', backgroundColor: '#FAF0E1', fontWeight: 800, color: '#00382B' }}>
                      {annualAppreciation}%
                    </div>
                  </div>
                  <input
                    type="range"
                    min={5.0}
                    max={18.0}
                    step={0.5}
                    value={annualAppreciation}
                    onChange={(e) => setAnnualAppreciation(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#004B3C' }}
                  />
                </div>

                {/* Holding Period */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#002B20' }}>Holding Horizon</label>
                    <div style={{ padding: '4px 14px', borderRadius: '9999px', backgroundColor: '#FAF0E1', fontWeight: 800, color: '#00382B' }}>
                      {holdingPeriod} Years
                    </div>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={20}
                    step={1}
                    value={holdingPeriod}
                    onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#004B3C' }}
                  />
                </div>
              </div>

              {/* Right Results */}
              <div
                style={{
                  backgroundColor: '#00382B',
                  borderRadius: '28px',
                  border: '1.5px solid rgba(201, 154, 67, 0.55)',
                  padding: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                  color: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.14em', color: '#F4C66D', textTransform: 'uppercase' }}>
                    ESTIMATED ASSET VALUE IN {holdingPeriod} YEARS
                  </span>
                  <div style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', fontWeight: 800, color: '#FFFFFF', marginTop: '6px' }}>
                    {formatINR(investmentResults.totalWealth)}
                  </div>
                  <div style={{ color: '#4ADE80', fontWeight: 700, fontSize: '0.95rem', marginTop: '4px' }}>
                    ✦ +{investmentResults.roi}% Net Appreciation Return
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Capital Gains:</span>
                    <strong style={{ color: '#F7D6B0' }}>{formatINR(investmentResults.capitalGains)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Cumulative Rental Flow:</span>
                    <strong style={{ color: '#F7D6B0' }}>{formatINR(investmentResults.totalRentalIncome)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Total Net Gain:</span>
                    <strong style={{ color: '#FFFFFF' }}>{formatINR(investmentResults.totalGain)}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenEnquiry && onOpenEnquiry('High-Yield Forest Plot Investment')}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #FFE7CE 0%, #F7D6B0 100%)',
                    color: '#00261E',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Consult Wealth Advisory Desk →
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: LAND AREA CONVERTER */}
          {activeTab === 'area' && (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '28px',
                border: '1.5px solid rgba(201, 154, 67, 0.4)',
                padding: 'clamp(2rem, 3.5vw, 3rem)',
                boxShadow: '0 16px 40px rgba(6, 75, 59, 0.06)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '2rem' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: '#FFE6BD',
                    border: '1.5px solid #C99A43',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Maximize2 size={22} color="#00382B" />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#002B20', margin: 0 }}>
                    Land &amp; Plot Unit Converter
                  </h2>
                  <p style={{ fontSize: '0.82rem', color: '#6B665E', margin: '3px 0 0' }}>
                    Convert plot square footage to regional MP land units (Guntha, Acre, Sq. Yards).
                  </p>
                </div>
              </div>

              {/* Input Row */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <input
                  type="number"
                  value={areaValue}
                  onChange={(e) => setAreaValue(Number(e.target.value) || 0)}
                  style={{
                    flex: 1,
                    minWidth: '220px',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    border: '1.5px solid #C99A43',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    outline: 'none',
                  }}
                />
                <select
                  value={areaUnit}
                  onChange={(e) => setAreaUnit(e.target.value)}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '12px',
                    border: '1.5px solid #C99A43',
                    fontSize: '0.94rem',
                    fontWeight: 700,
                    backgroundColor: '#FAF7F2',
                    cursor: 'pointer',
                  }}
                >
                  <option value="sqft">Square Feet (Sq. Ft.)</option>
                  <option value="sqyd">Square Yards (Gaj)</option>
                  <option value="sqm">Square Meters (Sq. Mtr.)</option>
                  <option value="guntha">Guntha</option>
                  <option value="acre">Acres</option>
                  <option value="hectare">Hectares</option>
                </select>
              </div>

              {/* Conversion Matrix */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
                <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: '#FAF7F2', border: '1px solid rgba(201, 154, 67, 0.3)' }}>
                  <div style={{ fontSize: '0.74rem', color: '#7A756C', fontWeight: 600, textTransform: 'uppercase' }}>Square Feet</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#002B20', marginTop: '4px' }}>{conversions.sqft} sq.ft.</div>
                </div>
                <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: '#FAF7F2', border: '1px solid rgba(201, 154, 67, 0.3)' }}>
                  <div style={{ fontSize: '0.74rem', color: '#7A756C', fontWeight: 600, textTransform: 'uppercase' }}>Square Yards (Gaj)</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#002B20', marginTop: '4px' }}>{conversions.sqyd} sq.yd.</div>
                </div>
                <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: '#FAF7F2', border: '1px solid rgba(201, 154, 67, 0.3)' }}>
                  <div style={{ fontSize: '0.74rem', color: '#7A756C', fontWeight: 600, textTransform: 'uppercase' }}>Guntha</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#002B20', marginTop: '4px' }}>{conversions.guntha} Guntha</div>
                </div>
                <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: '#FAF7F2', border: '1px solid rgba(201, 154, 67, 0.3)' }}>
                  <div style={{ fontSize: '0.74rem', color: '#7A756C', fontWeight: 600, textTransform: 'uppercase' }}>Acres</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#002B20', marginTop: '4px' }}>{conversions.acre} Acres</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MP STAMP DUTY & REGISTRATION */}
          {activeTab === 'stamp_duty' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
                gap: 'clamp(1.5rem, 3vw, 2.5rem)',
                alignItems: 'stretch',
              }}
            >
              {/* Inputs */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '28px',
                  border: '1.5px solid rgba(201, 154, 67, 0.4)',
                  padding: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                  boxShadow: '0 16px 40px rgba(6, 75, 59, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.75rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: '#FFE6BD',
                      border: '1.5px solid #C99A43',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FileCheck size={22} color="#00382B" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#002B20', margin: 0 }}>
                      MP Sub-Registrar Fee Calculator
                    </h2>
                    <p style={{ fontSize: '0.8rem', color: '#6B665E', margin: '3px 0 0' }}>
                      Calculate official Stamp Duty &amp; e-Registration fees in Balaghat, Madhya Pradesh.
                    </p>
                  </div>
                </div>

                {/* Property Value Slider */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#002B20' }}>Agreement / Deed Value</label>
                    <div style={{ padding: '4px 14px', borderRadius: '9999px', backgroundColor: '#FAF0E1', fontWeight: 800, color: '#00382B' }}>
                      {formatINR(propertyPrice)}
                    </div>
                  </div>
                  <input
                    type="range"
                    min={1000000}
                    max={25000000}
                    step={100000}
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#004B3C' }}
                  />
                </div>

                {/* Buyer Category */}
                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#002B20', display: 'block', marginBottom: '8px' }}>
                    Registry Ownership Category
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {(['joint', 'male', 'female'] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setBuyerGender(cat)}
                        style={{
                          padding: '10px',
                          borderRadius: '12px',
                          backgroundColor: buyerGender === cat ? '#00382B' : '#FAF7F2',
                          color: buyerGender === cat ? '#F7D6B0' : '#4A463F',
                          border: `1.2px solid ${buyerGender === cat ? '#C99A43' : '#D1CDC4'}`,
                          fontWeight: 700,
                          fontSize: '0.86rem',
                          cursor: 'pointer',
                          textTransform: 'capitalize',
                        }}
                      >
                        {cat === 'joint' ? 'Joint (7.0%)' : cat === 'female' ? 'Female (6.5%)' : 'Male (7.5%)'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Results */}
              <div
                style={{
                  backgroundColor: '#00382B',
                  borderRadius: '28px',
                  border: '1.5px solid rgba(201, 154, 67, 0.55)',
                  padding: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                  color: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.14em', color: '#F4C66D', textTransform: 'uppercase' }}>
                    TOTAL MP GOVERNMENT REGISTRY EXPENSE
                  </span>
                  <div style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', fontWeight: 800, color: '#FFFFFF', marginTop: '6px' }}>
                    {formatINR(stampDutyResults.totalGovtCharges)}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Stamp Duty ({stampDutyResults.stampRate}%):</span>
                    <strong style={{ color: '#F7D6B0' }}>{formatINR(stampDutyResults.stampDuty)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Sub-Registrar Biometric Fee (3%):</span>
                    <strong style={{ color: '#F7D6B0' }}>{formatINR(stampDutyResults.registrationFee)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Janpad / Municipal Cess (0.5%):</span>
                    <strong style={{ color: '#F7D6B0' }}>{formatINR(stampDutyResults.cess)}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenEnquiry && onOpenEnquiry('MP Title Deed Registry Verification')}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #FFE7CE 0%, #F7D6B0 100%)',
                    color: '#00261E',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Verify Title Deed with Legal Desk →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
