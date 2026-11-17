import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trees,
  Compass,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Play,
  X,
  Leaf,
  Home as HomeIcon,
  Layers,
  Clock,
  ExternalLink,
  Building2,
  Car,
  FileCheck,
  User,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
} from 'lucide-react';
import type { WebsiteSettings } from '../types';
import { api } from '../services/api';

interface HomeProps {
  settings?: WebsiteSettings | null;
  onOpenEnquiry: (interest?: string) => void;
  onOpenSiteVisit?: (property?: string) => void;
  onOpenChecklist?: () => void;
}

// Curated architectural photos for the right-hand panel (Slide 0 is the Grand Entrance Gate)
const HERO_RIGHT_SLIDES = [
  {
    id: 0,
    title: 'Vanam Valley Grand Entrance Gate',
    subtitle: '129 Curated 3 BHK Sanctuaries',
    url: '/vanam-grand-entrance.jpg',
  },
  {
    id: 1,
    title: 'The Signature Forest Villa',
    subtitle: 'Double-Height Living & Sundecks',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
  },
  {
    id: 2,
    title: 'Canopy Infinity Pool & Greens',
    subtitle: 'Gateway to Pench & Kanha',
    url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1920&q=85',
  },
];


// Signature Master-Planned Projects & Township Phases

// Strategic Location & Regional Connectivity Verified Brochure Data (Page 27)
const REGIONAL_DESTINATIONS = [
  {
    id: 'bypass',
    name: 'Wainganga Bypass Road',
    category: 'transit',
    dist: '07 Km',
    time: '10 Mins',
    route: 'Main Bypass Highway Arterial',
    tag: 'HIGHWAY BYPASS',
    access: 'Rapid State Highway Corridor',
    img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    desc: 'Direct arterial bypass ensuring effortless, non-congested vehicular transit connecting Vanam Valley to key district arterial roads and inter-state highways without entering inner-city traffic bottlenecks.',
    highlights: [
      'Immediate 10-minute access from Kaspur village gate',
      'Smooth multi-lane asphalt surface suitable for heavy & light vehicles',
      'Direct feeder connecting towards Gondia, Jabalpur & Seoni routes',
    ],
  },
  {
    id: 'river',
    name: 'Jagpura Ghat & Wainganga River',
    category: 'nature',
    dist: '10 Km',
    time: '15 Mins',
    route: 'Scenic Riverbed Connector',
    tag: 'NATURAL RIVERFRONT',
    access: 'Scenic Riverside Road',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    desc: 'The perennial lifeline of Balaghat district. Pristine sandy riverbeds, calming water breeze, and mesmerizing sunset vantage points offer residents an idyllic evening retreat close to home.',
    highlights: [
      'Pristine freshwater riverfront with natural sandbanks',
      'Serene spot for morning walks, bird-watching, and peaceful contemplation',
      'Picturesque sunset photography point right in Balaghat outskirts',
    ],
  },
  {
    id: 'bus',
    name: 'Balaghat Central Bus Stand',
    category: 'civic',
    dist: '10 Km',
    time: '15 Mins',
    route: 'City Transport Corridor',
    tag: 'REGIONAL TRANSIT',
    access: 'Central City Boulevard',
    img: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80',
    desc: 'Primary regional public transport and luxury bus terminus connecting Balaghat to Nagpur, Jabalpur, Raipur, Bhopal, and Gondia with frequent 24/7 express services.',
    highlights: [
      'Round-the-clock AC sleeper & deluxe inter-state bus services',
      'Direct connectivity to Nagpur (4.5 hrs) and Jabalpur (4 hrs)',
      'Adjacent to central city taxi stands and private rental operators',
    ],
  },
  {
    id: 'railway',
    name: 'Balaghat Railway Junction',
    category: 'transit',
    dist: '11 Km',
    time: '15 Mins',
    route: 'Main Boulevard Connector',
    tag: 'EXPRESS RAILWAY',
    access: 'South-East Central Railway Line',
    img: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80',
    desc: 'Key broad-gauge railway junction connecting Balaghat to Gondia, Jabalpur, Nainpur, and the national train grid with express passenger and freight trains.',
    highlights: [
      'Electrified broad gauge line with direct express trains',
      'Easy transit to Gondia Junction (a major Central Railway junction)',
      'Modernized station facilities with dedicated VIP parking & lounges',
    ],
  },
  {
    id: 'gangulpara',
    name: 'Gangulpara Waterfall & Eco-Dam',
    category: 'nature',
    dist: '21 Km',
    time: '20 Mins',
    route: 'Scenic Foothills Trail',
    tag: 'ECO-TOURISM RETREAT',
    access: 'Mountain Nature Highway',
    img: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    desc: 'A breathtaking natural cascade and reservoir surrounded by lush green hillocks. Famous for year-round fresh water bodies, natural rock formations, and peaceful eco-picnics.',
    highlights: [
      'Spectacular cascading waterfall during monsoon and winter seasons',
      'Surrounded by pristine teak forests and mountain viewpoints',
      'Popular family day-trip and trekking destination from Balaghat',
    ],
  },
  {
    id: 'sonewani',
    name: 'Sonewani Wildlife Sanctuary',
    category: 'nature',
    dist: '25 Km',
    time: '35 Mins',
    route: 'Forest Buffer Trail',
    tag: 'WILDLIFE SANCTUARY',
    access: 'Forest Reserve Buffer Road',
    img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80',
    desc: 'A protected forest sanctuary that forms part of the crucial Kanha-Pench wildlife corridor. Home to spotted deer, sambar, wild boars, leopards, and over 150 resident bird species.',
    highlights: [
      'Crucial ecological corridor connecting Kanha & Pench tiger zones',
      'Guided nature trails and bird watching opportunities',
      'Undisturbed virgin deciduous and bamboo woodland canopy',
    ],
  },
  {
    id: 'airport',
    name: 'Birsi Domestic Airport, Gondia',
    category: 'transit',
    dist: '31 Km',
    time: '45 Mins',
    route: '4-Lane Express Corridor',
    tag: 'AVIATION ACCESS',
    access: 'National Airport Highway',
    img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    desc: 'State-of-the-art regional domestic airport in Birsi, Gondia, operating commercial flights and private charter aviation for swift connections to major Indian metropolitan cities.',
    highlights: [
      'Commercial flights connecting to Hyderabad, Mumbai, and regional hubs',
      'Private charter handling capabilities and pilot training academy',
      'Smooth 45-minute highway drive from Vanam Valley doorstep',
    ],
  },
  {
    id: 'pench',
    name: 'Pench Tiger Reserve',
    category: 'nature',
    dist: '75 Km',
    time: '90 Mins',
    route: 'NH-543 Forest Corridor',
    tag: 'TIGER RESERVE',
    access: 'National Highway 543',
    img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    desc: "The legendary woodland realm that inspired Rudyard Kipling's iconic masterpiece 'The Jungle Book'. World-renowned for royal Bengal tigers, leopards, Indian wolves, and rich biodiversity.",
    highlights: [
      'World Heritage candidate and premier Project Tiger sanctuary',
      'Thriving tiger population with multiple morning & evening safari gates',
      'Scenic drive passing through untouched Satpura mountain fringes',
    ],
  },
  {
    id: 'kanha',
    name: 'Kanha Tiger Reserve & National Park',
    category: 'nature',
    dist: '85 Km',
    time: '75-85 Mins',
    route: 'State Highway 26 Scenic Belt',
    tag: 'ASIAS PREMIER PARK',
    access: 'State Highway 26',
    img: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80',
    desc: "Widely acclaimed as one of Asia's most impeccably managed tiger reserves. Spanning expansive sal forests, vast meadows, and the exclusive habitat of the rare Barasingha (swamp deer).",
    highlights: [
      'Highest probability of Royal Bengal Tiger sightings in Central India',
      'Only sanctuary in the world sheltering the southern swamp deer (Barasingha)',
      'World-class eco-tourism lodges, museum, and elephant patrols',
    ],
  },
];

export const Home: React.FC<HomeProps> = ({
  settings: _settings,
  onOpenEnquiry,
  onOpenSiteVisit,
  onOpenChecklist,
}) => {
  // CMS Dynamic Settings with Fallbacks
  const propOpt = _settings?.propertyOptions;
  const propEyebrow = propOpt?.eyebrow || '✦ EXCLUSIVE TOWNSHIP PROPERTIES ✦';
  const propHead1 = propOpt?.headingFirst || 'Explore Our';
  const propHead2 = propOpt?.headingSecond || 'Property Options';
  const propDesc =
    propOpt?.description ||
    'From 100% freehold residential plots to master-crafted duplex forest villas, choose the ideal living space designed for comfort, luxury, and generational legacy.';
  const card1Title = propOpt?.card1?.title || 'Duplex Villas';
  const card1Spec = propOpt?.card1?.spec || '1,551 sq.ft. Built-up';
  const card1Img = propOpt?.card1?.image || '/properties_showcase/villa_arch_photo_new.jpg';

  const card2Title = propOpt?.card2?.title || 'Vanam Valley Township';
  const card2Sub = propOpt?.card2?.subtitle || 'Planned Eco-Township';
  const card2Img = propOpt?.card2?.image || '/properties_showcase/township_arch_photo_new.jpg';

  const card3Title = propOpt?.card3?.title || 'Residential Plots';
  const card3Spec = propOpt?.card3?.spec || '1,200 – 3,500 sq.ft.';
  const card3Img = propOpt?.card3?.image || '/properties_showcase/plots_arch_photo_new.jpg';

  const sigProj = _settings?.signatureProjects;
  const sigEyebrow = sigProj?.eyebrow || 'THE MASTER ENCLAVES';
  const sigHeading = sigProj?.heading || 'Signature Projects & Phases';
  const sigSubtitle =
    sigProj?.subtitle ||
    'Three distinct residential and wellness enclaves crafted in pure harmony with the surrounding forest.';
  const sigIsland = sigProj?.islandImage || '/signature_projects/township_3d_island.png';

  const phase1Data = {
    title: sigProj?.phase1?.title || 'Rengatolla Gara Plots',
    spec: sigProj?.phase1?.spec || '1.76 Acres',
    desc:
      sigProj?.phase1?.description ||
      'Approved freehold plotted enclave nestled in Garra with modern infrastructure.',
    image: sigProj?.phase1?.image || '/signature_projects/phase1_plots.jpg',
  };
  const phase2Data = {
    title: sigProj?.phase2?.title || 'The Villa Reserve',
    spec: sigProj?.phase2?.spec || '1,551 Sq.Ft. | 3 BHK Duplex',
    desc:
      sigProj?.phase2?.description ||
      'Master-crafted 3 BHK duplex villas designed with panoramic forest views and private terrace gardens.',
    image: sigProj?.phase2?.image || '/signature_projects/phase2_villas.jpg',
  };
  const phase3Data = {
    title: sigProj?.phase3?.title || 'The Canopy Club',
    spec: sigProj?.phase3?.spec || '15,000 Sq.Ft.',
    desc:
      sigProj?.phase3?.description ||
      'Luxury resort-inspired clubhouse featuring an infinity pool, wellness spa, banquet hall, and lounge.',
    image: sigProj?.phase3?.image || '/signature_projects/phase3_club.jpg',
  };

  const leaf1Val = sigProj?.leaf1?.value || '27 Acres';
  const leaf1Lbl = sigProj?.leaf1?.label || 'Master Forest Territory';
  const leaf2Val = sigProj?.leaf2?.value || '129 Units';
  const leaf2Lbl = sigProj?.leaf2?.label || '3 BHK Duplex Residences';
  const leaf3Val = sigProj?.leaf3?.value || '15,000 Sq.Ft.';
  const leaf3Lbl = sigProj?.leaf3?.label || 'Canopy Resort Clubhouse';
  const leaf4Val = sigProj?.leaf4?.value || '100% Freehold';
  const leaf4Lbl = sigProj?.leaf4?.label || 'Registry-Ready Clear Titles';

  const curatedAmen = _settings?.curatedAmenities;
  const clubBannerImg = curatedAmen?.clubhouseImage || '/amenities_clubhouse_hero_hd.jpg';
  const amenCard1Img = curatedAmen?.card1?.image || '/amenities_card1_dining_hd.jpg';
  const amenCard2Img = curatedAmen?.card2?.image || '/amenities_card2_pool_hd.jpg';
  const amenCard3Img = curatedAmen?.card3?.image || '/amenities_card3_spa_hd.jpg';
  const highwayPortalImg = _settings?.connectivityHighwayImage || '/connectivity_highway_pristine.jpg';
  const amenEyebrow = curatedAmen?.eyebrow || 'RESORT-INSPIRED LIFESTYLE';
  const amenSubtitle =
    curatedAmen?.subtitle ||
    'Thoughtfully curated club, wellness, dining, and sports facilities designed to enrich life across every generation.';

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeProjectPhase, setActiveProjectPhase] = useState<number>(1);
  const [isPhaseAutoPaused, setIsPhaseAutoPaused] = useState<boolean>(false);
  const [townshipMouse, setTownshipMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Auto-cycle phases (01 -> 02 -> 03) continuously with smooth transition
  useEffect(() => {
    if (isPhaseAutoPaused) return;
    const interval = setInterval(() => {
      setActiveProjectPhase((prev) => (prev % 3) + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPhaseAutoPaused]);
  const [isAllDestinationsModalOpen, setIsAllDestinationsModalOpen] = useState(false);
  const [selectedDestinationDetail, setSelectedDestinationDetail] = useState<any | null>(null);
  const [modalCategory, setModalCategory] = useState<'all' | 'transit' | 'nature' | 'civic'>('all');
  const [amenityCategory, setAmenityCategory] = useState<'all' | 'club' | 'wellness' | 'sports' | 'events' | 'infra'>('all');
  const [selectedAmenityDetail, setSelectedAmenityDetail] = useState<any | null>(null);
  // Home Loan EMI Calculator States
  const [emiLoan, setEmiLoan] = useState<number>(4500000);
  const [emiRate, setEmiRate] = useState<number>(8.5);
  const [emiTenure, setEmiTenure] = useState<number>(20);
  // Inline Enquiry Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    interest: '3 BHK Duplex Villa (1,551 sq.ft.)',
    date: '',
    message: '',
  });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactErr, setContactErr] = useState('');



  // Auto-cycle right-hand slide every 7.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_RIGHT_SLIDES.length);
    }, 7500);
    return () => clearInterval(timer);
  }, []);

  // Lock background scrolling when any modal popup is open
  useEffect(() => {
    const isAnyModalActive =
      isAllDestinationsModalOpen ||
      !!selectedDestinationDetail ||
      !!selectedAmenityDetail ||
      isVideoModalOpen;

    if (isAnyModalActive) {
      const origBodyOverflow = document.body.style.overflow;
      const origHtmlOverflow = document.documentElement.style.overflow;

      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';

      return () => {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
        document.documentElement.style.overflow = origHtmlOverflow;
        document.body.style.overflow = origBodyOverflow;
      };
    }
  }, [isAllDestinationsModalOpen, selectedDestinationDetail, isVideoModalOpen]);



  return (
    <div style={{ backgroundColor: '#FAF9F5', minHeight: '100vh', overflowX: 'hidden', fontFamily: "'Poppins', sans-serif" }}>
      {/* =========================================================================
          HERO SECTION (CINEMATIC LUXURY ANIMATIONS & HIGHLIGHTS)
          Enhanced Shimmer Headline, Traveling Light Arc, Glass Badges, Ambient Glow
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: 'calc(100vh - 74px)',
          minHeight: '560px',
          maxHeight: 'calc(100vh - 74px)',
          backgroundColor: '#00261E',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          fontFamily: "'Poppins', sans-serif",
        }}
        className="hero-section"
      >
        {/* Right-Hand Architectural Photo Carousel: Vanam Valley Grand Entrance Gate & Villas */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '64%',
            height: '100%',
            overflow: 'hidden',
          }}
          className="hero-right-container"
        >
          {HERO_RIGHT_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: activeSlide === idx ? 1 : 0,
                transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <img
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
                src={slide.url}
                alt={slide.title}
                className={activeSlide === idx ? "hero-slide-active-img" : undefined}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center left',
                  transition: 'transform 1.2s ease',
                }}
              />
            </div>
          ))}

          {/* Warm Sunset Glow & Vignette over right photo */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(0, 38, 30, 0.1) 0%, transparent 40%, rgba(0, 20, 15, 0.45) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Floating Architectural Badge on Carousel Photo */}
          <div
            className="animate-float-subtle hero-photo-badge"
            style={{
              position: 'absolute',
              bottom: '26px',
              right: '26px',
              zIndex: 14,
              padding: '10px 18px',
              borderRadius: '16px',
              backgroundColor: 'rgba(0, 24, 18, 0.78)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1.2px solid rgba(247, 214, 176, 0.4)',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              maxWidth: '320px',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(212, 168, 90, 0.2)',
                border: '1px solid #D4A85A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D4A85A',
                flexShrink: 0,
              }}
            >
              <CheckCircle2 size={18} color="#D4A85A" />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.25 }}>
                {HERO_RIGHT_SLIDES[activeSlide]?.title || 'Grand Architectural Entrance Gate'}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#D4A85A', letterSpacing: '0.04em', marginTop: '2px' }}>
                ✦ Vanam Valley • Kaspu, Balaghat
              </div>
            </div>
          </div>

          {/* Carousel Slide Manual Nav Arrows on the Far Right */}
          <div
            className="hero-carousel-nav"
            style={{
              position: 'absolute',
              top: '50%',
              right: '20px',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              zIndex: 16,
            }}
          >
            <button
              type="button"
              onClick={() => setActiveSlide((prev) => (prev - 1 + HERO_RIGHT_SLIDES.length) % HERO_RIGHT_SLIDES.length)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 24, 18, 0.65)',
                border: '1px solid rgba(247, 214, 176, 0.4)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(212, 168, 90, 0.35)';
                e.currentTarget.style.borderColor = '#F7D6B0';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 24, 18, 0.65)';
                e.currentTarget.style.borderColor = 'rgba(247, 214, 176, 0.4)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              aria-label="Previous Slide"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setActiveSlide((prev) => (prev + 1) % HERO_RIGHT_SLIDES.length)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 24, 18, 0.65)',
                border: '1px solid rgba(247, 214, 176, 0.4)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(212, 168, 90, 0.35)';
                e.currentTarget.style.borderColor = '#F7D6B0';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 24, 18, 0.65)';
                e.currentTarget.style.borderColor = 'rgba(247, 214, 176, 0.4)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              aria-label="Next Slide"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* 100% Pure Botanical Leaves with Natural Breeze Animation */}
        <img
          loading="eager"
          decoding="async"
          src="/corner-leaves-pure.png"
          alt="Natural Tropical Foliage"
          className="animate-leaf-breeze"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 'clamp(140px, 14vw, 200px)',
            height: 'auto',
            pointerEvents: 'none',
            zIndex: 15,
            filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.55))',
          }}
        />

        {/* =======================================================================
            PURE SVG CURVED CANOPY & DUAL GOLD CONTOUR ARCS WITH TRAVELING LIGHT BEAD
            ======================================================================= */}
        <svg
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <defs>
            {/* Deep Forest Emerald Radial Gradient */}
            <radialGradient id="emeraldRadialGrad" cx="22%" cy="40%" r="72%">
              <stop offset="0%" stopColor="#004D3C" />
              <stop offset="55%" stopColor="#002D22" />
              <stop offset="100%" stopColor="#001610" />
            </radialGradient>

            {/* Sweeping Luxury Gold Gradient */}
            <linearGradient id="goldCurveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE3C4" />
              <stop offset="35%" stopColor="#E2BA75" />
              <stop offset="70%" stopColor="#C99B4B" />
              <stop offset="100%" stopColor="#8C6527" />
            </linearGradient>

            {/* Subtle Gold Glow Filter */}
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="2" stdDeviation="4" floodColor="#B68B45" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Left Emerald Solid Canopy with Exact Inward Waist Arch */}
          <path
            d="M 0,0 L 530,0 C 470,80 425,180 425,270 C 425,370 475,490 620,600 L 0,600 Z"
            fill="url(#emeraldRadialGrad)"
          />

          {/* Primary Sweeping Golden Contour Border with Breathing Glow */}
          <path
            d="M 530,0 C 470,80 425,180 425,270 C 425,370 475,490 620,600"
            fill="none"
            stroke="url(#goldCurveGrad)"
            strokeWidth="3.5"
            filter="url(#goldGlow)"
            className="animate-gold-curve"
          />

          {/* Traveling Golden Light Particle along the Primary Golden Arc */}
          <circle r="4.5" fill="#FFF4E6" filter="url(#goldGlow)">
            <animateMotion
              path="M 530,0 C 470,80 425,180 425,270 C 425,370 475,490 620,600"
              dur="6.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="2.5" fill="#FFFFFF">
            <animateMotion
              path="M 530,0 C 470,80 425,180 425,270 C 425,370 475,490 620,600"
              dur="6.5s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Outer Top Gold Arch Framing the Canopy */}
          <path
            d="M 425,270 C 430,150 490,40 640,0"
            fill="none"
            stroke="url(#goldCurveGrad)"
            strokeWidth="3"
            opacity="0.85"
            filter="url(#goldGlow)"
            className="animate-gold-curve"
          />

          {/* Bottom-Left Gold Accent Ribbon Wave 1 */}
          <path
            d="M 0,510 C 130,480 230,530 320,600 L 0,600 Z"
            fill="rgba(0, 38, 30, 0.85)"
          />
          <path
            d="M 0,510 C 130,480 230,530 320,600"
            fill="none"
            stroke="url(#goldCurveGrad)"
            strokeWidth="2.5"
            opacity="0.9"
          />

          {/* Bottom-Left Gold Accent Ribbon Wave 2 */}
          <path
            d="M 0,545 C 90,530 170,560 230,600 L 0,600 Z"
            fill="rgba(0, 24, 18, 0.95)"
          />
          <path
            d="M 0,545 C 90,530 170,560 230,600"
            fill="none"
            stroke="url(#goldCurveGrad)"
            strokeWidth="2"
            opacity="0.75"
          />
        </svg>

        {/* Ambient Warm Golden Sunlight Radial Overlay in the Deep Green */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212, 168, 90, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 3,
          }}
        />

        {/* =======================================================================
            HERO CONTENT LAYER — VIEWPORT-FITTING SCALABLE PROPORTIONS
            ======================================================================= */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '1.5rem 2rem 2.5rem 3.5rem',
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
            fontFamily: "'Poppins', sans-serif",
          }}
          className="hero-content-wrapper"
        >
          <div style={{ maxWidth: '530px' }} className="hero-text-block">
            {/* Live Trust & Approval Chip */}
            <div
              className="fade-up-1"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 14px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(0, 48, 38, 0.75)',
                border: '1px solid rgba(212, 168, 90, 0.45)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                marginBottom: 'clamp(0.5rem, 1vh, 0.8rem)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span
                className="live-green-dot"
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#4ADE80',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#FAF6EF',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                RERA &amp; TNCP APPROVED TOWNSHIP
              </span>
            </div>

            {/* Top Eyebrow: VANAM VALLEY, BALAGHAT M.P. —— */}
            <div
              className="fade-up-1"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: 'clamp(0.35rem, 0.9vh, 0.7rem)',
              }}
            >
              <span
                style={{
                  fontSize: 'clamp(0.74rem, 1vw, 0.84rem)',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#D4A85A',
                  textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                }}
              >
                VANAM VALLEY, BALAGHAT M.P.
              </span>
              <div
                style={{
                  width: '38px',
                  height: '2px',
                  backgroundColor: '#D4A85A',
                  opacity: 0.85,
                }}
              />
            </div>

            {/* EDITORIAL SERIF HEADLINE: Premium Plots & Duplex Villas with Gold Shimmer */}
            <h1
              className="luxury-serif fade-up-2"
              style={{
                fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2.5rem, 4.5vw, 4.1rem)',
                lineHeight: 1.08,
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: 'clamp(0.4rem, 1vh, 0.75rem)',
                letterSpacing: '-0.01em',
                textShadow: '0 4px 20px rgba(0,0,0,0.6)',
              }}
            >
              Premium Plots &amp;<br />
              <span
                className="luxury-serif shimmer-gold-text"
                style={{
                  fontStyle: 'italic',
                  fontWeight: 600,
                  fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
                  display: 'inline-block',
                  marginTop: '4px',
                }}
              >
                Duplex Villas
              </span>
            </h1>

            {/* Subtitle with Dashes: —— A PLANNED RESIDENTIAL COMMUNITY —— */}
            <div
              className="fade-up-3"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: 'clamp(0.8rem, 1.8vh, 1.4rem)',
              }}
            >
              <div style={{ width: '24px', height: '1.5px', backgroundColor: '#B68B45', opacity: 0.85 }} />
              <span
                style={{
                  fontSize: 'clamp(0.7rem, 0.88vw, 0.78rem)',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#F8F6F0',
                  opacity: 0.95,
                  textShadow: '0 2px 6px rgba(0,0,0,0.5)',
                }}
              >
                A PLANNED RESIDENTIAL COMMUNITY
              </span>
              <div style={{ width: '24px', height: '1.5px', backgroundColor: '#B68B45', opacity: 0.85 }} />
            </div>

            {/* 3 Glassmorphic Feature Badges with Micro-Highlights */}
            <div
              className="fade-up-4 hero-feature-badges"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'clamp(0.6rem, 0.9vw, 1rem)',
                padding: 'clamp(8px, 1.2vh, 12px) clamp(12px, 1.4vw, 18px)',
                borderRadius: '18px',
                backgroundColor: 'rgba(0, 36, 28, 0.82)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(247, 214, 176, 0.35)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
                marginBottom: 'clamp(1rem, 2vh, 1.85rem)',
              }}
            >
              {/* Feature 1: Prime Location */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(212, 168, 90, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(212, 168, 90, 0.15)',
                    border: '1px solid rgba(212, 168, 90, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={18} color="#D4A85A" />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}>
                    Prime Location
                  </div>
                  <div style={{ fontSize: '0.64rem', color: '#D4A85A', letterSpacing: '0.04em', marginTop: '1px' }}>
                    Waraseoni • NH-543
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="hero-feature-divider" style={{ width: '1px', height: '30px', background: 'linear-gradient(to bottom, transparent, rgba(247, 214, 176, 0.4), transparent)' }} />

              {/* Feature 2: Green Surroundings */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(212, 168, 90, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(212, 168, 90, 0.15)',
                    border: '1px solid rgba(212, 168, 90, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Leaf size={18} color="#D4A85A" />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}>
                    Green Sanctuary
                  </div>
                  <div style={{ fontSize: '0.64rem', color: '#D4A85A', letterSpacing: '0.04em', marginTop: '1px' }}>
                    100+ Forest Trees
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="hero-feature-divider" style={{ width: '1px', height: '30px', background: 'linear-gradient(to bottom, transparent, rgba(247, 214, 176, 0.4), transparent)' }} />

              {/* Feature 3: Modern Living */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(212, 168, 90, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(212, 168, 90, 0.15)',
                    border: '1px solid rgba(212, 168, 90, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <HomeIcon size={18} color="#D4A85A" />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}>
                    Modern Living
                  </div>
                  <div style={{ fontSize: '0.64rem', color: '#D4A85A', letterSpacing: '0.04em', marginTop: '1px' }}>
                    Clubhouse &amp; Pool
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Explore Properties with Sheen & Watch Overview with Sonar Ripple */}
            <div
              className="hero-action-buttons"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 'clamp(0.75rem, 1.2vw, 1.25rem)',
              }}
            >
              {/* Primary Peach-Gold Pill Button with Sheen Sweep */}
              <Link
                to="/properties"
                className="glow-button-pulse sheen-glow-button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: 'clamp(11px, 1.4vh, 14px) clamp(26px, 2.4vw, 32px)',
                  background: 'linear-gradient(135deg, #FFE7CE 0%, #F7D6B0 45%, #E2B27B 100%)',
                  color: '#00261E',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: 'clamp(0.86rem, 0.98vw, 0.94rem)',
                  letterSpacing: '0.02em',
                  textDecoration: 'none',
                  boxShadow: '0 10px 28px rgba(247, 214, 176, 0.45)',
                  transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 14px 34px rgba(247, 214, 176, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 28px rgba(247, 214, 176, 0.45)';
                }}
              >
                <span>Explore Properties</span>
                <ArrowRight size={17} />
              </Link>

              {/* Secondary Outline Pill Button with Sonar Pulsing Play Icon */}
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: 'clamp(10px, 1.3vh, 13px) clamp(22px, 2vw, 28px)',
                  backgroundColor: 'rgba(0, 36, 28, 0.65)',
                  color: '#FFFFFF',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  fontSize: 'clamp(0.86rem, 0.98vw, 0.94rem)',
                  border: '1.5px solid rgba(247, 214, 176, 0.5)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 22px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(212, 168, 90, 0.2)';
                  e.currentTarget.style.borderColor = '#FFE5C2';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 36, 28, 0.65)';
                  e.currentTarget.style.borderColor = 'rgba(247, 214, 176, 0.5)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#D4A85A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <div className="play-sonar-ring" />
                  <Play size={10} fill="#00261E" color="#00261E" style={{ marginLeft: '1px' }} />
                </div>
                <span>Watch Overview</span>
              </button>
            </div>
          </div>

          {/* Bottom Slider Pagination Dots with Active Glow Pill */}
          <div
            className="hero-slider-dots"
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '48%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              zIndex: 20,
              backgroundColor: 'rgba(0, 24, 18, 0.65)',
              padding: '6px 14px',
              borderRadius: '9999px',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(247, 214, 176, 0.25)',
            }}
          >
            {HERO_RIGHT_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlide(idx)}
                style={{
                  width: activeSlide === idx ? '34px' : '10px',
                  height: '7px',
                  borderRadius: '9999px',
                  backgroundColor: activeSlide === idx ? '#F7D6B0' : 'rgba(255, 255, 255, 0.35)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: activeSlide === idx ? '0 0 10px rgba(247, 214, 176, 0.7)' : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                aria-label={`Switch to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          WATCH OVERVIEW VIDEO MODAL
          ========================================================================= */}
      {isVideoModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            fontFamily: "'Poppins', sans-serif",
          }}
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '900px',
              backgroundColor: '#00261E',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(247, 214, 176, 0.3)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.75rem',
                borderBottom: '1px solid rgba(247, 214, 176, 0.2)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Trees size={20} color="#F7D6B0" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                  Vanam Valley — Forest Sanctuary Overview
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#F7D6B0',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '400px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  marginBottom: '1.5rem',
                }}
              >
                <img
                loading="lazy"
                decoding="async"
                  src="/vanam-entrance-gate-hd.jpg"
                  alt="Vanam Valley Drone Overview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 38, 30, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                  }}
                >
                  <div
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      backgroundColor: '#F7D6B0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 30px rgba(247, 214, 176, 0.6)',
                    }}
                  >
                    <Play size={28} fill="#00261E" color="#00261E" style={{ marginLeft: '4px' }} />
                  </div>
                  <span style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700 }}>
                    Balaghat Master Plan & Site Walkthrough
                  </span>
                </div>
              </div>

              <p style={{ color: 'rgba(248, 246, 240, 0.85)', fontSize: '0.92rem', maxWidth: '640px', margin: '0 auto 1.5rem', lineHeight: 1.7 }}>
                129 curated forest villas and clear-title residential plots in Balaghat, M.P. Located adjacent to pristine woodlands and within easy reach of Pench and Kanha National Parks.
              </p>

              <button
                type="button"
                onClick={() => {
                  setIsVideoModalOpen(false);
                  onOpenEnquiry('Site Visit from Overview');
                }}
                style={{
                  padding: '11px 28px',
                  backgroundColor: '#F7D6B0',
                  color: '#00261E',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Schedule Guided Site Visit
              </button>
            </div>
          </div>
        </div>
      )}

            {/* =========================================================================
          SECTION 2: EXPLORE OUR PROPERTY OPTIONS (EXACT 100% MATCH TO REFERENCE)
          Exact Arched Tri-Cards Composition, Golden Aura, Misty Mountain Horizon
          ========================================================================= */}
      <section
        id="properties-showcase"
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#FAF6EF',
          backgroundImage:
            'radial-gradient(circle at 78% 42%, rgba(221, 174, 91, 0.22) 0%, rgba(201, 154, 67, 0.08) 45%, transparent 68%), radial-gradient(circle at 18% 28%, rgba(244, 237, 226, 0.85) 0%, transparent 70%)',
          minHeight: 'calc(100vh - 75px)',
          padding: 'clamp(1.2rem, 2.4vh, 2.5rem) clamp(1.2rem, 3.5vw, 3.5rem)',
          overflow: 'hidden',
          fontFamily: "'Poppins', sans-serif",
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          scrollMarginTop: '84px',
        }}
        className="property-options-section"
      >
        {/* Seamless Misty Mountain Horizon across bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 'clamp(45px, 6vh, 70px)',
            backgroundImage: 'url(/properties_showcase/clean_bottom_mountains.png)',
            backgroundSize: '100% 100%',
            backgroundPosition: 'bottom center',
            backgroundRepeat: 'no-repeat',
            pointerEvents: 'none',
            zIndex: 1,
            opacity: 0.95,
          }}
        />

        <div
          style={{
            maxWidth: '1380px',
            margin: '0 auto',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            alignItems: 'center',
            gap: 'clamp(2rem, 3.8vw, 4.2rem)',
            position: 'relative',
            zIndex: 2,
            boxSizing: 'border-box',
          }}
          className="property-options-container"
        >
          {/* =======================================================================
              LEFT COLUMN: TYPOGRAPHY, CURVED UNDERLINE, 3-COL FEATURE PANEL, CTAS
              ======================================================================= */}
          <div
            style={{
              maxWidth: '540px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              zIndex: 3,
            }}
            className="property-options-left"
          >
            {/* Top Eyebrow with gold diamonds */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: 'clamp(0.5rem, 1vh, 0.8rem)',
              }}
            >
              <span
                style={{
                  fontSize: 'clamp(0.74rem, 0.84vw, 0.84rem)',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#C99A43',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {propEyebrow}
              </span>
            </div>

            {/* HEADLINE: Explore Our / Property Options (with Curved Gold Underline) */}
            <div style={{ marginBottom: 'clamp(1rem, 1.8vh, 1.3rem)' }}>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2.1rem, 3.1vw, 3.2rem)',
                  lineHeight: 1.1,
                  fontWeight: 700,
                  color: '#064B3B',
                  margin: 0,
                  letterSpacing: '-0.02em',
                }}
              >
                {propHead1}<br />
                <span style={{ color: '#C99A43', display: 'inline-block' }}>
                  {propHead2}
                </span>
              </h2>

              {/* Exact Curved Gold Underline */}
              <svg
                width="240"
                height="16"
                viewBox="0 0 240 16"
                fill="none"
                style={{ marginTop: '4px', display: 'block' }}
              >
                <path
                  d="M 4 10 C 65 3, 175 3, 236 12"
                  stroke="#C99A43"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Supporting Paragraph */}
            <p
              style={{
                color: '#4A463F',
                fontSize: 'clamp(0.92rem, 1.02vw, 1.02rem)',
                lineHeight: 1.65,
                maxWidth: '500px',
                marginBottom: 'clamp(0.8rem, 1.4vh, 1.2rem)',
                fontWeight: 400,
              }}
            >
              {propDesc}
            </p>

            {/* 3-Column Feature Highlight Panel (Strict 1 Row, Zero Wrapping) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr auto 1fr',
                alignItems: 'center',
                padding: 'clamp(10px, 1.4vh, 14px) clamp(12px, 1.6vw, 18px)',
                borderRadius: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(201, 154, 67, 0.35)',
                boxShadow: '0 8px 24px rgba(6, 75, 59, 0.05)',
                marginBottom: 'clamp(1.4rem, 2.2vh, 1.8rem)',
                width: '100%',
                maxWidth: '510px',
                boxSizing: 'border-box',
              }}
            >
              {/* Feature 1: Secure Investment */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '2px 4px',
                  cursor: 'pointer',
                  transition: 'transform 0.25s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    border: '1.5px solid #C99A43',
                    backgroundColor: 'rgba(201, 154, 67, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '6px',
                    color: '#C99A43',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C99A43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <span style={{ fontSize: 'clamp(0.76rem, 0.85vw, 0.84rem)', fontWeight: 700, color: '#343434', lineHeight: 1.25, whiteSpace: 'nowrap' }}>
                  Secure<br />Investment
                </span>
              </div>

              {/* Vertical Gold Divider 1 */}
              <div style={{ width: '1px', height: '38px', backgroundColor: 'rgba(201, 154, 67, 0.35)', flexShrink: 0 }} />

              {/* Feature 2: Nature Living */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '2px 4px',
                  cursor: 'pointer',
                  transition: 'transform 0.25s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    border: '1.5px solid #C99A43',
                    backgroundColor: 'rgba(201, 154, 67, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '6px',
                    color: '#C99A43',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C99A43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                  </svg>
                </div>
                <span style={{ fontSize: 'clamp(0.76rem, 0.85vw, 0.84rem)', fontWeight: 700, color: '#343434', lineHeight: 1.25, whiteSpace: 'nowrap' }}>
                  Nature<br />Living
                </span>
              </div>

              {/* Vertical Gold Divider 2 */}
              <div style={{ width: '1px', height: '38px', backgroundColor: 'rgba(201, 154, 67, 0.35)', flexShrink: 0 }} />

              {/* Feature 3: Family Friendly */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '2px 4px',
                  cursor: 'pointer',
                  transition: 'transform 0.25s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    border: '1.5px solid #C99A43',
                    backgroundColor: 'rgba(201, 154, 67, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '6px',
                    color: '#C99A43',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C99A43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <span style={{ fontSize: 'clamp(0.76rem, 0.85vw, 0.84rem)', fontWeight: 700, color: '#343434', lineHeight: 1.25, whiteSpace: 'nowrap' }}>
                  Family<br />Friendly
                </span>
              </div>
            </div>

            {/* Action Buttons: 4 Cohesive Luxury Pills */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(10px, 1.2vw, 14px)',
                flexWrap: 'wrap',
                marginTop: '1.25rem',
              }}
              className="property-options-ctas"
            >
              {/* PRIMARY 1: Explore All Properties */}
              <Link
                to="/properties"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: 'clamp(11px, 1.3vh, 13px) clamp(22px, 2vw, 28px)',
                  backgroundColor: '#064B3B',
                  color: '#FFFFFF',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  fontSize: 'clamp(0.86rem, 0.94vw, 0.94rem)',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(6, 75, 59, 0.3)',
                  transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                  whiteSpace: 'nowrap',
                  fontFamily: "'Poppins', sans-serif",
                  border: '1.5px solid #064B3B',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#08734F';
                  e.currentTarget.style.borderColor = '#08734F';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(6, 75, 59, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#064B3B';
                  e.currentTarget.style.borderColor = '#064B3B';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(6, 75, 59, 0.3)';
                }}
              >
                <span>Explore All Properties</span>
                <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>→</span>
              </Link>

              {/* PRIMARY 2: View Walkthrough Video */}
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: 'clamp(11px, 1.3vh, 13px) clamp(20px, 1.8vw, 26px)',
                  backgroundColor: '#FFFFFF',
                  color: '#064B3B',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  fontSize: 'clamp(0.86rem, 0.94vw, 0.94rem)',
                  border: '1.5px solid #C99A43',
                  cursor: 'pointer',
                  transition: 'all 0.28s ease',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                  fontFamily: "'Poppins', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(201, 154, 67, 0.12)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(201, 154, 67, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#064B3B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                  }}
                >
                  <Play size={10} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: '1px' }} />
                </div>
                <span>View Walkthrough Video</span>
              </button>

              {/* PRIMARY 3: Book VIP Site Visit */}
              {onOpenSiteVisit && (
                <button
                  type="button"
                  onClick={() => onOpenSiteVisit('Vanam Valley Township')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: 'clamp(11px, 1.3vh, 13px) clamp(20px, 1.8vw, 26px)',
                    background: 'linear-gradient(135deg, #C99A43 0%, #B88532 100%)',
                    color: '#FFFFFF',
                    borderRadius: '9999px',
                    fontWeight: 600,
                    fontSize: 'clamp(0.86rem, 0.94vw, 0.94rem)',
                    border: '1.5px solid #E5C37A',
                    cursor: 'pointer',
                    transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 8px 22px rgba(201, 154, 67, 0.32)',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #D4A74F 0%, #C99A43 100%)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(201, 154, 67, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #C99A43 0%, #B88532 100%)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 22px rgba(201, 154, 67, 0.32)';
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#064B3B',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    }}
                  >
                    <Car size={12} color="#064B3B" />
                  </div>
                  <span>Book Site Visit</span>
                  <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>→</span>
                </button>
              )}

              {/* PRIMARY 4: Document Checklist — Ultra Luxury Gold Pill */}
              {onOpenChecklist && (
                <button
                  type="button"
                  onClick={onOpenChecklist}
                  className="vanam-btn-sheen"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: 'clamp(11px, 1.3vh, 13px) clamp(22px, 1.8vw, 28px)',
                    background: 'linear-gradient(135deg, #FFF9F0 0%, #F8EEDC 50%, #F0DEC2 100%)',
                    color: '#00382B',
                    borderRadius: '9999px',
                    fontWeight: 700,
                    fontSize: 'clamp(0.86rem, 0.94vw, 0.94rem)',
                    border: '1.8px solid #D4A74F',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 6px 20px rgba(201, 154, 67, 0.22), 0 0 14px rgba(245, 218, 154, 0.25)',
                    fontFamily: "'Poppins', sans-serif",
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #E6BA67 0%, #C99A43 50%, #B88532 100%)';
                    e.currentTarget.style.color = '#002E24';
                    e.currentTarget.style.borderColor = '#F5DA9A';
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(201, 154, 67, 0.45), 0 0 20px rgba(245, 218, 154, 0.4)';
                    const iconBg = e.currentTarget.querySelector('.checklist-btn-icon') as HTMLElement;
                    if (iconBg) {
                      iconBg.style.backgroundColor = '#00382B';
                      iconBg.style.color = '#FFE5A3';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #FFF9F0 0%, #F8EEDC 50%, #F0DEC2 100%)';
                    e.currentTarget.style.color = '#00382B';
                    e.currentTarget.style.borderColor = '#D4A74F';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(201, 154, 67, 0.22), 0 0 14px rgba(245, 218, 154, 0.25)';
                    const iconBg = e.currentTarget.querySelector('.checklist-btn-icon') as HTMLElement;
                    if (iconBg) {
                      iconBg.style.backgroundColor = 'rgba(201, 154, 67, 0.22)';
                      iconBg.style.color = '#B88532';
                    }
                  }}
                >
                  <div
                    className="checklist-btn-icon"
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(201, 154, 67, 0.22)',
                      border: '1px solid rgba(201, 154, 67, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#B88532',
                      transition: 'all 0.25s ease',
                      flexShrink: 0,
                    }}
                  >
                    <FileCheck size={14} />
                  </div>
                  <span>Document Checklist</span>
                </button>
              )}
            </div>
          </div>

          {/* =======================================================================
              RIGHT COLUMN: THREE LUXURY ARCH CARDS WITH REAL VECTOR CODE & WOW ANIMATIONS
              ======================================================================= */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              width: '100%',
              maxWidth: '680px',
              margin: '0 auto',
            }}
            className="property-options-right vanam-arch-stage-container"
          >
            {/* Ambient Golden Radial Breathing Aura behind Center Card */}
            <div
              className="animate-gold-aura"
              style={{
                position: 'absolute',
                top: '48%',
                left: '50%',
                width: 'clamp(320px, 42vw, 540px)',
                height: 'clamp(320px, 42vw, 540px)',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(221, 174, 91, 0.42) 0%, rgba(201, 154, 67, 0.16) 48%, transparent 70%)',
                filter: 'blur(38px)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {/* Soft Ground Contact Shadow Under the Cards */}
            <div
              style={{
                position: 'absolute',
                bottom: '8px',
                left: '4%',
                right: '4%',
                height: '38px',
                background:
                  'radial-gradient(ellipse at center, rgba(6, 75, 59, 0.3) 0%, rgba(6, 75, 59, 0.08) 50%, transparent 72%)',
                filter: 'blur(12px)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {/* Three Overlapping Arched Cards Flex Container */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 2,
                width: '100%',
              }}
            >
              {/* -------------------------------------------------------------
                  CARD 1: LEFT ARCH CARD — DUPLEX VILLAS
                  ------------------------------------------------------------- */}
              <div
                className="animate-card-float-left"
                style={{
                  display: 'flex',
                  zIndex: 1,
                  marginRight: '-30px',
                  position: 'relative',
                }}
              >
                <div
                  className="property-arch-card"
                  onClick={() => {
                    onOpenEnquiry('3 BHK Duplex Villa (1,551 sq.ft.)');
                  }}
                  style={{
                    width: 'clamp(175px, 17vw, 215px)',
                    height: 'clamp(365px, 46vh, 430px)',
                    borderRadius: '135px 135px 24px 24px',
                    border: '2px solid #C99A43',
                    boxShadow: '0 16px 36px rgba(6, 75, 59, 0.1)',
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#FAF6EF',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxSizing: 'border-box',
                  }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-14px) scale(1.025)';
                  e.currentTarget.style.boxShadow =
                    '0 28px 60px rgba(6, 75, 59, 0.22), 0 0 22px rgba(201, 154, 67, 0.35)';
                  e.currentTarget.style.borderColor = '#FFE5B4';
                  e.currentTarget.style.zIndex = '12';
                  const img = e.currentTarget.querySelector('.c1-photo-zoom') as HTMLElement;
                  if (img) img.style.transform = 'scale(1.1)';
                  const arrow = e.currentTarget.querySelector('.c1-arrow-btn') as HTMLElement;
                  if (arrow) {
                    arrow.style.transform = 'translateX(4px) scale(1.1)';
                    arrow.style.backgroundColor = '#FAF6EF';
                    arrow.style.borderColor = '#064B3B';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(6, 75, 59, 0.1)';
                  e.currentTarget.style.borderColor = '#C99A43';
                  e.currentTarget.style.zIndex = '1';
                  const img = e.currentTarget.querySelector('.c1-photo-zoom') as HTMLElement;
                  if (img) img.style.transform = 'scale(1)';
                  const arrow = e.currentTarget.querySelector('.c1-arrow-btn') as HTMLElement;
                  if (arrow) {
                    arrow.style.transform = 'translateX(0) scale(1)';
                    arrow.style.backgroundColor = '#FFFFFF';
                    arrow.style.borderColor = '#C99A43';
                  }
                }}
                title="Explore Duplex Villas"
                >
                  {/* Luxury Light Sheen Beam */}
                  <div
                    className="luxury-card-sheen-1"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 235, 180, 0.45) 50%, rgba(255, 255, 255, 0) 75%, transparent 100%)',
                      pointerEvents: 'none',
                      zIndex: 6,
                    }}
                  />

                  {/* Photo Top 56% */}
                <div style={{ height: '56%', position: 'relative', overflow: 'hidden' }}>
                  <img
                    className="c1-photo-zoom"
                    src={card1Img}
                    alt="Luxury Modern Duplex Villas"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                  {/* Subtle top glare overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '60px',
                      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                {/* Peaked Chevron SVG Divider pointing UP */}
                <svg
                  viewBox="0 0 200 24"
                  preserveAspectRatio="none"
                  style={{
                    width: '100%',
                    height: '24px',
                    marginTop: '-23px',
                    position: 'relative',
                    zIndex: 2,
                    display: 'block',
                  }}
                >
                  <path d="M 0 24 L 0 12 L 100 2 L 200 12 L 200 24 Z" fill="#FAF6EF" />
                  <path d="M 0 12 L 100 2 L 200 12" fill="none" stroke="#C99A43" strokeWidth="2.5" strokeLinecap="round" />
                </svg>

                {/* Bottom Information Panel (Warm Ivory #FAF6EF) */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: '#FAF6EF',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '4px 16px 20px',
                    textAlign: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Inner Container with right margin clearance for overlap */}
                  <div
                    style={{
                      width: 'calc(100% - 24px)',
                      marginRight: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      height: '100%',
                    }}
                  >
                    {/* Gold Outline House Icon */}
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '12px',
                        border: '1.5px solid #C99A43',
                        backgroundColor: 'rgba(201, 154, 67, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#C99A43',
                        marginTop: '2px',
                        boxShadow: '0 2px 8px rgba(201, 154, 67, 0.1)',
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C99A43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </div>

                    {/* Title & Specification */}
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: 'clamp(1.18rem, 1.45vw, 1.42rem)',
                          color: '#064B3B',
                          margin: 0,
                          fontWeight: 700,
                          lineHeight: 1.15,
                        }}
                      >
                        {card1Title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: 'clamp(0.74rem, 0.82vw, 0.84rem)',
                          color: '#4A463F',
                          margin: '4px 0 0 0',
                          fontWeight: 500,
                          whiteSpace: 'nowrap',
                          letterSpacing: '0.01em',
                        }}
                      >
                        {card1Spec}
                      </p>
                    </div>

                    {/* Circular Arrow Button */}
                    <div
                      className="c1-arrow-btn"
                      style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        border: '1.5px solid #C99A43',
                        backgroundColor: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#064B3B',
                        boxShadow: '0 2px 10px rgba(201, 154, 67, 0.2)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <span style={{ fontSize: '1.05rem', lineHeight: 1 }}>→</span>
                    </div>
                  </div>
                </div>
                </div>
              </div>

              {/* -------------------------------------------------------------
                  CARD 2: CENTER ARCH CARD — VANAM VALLEY TOWNSHIP (TALLEST & PROMINENT)
                  ------------------------------------------------------------- */}
              <div
                className="animate-card-float-center"
                style={{
                  display: 'flex',
                  zIndex: 3,
                  position: 'relative',
                }}
              >
                {/* Ambient Golden Breathing Aura Behind Center Card */}
                <div
                  className="animate-gold-aura"
                  style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'clamp(215px, 22vw, 260px)',
                    height: 'clamp(425px, 54vh, 490px)',
                    borderRadius: '175px 175px 40px 40px',
                    background:
                      'radial-gradient(ellipse at 50% 30%, rgba(221, 174, 91, 0.45) 0%, rgba(201, 154, 67, 0.2) 50%, transparent 80%)',
                    filter: 'blur(16px)',
                    pointerEvents: 'none',
                    zIndex: -1,
                  }}
                />

                <div
                  className="property-arch-card"
                  onClick={() => {
                    onOpenEnquiry('Vanam Valley Master Township');
                  }}
                  style={{
                    width: 'clamp(205px, 21vw, 248px)',
                    height: 'clamp(410px, 52vh, 475px)',
                    borderRadius: '160px 160px 28px 28px',
                    border: '3.5px solid #DDAE5B',
                    boxShadow:
                      '0 24px 60px rgba(6, 75, 59, 0.28), 0 0 25px rgba(221, 174, 91, 0.45)',
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#064B3B',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxSizing: 'border-box',
                  }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-14px) scale(1.035)';
                  e.currentTarget.style.boxShadow =
                    '0 36px 80px rgba(6, 75, 59, 0.38), 0 0 36px rgba(221, 174, 91, 0.7)';
                  e.currentTarget.style.borderColor = '#FFE5B4';
                  const img = e.currentTarget.querySelector('.c2-photo-zoom') as HTMLElement;
                  if (img) img.style.transform = 'scale(1.1)';
                  const arrow = e.currentTarget.querySelector('.c2-arrow-btn') as HTMLElement;
                  if (arrow) arrow.style.transform = 'translateX(5px) scale(1.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow =
                    '0 24px 60px rgba(6, 75, 59, 0.28), 0 0 25px rgba(221, 174, 91, 0.45)';
                  e.currentTarget.style.borderColor = '#DDAE5B';
                  const img = e.currentTarget.querySelector('.c2-photo-zoom') as HTMLElement;
                  if (img) img.style.transform = 'scale(1)';
                  const arrow = e.currentTarget.querySelector('.c2-arrow-btn') as HTMLElement;
                  if (arrow) arrow.style.transform = 'translateX(0) scale(1)';
                }}
                title="Explore Vanam Valley Township"
                >
                  {/* Luxury Light Sheen Beam */}
                  <div
                    className="luxury-card-sheen-2"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 235, 180, 0.45) 50%, rgba(255, 255, 255, 0) 75%, transparent 100%)',
                      pointerEvents: 'none',
                      zIndex: 6,
                    }}
                  />

                  {/* Photo Top 57% */}
                <div style={{ height: '57%', position: 'relative', overflow: 'hidden' }}>
                  <img
                    className="c2-photo-zoom"
                    src={card2Img}
                    alt="Vanam Valley Planned Eco-Township"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                  {/* Subtle golden sunset gradient overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '70px',
                      background: 'linear-gradient(180deg, rgba(221, 174, 91, 0.25) 0%, transparent 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                {/* Peaked Chevron SVG Divider pointing UP into photo */}
                <svg
                  viewBox="0 0 200 24"
                  preserveAspectRatio="none"
                  style={{
                    width: '100%',
                    height: '24px',
                    marginTop: '-23px',
                    position: 'relative',
                    zIndex: 2,
                    display: 'block',
                  }}
                >
                  <path d="M 0 24 L 0 12 L 100 2 L 200 12 L 200 24 Z" fill="#064B3B" />
                  <path d="M 0 12 L 100 2 L 200 12" fill="none" stroke="#DDAE5B" strokeWidth="3" strokeLinecap="round" />
                </svg>

                {/* Bottom Information Panel (Deep Forest Green #064B3B) */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: '#064B3B',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '4px 20px 24px',
                    textAlign: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Gold Leaf Icon */}
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      border: '1.5px solid #DDAE5B',
                      backgroundColor: 'rgba(221, 174, 91, 0.16)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#DDAE5B',
                      marginTop: '2px',
                      boxShadow: '0 2px 10px rgba(221, 174, 91, 0.25)',
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DDAE5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                    </svg>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: 'clamp(1.28rem, 1.65vw, 1.65rem)',
                        color: '#FFFFFF',
                        margin: 0,
                        fontWeight: 700,
                        lineHeight: 1.15,
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
                      }}
                    >
                      {card2Title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: 'clamp(0.8rem, 0.9vw, 0.9vw)',
                        color: '#DDAE5B',
                        margin: '5px 0 0 0',
                        fontWeight: 500,
                        letterSpacing: '0.02em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {card2Sub}
                    </p>
                  </div>

                  {/* Glowing Circular Gold Arrow Button with Pulse Animation */}
                  <div
                    className="c2-arrow-btn animate-arrow-pulse"
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #FFE2B8 0%, #DDAE5B 45%, #B88328 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#064B3B',
                      boxShadow: '0 6px 18px rgba(221, 174, 91, 0.55), 0 0 14px rgba(255, 226, 184, 0.4)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <span style={{ fontSize: '1.25rem', lineHeight: 1, fontWeight: 'bold' }}>→</span>
                  </div>
                </div>
                </div>
              </div>

              {/* -------------------------------------------------------------
                  CARD 3: RIGHT ARCH CARD — RESIDENTIAL PLOTS
                  ------------------------------------------------------------- */}
              <div
                className="animate-card-float-right"
                style={{
                  display: 'flex',
                  zIndex: 1,
                  marginLeft: '-30px',
                  position: 'relative',
                }}
              >
                <div
                  className="property-arch-card"
                  onClick={() => {
                    onOpenEnquiry('Residential Plots (1,200 – 3,500 sq.ft.)');
                  }}
                  style={{
                    width: 'clamp(175px, 17vw, 215px)',
                    height: 'clamp(365px, 46vh, 430px)',
                    borderRadius: '135px 135px 24px 24px',
                    border: '2px solid #C99A43',
                    boxShadow: '0 16px 36px rgba(6, 75, 59, 0.1)',
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#FAF6EF',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxSizing: 'border-box',
                  }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-14px) scale(1.025)';
                  e.currentTarget.style.boxShadow =
                    '0 28px 60px rgba(6, 75, 59, 0.22), 0 0 22px rgba(201, 154, 67, 0.35)';
                  e.currentTarget.style.borderColor = '#FFE5B4';
                  e.currentTarget.style.zIndex = '12';
                  const img = e.currentTarget.querySelector('.c3-photo-zoom') as HTMLElement;
                  if (img) img.style.transform = 'scale(1.1)';
                  const arrow = e.currentTarget.querySelector('.c3-arrow-btn') as HTMLElement;
                  if (arrow) {
                    arrow.style.transform = 'translateX(4px) scale(1.1)';
                    arrow.style.backgroundColor = '#FAF6EF';
                    arrow.style.borderColor = '#064B3B';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(6, 75, 59, 0.1)';
                  e.currentTarget.style.borderColor = '#C99A43';
                  e.currentTarget.style.zIndex = '1';
                  const img = e.currentTarget.querySelector('.c3-photo-zoom') as HTMLElement;
                  if (img) img.style.transform = 'scale(1)';
                  const arrow = e.currentTarget.querySelector('.c3-arrow-btn') as HTMLElement;
                  if (arrow) {
                    arrow.style.transform = 'translateX(0) scale(1)';
                    arrow.style.backgroundColor = '#FFFFFF';
                    arrow.style.borderColor = '#C99A43';
                  }
                }}
                title="Explore Residential Plots"
                >
                  {/* Luxury Light Sheen Beam */}
                  <div
                    className="luxury-card-sheen-3"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 235, 180, 0.45) 50%, rgba(255, 255, 255, 0) 75%, transparent 100%)',
                      pointerEvents: 'none',
                      zIndex: 6,
                    }}
                  />

                  {/* Photo Top 56% */}
                <div style={{ height: '56%', position: 'relative', overflow: 'hidden' }}>
                  <img
                    className="c3-photo-zoom"
                    src={card3Img}
                    alt="Residential Plots"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                  {/* Subtle top glare overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '60px',
                      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                {/* Peaked Chevron SVG Divider pointing UP */}
                <svg
                  viewBox="0 0 200 24"
                  preserveAspectRatio="none"
                  style={{
                    width: '100%',
                    height: '24px',
                    marginTop: '-23px',
                    position: 'relative',
                    zIndex: 2,
                    display: 'block',
                  }}
                >
                  <path d="M 0 24 L 0 12 L 100 2 L 200 12 L 200 24 Z" fill="#FAF6EF" />
                  <path d="M 0 12 L 100 2 L 200 12" fill="none" stroke="#C99A43" strokeWidth="2.5" strokeLinecap="round" />
                </svg>

                {/* Bottom Information Panel (Warm Ivory #FAF6EF) */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: '#FAF6EF',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '4px 16px 20px',
                    textAlign: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Inner Container with left margin clearance for overlap */}
                  <div
                    style={{
                      width: 'calc(100% - 24px)',
                      marginLeft: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      height: '100%',
                    }}
                  >
                    {/* Gold Outline Plots / Diamond Icon */}
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '12px',
                        border: '1.5px solid #C99A43',
                        backgroundColor: 'rgba(201, 154, 67, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#C99A43',
                        marginTop: '2px',
                        boxShadow: '0 2px 8px rgba(201, 154, 67, 0.1)',
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C99A43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                        <polyline points="2 17 12 22 22 17" />
                        <polyline points="2 12 12 17 22 12" />
                      </svg>
                    </div>

                    {/* Title & Specification */}
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: 'clamp(1.18rem, 1.45vw, 1.42rem)',
                          color: '#064B3B',
                          margin: 0,
                          fontWeight: 700,
                          lineHeight: 1.15,
                        }}
                      >
                        {card3Title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: 'clamp(0.74rem, 0.82vw, 0.84rem)',
                          color: '#4A463F',
                          margin: '4px 0 0 0',
                          fontWeight: 500,
                          whiteSpace: 'nowrap',
                          letterSpacing: '0.01em',
                        }}
                      >
                        {card3Spec}
                      </p>
                    </div>

                    {/* Circular Arrow Button */}
                    <div
                      className="c3-arrow-btn"
                      style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        border: '1.5px solid #C99A43',
                        backgroundColor: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#064B3B',
                        boxShadow: '0 2px 10px rgba(201, 154, 67, 0.2)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <span style={{ fontSize: '1.05rem', lineHeight: 1 }}>→</span>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


                  {/* =========================================================================
          SECTION 3: SIGNATURE PROJECTS & PHASES (EXACT REFERENCE RECREATION)
          - Viewport-Height Optimized (Fits cleanly on 1080p/1440p screens)
          - Auto-cycling Phase Timeline (01 -> 02 -> 03) with interactive pause
          - 3D Township Island with Perspective Pedestal & Mouse Parallax & Hover Glow
          - Frosted Dark Glass Project Card
          - Four Floating Leaf Metrics along Golden Orbit
          ========================================================================= */}
      <section
        id="projects"
        style={{
          width: '100%',
          minHeight: 'calc(100vh - 75px)',
          backgroundColor: '#00261E',
          backgroundImage:
            'radial-gradient(ellipse at 50% 30%, #003828 0%, #00261E 60%, #001812 100%)',
          color: '#F8F6F0',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: "'Poppins', sans-serif",
          boxSizing: 'border-box',
          padding: 'clamp(1.2rem, 2.2vh, 2rem) clamp(1rem, 2.8vw, 3rem) clamp(1.4rem, 2.4vh, 2.2rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          scrollMarginTop: '80px',
        }}
        className="vanam-signature-projects-section"
      >
        {/* Subtle Top Gold Accent Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1.5px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(216, 174, 97, 0.6) 50%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Ambient Top Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '650px',
            height: '140px',
            background: 'radial-gradient(ellipse at 50% 50%, rgba(216, 174, 97, 0.18) 0%, transparent 70%)',
            filter: 'blur(35px)',
            pointerEvents: 'none',
          }}
        />

        {/* Inner Content Container */}
        <div
          style={{
            maxWidth: '1440px',
            width: '100%',
            margin: '0 auto',
            position: 'relative',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            gap: 'clamp(0.6rem, 1.4vh, 1.4rem)',
          }}
        >
          {/* =================================================================
              A. CENTERED SECTION HEADER (COMPACT & EDITORIAL)
              ================================================================= */}
          <div style={{ textAlign: 'center' }}>
            {/* Eyebrow */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '0.2rem',
              }}
            >
              <span style={{ color: '#D8AE61', fontSize: '0.85rem', opacity: 0.85 }}>— 🪶</span>
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#D8AE61',
                }}
              >
                {sigEyebrow}
              </span>
              <span style={{ color: '#D8AE61', fontSize: '0.85rem', opacity: 0.85 }}>🪶 —</span>
            </div>

            {/* Main Heading */}
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.9rem, 2.9vw, 2.85rem)',
                fontWeight: 700,
                color: '#FFF5E5',
                lineHeight: 1.15,
                margin: '0 0 0.25rem 0',
                letterSpacing: '-0.01em',
              }}
            >
              {sigHeading}
            </h2>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 'clamp(0.82rem, 0.95vw, 0.98rem)',
                color: 'rgba(255, 245, 229, 0.8)',
                lineHeight: 1.45,
                maxWidth: '660px',
                margin: '0 auto',
                fontWeight: 400,
                letterSpacing: '0.01em',
              }}
            >
              {sigSubtitle}
            </p>
          </div>

          {/* =================================================================
              B. THREE-COLUMN DESKTOP COMPOSITION:
              1. Left: Curved Vertical Gold Timeline (Auto-advancing 01 -> 02 -> 03)
              2. Center: 3D Miniature Township Masterplan Island with Hover Glow & Pins
              3. Right: Frosted Dark Glass Information Card
              ================================================================= */}
          <div
            className="vanam-projects-stage-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              alignItems: 'center',
              position: 'relative',
              gap: 'clamp(0.8rem, 1.8vw, 1.5rem)',
            }}
          >
            {/* -------------------------------------------------------------
                COLUMN 1: LEFT-SIDE CURVED VERTICAL GOLD TIMELINE
                ------------------------------------------------------------- */}
            <div
              style={{
                gridColumn: 'span 2',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                height: '100%',
                minHeight: '260px',
                zIndex: 4,
              }}
              className="vanam-timeline-col"
              onMouseEnter={() => setIsPhaseAutoPaused(true)}
              onMouseLeave={() => setIsPhaseAutoPaused(false)}
            >
              {/* Curved Gold Arc SVG Path */}
              <svg
                viewBox="0 0 90 260"
                fill="none"
                preserveAspectRatio="none"
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '10px',
                  bottom: '10px',
                  width: '60px',
                  height: 'calc(100% - 20px)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              >
                <path
                  d="M 14 30 C 48 85, 48 175, 14 230"
                  stroke="url(#timelineArcGradCompact)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Dynamic Travelling Golden Light Bead */}
                <circle
                  cx={activeProjectPhase === 1 ? 14 : activeProjectPhase === 2 ? 40 : 14}
                  cy={activeProjectPhase === 1 ? 30 : activeProjectPhase === 2 ? 130 : 230}
                  r="5"
                  fill="#FFF2CC"
                  style={{
                    filter: 'drop-shadow(0 0 10px #F4C66D)',
                    transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
                <defs>
                  <linearGradient id="timelineArcGradCompact" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#D8AE61" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#F4C66D" stopOpacity="1" />
                    <stop offset="100%" stopColor="#D8AE61" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Three Interactive Timeline Nodes */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '240px',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {[
                  { id: 1, num: '01', title: 'Master Plotted' },
                  { id: 2, num: '02', title: 'Forest Villas' },
                  { id: 3, num: '03', title: 'Resort Club' },
                ].map((item) => {
                  const isActive = activeProjectPhase === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveProjectPhase(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px 0',
                        textAlign: 'left',
                        transition: 'all 0.35s ease',
                      }}
                      title={`Select ${item.title}`}
                    >
                      {/* Round Node Marker */}
                      <div
                        className={isActive ? 'animate-timeline-ring-glow' : ''}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          border: isActive ? '2px solid #F4C66D' : '1.5px solid rgba(255, 245, 229, 0.4)',
                          backgroundColor: isActive ? '#003E30' : 'rgba(0, 47, 36, 0.6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: isActive
                            ? '0 0 20px rgba(244, 198, 109, 0.9), inset 0 0 8px rgba(244, 198, 109, 0.6)'
                            : 'none',
                          transition: 'all 0.35s ease',
                          flexShrink: 0,
                          transform: isActive ? 'scale(1.12)' : 'scale(1)',
                        }}
                      >
                        <div
                          style={{
                            width: isActive ? '9px' : '5px',
                            height: isActive ? '9px' : '5px',
                            borderRadius: '50%',
                            backgroundColor: isActive ? '#F4C66D' : 'rgba(255, 245, 229, 0.45)',
                            transition: 'all 0.35s ease',
                          }}
                        />
                      </div>

                      {/* Text Label */}
                      <div>
                        <div
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: '0.92rem',
                            fontWeight: 700,
                            color: isActive ? '#F4C66D' : 'rgba(244, 198, 109, 0.65)',
                            lineHeight: 1.1,
                            letterSpacing: '0.04em',
                          }}
                        >
                          {item.num}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: '0.84rem',
                            fontWeight: isActive ? 600 : 400,
                            color: isActive ? '#FFF5E5' : 'rgba(255, 245, 229, 0.65)',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.3s ease',
                            marginTop: '2px',
                          }}
                        >
                          {item.title}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* -------------------------------------------------------------
                COLUMN 2: CENTER — 3D TOWNSHIP MASTERPLAN ISLAND & HOVER GLOW
                ------------------------------------------------------------- */}
            <div
              className="vanam-township-island-col"
              style={{
                gridColumn: 'span 7',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                perspective: '1200px',
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                setTownshipMouse({ x: x * 10, y: y * 10 });
              }}
              onMouseLeave={() => {
                setTownshipMouse({ x: 0, y: 0 });
              }}
            >
              {/* Horizontal Steady Perspective Gold Pedestal Halo */}
              <div
                className="animate-gold-pedestal"
                style={{
                  position: 'absolute',
                  bottom: '7%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '84%',
                  height: '26%',
                  borderRadius: '50%',
                  border: '2px solid rgba(244, 198, 109, 0.65)',
                  background:
                    'radial-gradient(ellipse at 50% 50%, rgba(244, 198, 109, 0.4) 0%, rgba(216, 174, 97, 0.15) 55%, transparent 75%)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />

              {/* 3D Masterplan Island Image with Interactive Float & Hover */}
              <div
                className="township-island-interactive animate-island-float"
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '640px',
                  zIndex: 3,
                  transform: `translate3d(${townshipMouse.x}px, ${townshipMouse.y}px, 0)`,
                  filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.65))',
                }}
              >
                <img
                  src={sigIsland}
                  alt="Vanam Valley 3D Masterplan Island"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />

                {/* =========================================================
                    THREE BESPOKE LUXURY FLOATING PROJECT MARKERS
                    ========================================================= */}

                {/* MARKER 1: Rengatolla Gara Plots (Left Plotted Sector) */}
                <div
                  onClick={() => setActiveProjectPhase(1)}
                  style={{
                    position: 'absolute',
                    top: '48%',
                    left: '26%',
                    transform: 'translate(-50%, -100%)',
                    zIndex: activeProjectPhase === 1 ? 15 : 10,
                    cursor: 'pointer',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  title="Click to view Rengatolla Gara Plots"
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: activeProjectPhase === 1 ? 'rgba(0, 47, 36, 0.95)' : 'rgba(0, 31, 24, 0.82)',
                      backdropFilter: 'blur(10px)',
                      border: activeProjectPhase === 1 ? '1.8px solid #F4C66D' : '1px solid rgba(216, 174, 97, 0.45)',
                      borderRadius: '50px',
                      padding: '4px 12px 4px 5px',
                      boxShadow: activeProjectPhase === 1
                        ? '0 10px 25px rgba(0, 0, 0, 0.5), 0 0 22px rgba(244, 198, 109, 0.75)'
                        : '0 4px 14px rgba(0, 0, 0, 0.35)',
                      gap: '8px',
                      transition: 'all 0.3s ease',
                      transform: activeProjectPhase === 1 ? 'scale(1.08)' : 'scale(1)',
                    }}
                  >
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: '#064B3B',
                        border: '1.2px solid #D8AE61',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#F4C66D',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                        <polyline points="2 17 12 22 22 17" />
                        <polyline points="2 12 12 17 22 12" />
                      </svg>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          lineHeight: 1.1,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Rengatolla Gara Plots
                      </div>
                      <div
                        style={{
                          fontSize: '0.66rem',
                          color: '#FFE5B4',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        1.76 Acres • Plotted
                      </div>
                    </div>
                  </div>
                  {/* Stem & Beacon */}
                  <div
                    style={{
                      width: '2px',
                      height: '14px',
                      background: 'linear-gradient(180deg, #D8AE61 0%, transparent 100%)',
                      margin: '0 auto',
                    }}
                  />
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#F4C66D',
                      margin: '-2px auto 0',
                      boxShadow: '0 0 8px #F4C66D',
                    }}
                  />
                </div>

                {/* MARKER 2: The Villa Reserve (Center Top Duplex Villa - Moved down to 35% so it never clips!) */}
                <div
                  onClick={() => setActiveProjectPhase(2)}
                  style={{
                    position: 'absolute',
                    top: '35%',
                    left: '50%',
                    transform: 'translate(-50%, -100%)',
                    zIndex: activeProjectPhase === 2 ? 15 : 10,
                    cursor: 'pointer',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  title="Click to view The Villa Reserve"
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: activeProjectPhase === 2 ? 'rgba(0, 47, 36, 0.95)' : 'rgba(0, 31, 24, 0.82)',
                      backdropFilter: 'blur(10px)',
                      border: activeProjectPhase === 2 ? '1.8px solid #F4C66D' : '1px solid rgba(216, 174, 97, 0.45)',
                      borderRadius: '50px',
                      padding: '4px 14px 4px 5px',
                      boxShadow: activeProjectPhase === 2
                        ? '0 10px 25px rgba(0, 0, 0, 0.5), 0 0 22px rgba(244, 198, 109, 0.75)'
                        : '0 4px 14px rgba(0, 0, 0, 0.35)',
                      gap: '8px',
                      transition: 'all 0.3s ease',
                      transform: activeProjectPhase === 2 ? 'scale(1.08)' : 'scale(1)',
                    }}
                  >
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: '#064B3B',
                        border: '1.2px solid #D8AE61',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#F4C66D',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          lineHeight: 1.1,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        The Villa Reserve
                      </div>
                      <div
                        style={{
                          fontSize: '0.66rem',
                          color: '#FFE5B4',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        1,551 Sq.Ft. | 3 BHK Duplex
                      </div>
                    </div>
                  </div>
                  {/* Stem & Beacon */}
                  <div
                    style={{
                      width: '2px',
                      height: '14px',
                      background: 'linear-gradient(180deg, #D8AE61 0%, transparent 100%)',
                      margin: '0 auto',
                    }}
                  />
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#F4C66D',
                      margin: '-2px auto 0',
                      boxShadow: '0 0 8px #F4C66D',
                    }}
                  />
                </div>

                {/* MARKER 3: The Canopy Club (Right Clubhouse & Pool) */}
                <div
                  onClick={() => setActiveProjectPhase(3)}
                  style={{
                    position: 'absolute',
                    top: '47%',
                    left: '74%',
                    transform: 'translate(-50%, -100%)',
                    zIndex: activeProjectPhase === 3 ? 15 : 10,
                    cursor: 'pointer',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  title="Click to view The Canopy Club"
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: activeProjectPhase === 3 ? 'rgba(0, 47, 36, 0.95)' : 'rgba(0, 31, 24, 0.82)',
                      backdropFilter: 'blur(10px)',
                      border: activeProjectPhase === 3 ? '1.8px solid #F4C66D' : '1px solid rgba(216, 174, 97, 0.45)',
                      borderRadius: '50px',
                      padding: '4px 12px 4px 5px',
                      boxShadow: activeProjectPhase === 3
                        ? '0 10px 25px rgba(0, 0, 0, 0.5), 0 0 22px rgba(244, 198, 109, 0.75)'
                        : '0 4px 14px rgba(0, 0, 0, 0.35)',
                      gap: '8px',
                      transition: 'all 0.3s ease',
                      transform: activeProjectPhase === 3 ? 'scale(1.08)' : 'scale(1)',
                    }}
                  >
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: '#064B3B',
                        border: '1.2px solid #D8AE61',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#F4C66D',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                        <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                      </svg>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          lineHeight: 1.1,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        The Canopy Club
                      </div>
                      <div
                        style={{
                          fontSize: '0.66rem',
                          color: '#FFE5B4',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {leaf3Val} Resort Club
                      </div>
                    </div>
                  </div>
                  {/* Stem & Beacon */}
                  <div
                    style={{
                      width: '2px',
                      height: '14px',
                      background: 'linear-gradient(180deg, #D8AE61 0%, transparent 100%)',
                      margin: '0 auto',
                    }}
                  />
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#F4C66D',
                      margin: '-2px auto 0',
                      boxShadow: '0 0 8px #F4C66D',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------
                COLUMN 3: RIGHT-SIDE FROSTED DARK GLASS INFORMATION CARD
                ------------------------------------------------------------- */}
            <div
              style={{
                gridColumn: 'span 3',
                zIndex: 4,
                position: 'relative',
              }}
              className="vanam-project-card-col"
              onMouseEnter={() => setIsPhaseAutoPaused(true)}
              onMouseLeave={() => setIsPhaseAutoPaused(false)}
            >
              {(() => {
                const projectData = [
                  {
                    phase: 'Phase 01',
                    title: phase1Data.title,
                    subtitle: phase1Data.desc,
                    image: phase1Data.image,
                    features: [
                      {
                        title: phase1Data.spec,
                        icon: (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <path d="M3 9h18" />
                            <path d="M9 21V9" />
                          </svg>
                        ),
                      },
                      {
                        title: "25' & 30' CC Roads",
                        icon: (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="4" y1="21" x2="8" y2="3" />
                            <line x1="20" y1="21" x2="16" y2="3" />
                            <line x1="12" y1="5" x2="12" y2="7" />
                            <line x1="12" y1="11" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12" y2="19" />
                          </svg>
                        ),
                      },
                      {
                        title: 'Park & Open Gym',
                        icon: (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2a5 5 0 0 0-5 5c0 2 1.5 3.5 3 4.5V22h4v-10.5c1.5-1 3-2.5 3-4.5a5 5 0 0 0-5-5z" />
                          </svg>
                        ),
                      },
                    ],
                  },
                  {
                    phase: 'Phase 02',
                    title: phase2Data.title,
                    subtitle: phase2Data.desc,
                    image: phase2Data.image,
                    features: [
                      {
                        title: '1,551 Sq.Ft. Built-up',
                        icon: (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          </svg>
                        ),
                      },
                      {
                        title: '3 BHK Duplex Living',
                        icon: (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                          </svg>
                        ),
                      },
                      {
                        title: 'Private Garden & Terrace',
                        icon: (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                          </svg>
                        ),
                      },
                    ],
                  },
                  {
                    phase: 'Phase 03',
                    title: phase3Data.title,
                    subtitle: phase3Data.desc,
                    image: phase3Data.image,
                    features: [
                      {
                        title: '15,000 Sq.Ft. Area',
                        icon: (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                          </svg>
                        ),
                      },
                      {
                        title: 'Infinity Swimming Pool',
                        icon: (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 12c2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                            <path d="M2 18c2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                          </svg>
                        ),
                      },
                      {
                        title: 'Wellness Spa & Dining',
                        icon: (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9-2.12 0-4.07.74-5.61 2" />
                            <path d="M12 17a5 5 0 0 0 5-5c0-2.76-2.24-5-5-5-1.18 0-2.26.41-3.12 1.1" />
                            <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                          </svg>
                        ),
                      },
                    ],
                  },
                ];

                const cur = projectData[activeProjectPhase - 1] || projectData[0];

                return (
                  <div
                    style={{
                      background: 'linear-gradient(160deg, rgba(0, 47, 36, 0.88) 0%, rgba(0, 31, 24, 0.94) 100%)',
                      border: '1.5px solid rgba(216, 174, 97, 0.55)',
                      borderRadius: '22px',
                      padding: '14px 16px',
                      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.55), 0 0 20px rgba(216, 174, 97, 0.18)',
                      backdropFilter: 'blur(20px)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      transition: 'all 0.4s ease',
                    }}
                  >
                    {/* Top Photo with Phase Badge */}
                    <div
                      style={{
                        position: 'relative',
                        height: '115px',
                        borderRadius: '14px',
                        overflow: 'hidden',
                        border: '1px solid rgba(216, 174, 97, 0.35)',
                      }}
                    >
                      <img
                        key={cur.image}
                        src={cur.image}
                        alt={cur.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.6s ease',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          backgroundColor: 'rgba(0, 47, 36, 0.9)',
                          border: '1px solid #D8AE61',
                          borderRadius: '20px',
                          padding: '2px 10px',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: '#F4C66D',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {cur.phase}
                      </div>
                    </div>

                    {/* Title & Short Description */}
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: '1.2rem',
                          fontWeight: 700,
                          color: '#FFF5E5',
                          margin: '0 0 4px 0',
                          lineHeight: 1.15,
                        }}
                      >
                        {cur.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.74rem',
                          color: 'rgba(255, 245, 229, 0.78)',
                          lineHeight: 1.4,
                          margin: 0,
                        }}
                      >
                        {cur.subtitle}
                      </p>
                    </div>

                    {/* Feature List */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        padding: '6px 0',
                        borderTop: '1px solid rgba(216, 174, 97, 0.22)',
                        borderBottom: '1px solid rgba(216, 174, 97, 0.22)',
                      }}
                    >
                      {cur.features.map((feat, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          <div
                            style={{
                              width: '20px',
                              height: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {feat.icon}
                          </div>
                          <span
                            style={{
                              fontSize: '0.78rem',
                              fontWeight: 500,
                              color: '#FFF5E5',
                              letterSpacing: '0.01em',
                            }}
                          >
                            {feat.title}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Explore Phase Button */}
                    <button
                      onClick={() => onOpenEnquiry(cur.title)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #F4C66D 0%, #D8AE61 50%, #B88938 100%)',
                        color: '#002F24',
                        fontWeight: 700,
                        fontSize: '0.84rem',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 16px rgba(216, 174, 97, 0.35)',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 22px rgba(244, 198, 109, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(216, 174, 97, 0.35)';
                      }}
                    >
                      <span>Explore Phase</span>
                      <span style={{ fontSize: '1rem', lineHeight: 1 }}>→</span>
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* =================================================================
              C. BOTTOM SECTION – THE FOUR UNIQUE FLOATING LEAF METRICS
              (Refined Proportions, Zero Clipping, Perfectly Centered Text)
              ================================================================= */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingTop: '10px',
              marginTop: '4px',
            }}
          >
            {/* Gentle Curved Golden Orbital Line with Radiant Star Nodes */}
            <svg
              viewBox="0 0 1200 60"
              preserveAspectRatio="none"
              style={{
                position: 'absolute',
                top: '55px',
                left: 0,
                width: '100%',
                height: '60px',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            >
              <path
                d="M 40 20 Q 600 58 1160 20"
                fill="none"
                stroke="#D8AE61"
                strokeWidth="1.5"
                opacity="0.5"
              />
              <circle cx="215" cy="40" r="3.5" fill="#FFEAB8" style={{ filter: 'drop-shadow(0 0 6px #F4C66D)' }} />
              <circle cx="435" cy="50" r="3.5" fill="#FFEAB8" style={{ filter: 'drop-shadow(0 0 6px #F4C66D)' }} />
              <circle cx="600" cy="54" r="4.5" fill="#FFEAB8" style={{ filter: 'drop-shadow(0 0 8px #F4C66D)' }} />
              <circle cx="765" cy="50" r="3.5" fill="#FFEAB8" style={{ filter: 'drop-shadow(0 0 6px #F4C66D)' }} />
              <circle cx="985" cy="40" r="3.5" fill="#FFEAB8" style={{ filter: 'drop-shadow(0 0 6px #F4C66D)' }} />
            </svg>

            {/* The Four Organic Leaf-Shaped Metric Panels */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 'clamp(0.6rem, 1.4vw, 1.5rem)',
                position: 'relative',
                zIndex: 3,
                alignItems: 'end',
              }}
              className="vanam-leaf-metrics-grid"
            >
              {/* LEAF 1: 27 ACRES */}
              <div
                className="animate-leaf-float-1 leaf-card-wrapper"
                style={{
                  position: 'relative',
                  height: 'clamp(160px, 19vh, 180px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.035)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <svg
                  viewBox="0 0 240 190"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.5))',
                    overflow: 'visible',
                  }}
                >
                  <defs>
                    <linearGradient id="leafGradVp1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#003E30" stopOpacity="0.95" />
                      <stop offset="60%" stopColor="#064B39" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#0D6244" stopOpacity="0.82" />
                    </linearGradient>
                    <linearGradient id="leafGoldStrokeVp" x1="0%" y1="0%" x2="100%" y2="80%">
                      <stop offset="0%" stopColor="#F4C66D" />
                      <stop offset="50%" stopColor="#D8AE61" />
                      <stop offset="100%" stopColor="#B88938" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 12 100 C 35 155, 110 185, 175 180 C 220 175, 238 135, 225 80 C 210 25, 120 15, 12 100 Z"
                    fill="url(#leafGradVp1)"
                    stroke="url(#leafGoldStrokeVp)"
                    strokeWidth="2.2"
                  />
                  <path d="M 12 100 C 70 105, 140 100, 215 85" fill="none" stroke="rgba(244, 198, 109, 0.28)" strokeWidth="1.2" />
                  <path d="M 65 104 C 80 130, 110 150, 140 160" fill="none" stroke="rgba(244, 198, 109, 0.18)" strokeWidth="1" />
                  <path d="M 95 102 C 110 65, 140 45, 175 35" fill="none" stroke="rgba(244, 198, 109, 0.18)" strokeWidth="1" />
                  <path d="M 130 98 C 150 125, 175 140, 200 150" fill="none" stroke="rgba(244, 198, 109, 0.18)" strokeWidth="1" />
                </svg>

                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '4px 14px 8px 14px',
                    maxWidth: '85%',
                    transform: 'translateY(-8px)',
                  }}
                >
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(216, 174, 97, 0.15)',
                      border: '1.2px solid #D8AE61',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#F4C66D',
                      marginBottom: '3px',
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m8 10 4-6 4 6" />
                      <path d="M4 18l4-6h8l4 6H4z" />
                      <path d="M12 18v4" />
                    </svg>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 'clamp(1.15rem, 1.4vw, 1.42rem)',
                      fontWeight: 800,
                      color: '#FFF5E5',
                      lineHeight: 1.1,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {leaf1Val}
                  </div>
                  <div
                    style={{
                      fontSize: 'clamp(0.66rem, 0.74vw, 0.76rem)',
                      fontWeight: 600,
                      color: '#D8AE61',
                      letterSpacing: '0.02em',
                      marginTop: '2px',
                      lineHeight: 1.25,
                    }}
                  >
                    {leaf1Lbl}
                  </div>
                </div>
              </div>

              {/* LEAF 2: 129 UNITS */}
              <div
                className="animate-leaf-float-2 leaf-card-wrapper"
                style={{
                  position: 'relative',
                  height: 'clamp(160px, 19vh, 180px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.035)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <svg
                  viewBox="0 0 220 195"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.5))',
                    overflow: 'visible',
                  }}
                >
                  <defs>
                    <linearGradient id="leafGradVp2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#003E30" stopOpacity="0.95" />
                      <stop offset="60%" stopColor="#064B39" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#0D6244" stopOpacity="0.82" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 15 165 C 60 188, 140 188, 190 150 C 218 125, 215 65, 180 25 C 135 5, 65 25, 30 75 C 10 105, 5 140, 15 165 Z"
                    fill="url(#leafGradVp2)"
                    stroke="url(#leafGoldStrokeVp)"
                    strokeWidth="2.2"
                  />
                  <path d="M 15 165 C 50 130, 110 75, 170 35" fill="none" stroke="rgba(244, 198, 109, 0.28)" strokeWidth="1.2" />
                  <path d="M 55 125 C 90 140, 130 145, 170 135" fill="none" stroke="rgba(244, 198, 109, 0.18)" strokeWidth="1" />
                  <path d="M 90 95 C 105 60, 130 40, 160 30" fill="none" stroke="rgba(244, 198, 109, 0.18)" strokeWidth="1" />
                  <path d="M 115 75 C 145 90, 175 95, 195 85" fill="none" stroke="rgba(244, 198, 109, 0.18)" strokeWidth="1" />
                </svg>

                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '4px 14px 8px 14px',
                    maxWidth: '85%',
                    transform: 'translateY(-8px)',
                  }}
                >
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(216, 174, 97, 0.15)',
                      border: '1.2px solid #D8AE61',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#F4C66D',
                      marginBottom: '3px',
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 'clamp(1.15rem, 1.4vw, 1.42rem)',
                      fontWeight: 800,
                      color: '#FFF5E5',
                      lineHeight: 1.1,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {leaf2Val}
                  </div>
                  <div
                    style={{
                      fontSize: 'clamp(0.66rem, 0.74vw, 0.76rem)',
                      fontWeight: 600,
                      color: '#D8AE61',
                      letterSpacing: '0.02em',
                      marginTop: '2px',
                      lineHeight: 1.25,
                    }}
                  >
                    {leaf2Lbl}
                  </div>
                </div>
              </div>

              {/* LEAF 3: 15,000 SQ.FT. (Fixed: clean multi-line wrapping, no overflow) */}
              <div
                className="animate-leaf-float-3 leaf-card-wrapper"
                style={{
                  position: 'relative',
                  height: 'clamp(160px, 19vh, 180px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.035)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <svg
                  viewBox="0 0 220 195"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.5))',
                    overflow: 'visible',
                  }}
                >
                  <defs>
                    <linearGradient id="leafGradVp3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#003E30" stopOpacity="0.95" />
                      <stop offset="60%" stopColor="#064B39" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#0D6244" stopOpacity="0.82" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 18 90 C 25 150, 95 188, 170 182 C 200 178, 215 155, 212 135 C 205 80, 180 25, 130 12 C 70 5, 22 40, 18 90 Z"
                    fill="url(#leafGradVp3)"
                    stroke="url(#leafGoldStrokeVp)"
                    strokeWidth="2.2"
                  />
                  <path d="M 18 90 C 80 100, 150 115, 212 135" fill="none" stroke="rgba(244, 198, 109, 0.28)" strokeWidth="1.2" />
                  <path d="M 65 98 C 85 135, 120 160, 155 170" fill="none" stroke="rgba(244, 198, 109, 0.18)" strokeWidth="1" />
                  <path d="M 100 105 C 115 70, 145 45, 175 35" fill="none" stroke="rgba(244, 198, 109, 0.18)" strokeWidth="1" />
                  <path d="M 145 115 C 165 140, 185 150, 200 155" fill="none" stroke="rgba(244, 198, 109, 0.18)" strokeWidth="1" />
                </svg>

                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '4px 12px 8px 12px',
                    maxWidth: '85%',
                    transform: 'translateY(-8px)',
                  }}
                >
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(216, 174, 97, 0.15)',
                      border: '1.2px solid #D8AE61',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#F4C66D',
                      marginBottom: '3px',
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                    </svg>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 'clamp(1.15rem, 1.4vw, 1.42rem)',
                      fontWeight: 800,
                      color: '#FFF5E5',
                      lineHeight: 1.1,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {leaf3Val}
                  </div>
                  <div
                    style={{
                      fontSize: 'clamp(0.66rem, 0.74vw, 0.76rem)',
                      fontWeight: 600,
                      color: '#D8AE61',
                      letterSpacing: '0.02em',
                      marginTop: '2px',
                      lineHeight: 1.25,
                      maxWidth: '150px',
                    }}
                  >
                    {leaf3Lbl}
                  </div>
                </div>
              </div>

              {/* LEAF 4: 100% FREEHOLD (Fixed: clean multi-line wrapping, no overflow) */}
              <div
                className="animate-leaf-float-4 leaf-card-wrapper"
                style={{
                  position: 'relative',
                  height: 'clamp(160px, 19vh, 180px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.035)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <svg
                  viewBox="0 0 310 190"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.5))',
                    overflow: 'visible',
                  }}
                >
                  <defs>
                    <linearGradient id="leafGradVp4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#003E30" stopOpacity="0.95" />
                      <stop offset="60%" stopColor="#064B39" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#0D6244" stopOpacity="0.82" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 18 95 C 30 155, 120 185, 205 170 C 250 160, 285 130, 305 85 C 275 35, 190 12, 105 18 C 45 25, 18 55, 18 95 Z"
                    fill="url(#leafGradVp4)"
                    stroke="url(#leafGoldStrokeVp)"
                    strokeWidth="2.2"
                  />
                  <path d="M 18 95 C 100 105, 200 105, 305 85" fill="none" stroke="rgba(244, 198, 109, 0.28)" strokeWidth="1.2" />
                  <path d="M 80 102 C 105 135, 150 155, 190 160" fill="none" stroke="rgba(244, 198, 109, 0.18)" strokeWidth="1" />
                  <path d="M 125 104 C 145 70, 185 45, 225 35" fill="none" stroke="rgba(244, 198, 109, 0.18)" strokeWidth="1" />
                  <path d="M 195 103 C 225 130, 255 140, 280 135" fill="none" stroke="rgba(244, 198, 109, 0.18)" strokeWidth="1" />
                </svg>

                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '4px 14px 8px 14px',
                    maxWidth: '85%',
                    transform: 'translateY(-8px)',
                  }}
                >
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(216, 174, 97, 0.15)',
                      border: '1.2px solid #D8AE61',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#F4C66D',
                      marginBottom: '3px',
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="6" />
                      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
                    </svg>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 'clamp(1.15rem, 1.4vw, 1.42rem)',
                      fontWeight: 800,
                      color: '#FFF5E5',
                      lineHeight: 1.1,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {leaf4Val}
                  </div>
                  <div
                    style={{
                      fontSize: 'clamp(0.66rem, 0.74vw, 0.76rem)',
                      fontWeight: 600,
                      color: '#D8AE61',
                      letterSpacing: '0.02em',
                      marginTop: '2px',
                      lineHeight: 1.25,
                      maxWidth: '160px',
                    }}
                  >
                    {leaf4Lbl}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* =========================================================================
          SECTION 4: STRATEGIC CONNECTIVITY & HIGHWAYS
          Exact Recreation of Reference Design with Cinematic Motion Animations
          ========================================================================= */}
      <section
        id="location"
        style={{
          width: '100%',
          padding: 'clamp(4.5rem, 7vh, 6rem) clamp(1.2rem, 3.5vw, 3.5rem)',
          backgroundColor: '#FAF7F2',
          backgroundImage:
            'radial-gradient(ellipse at 50% 25%, #FFFDF9 0%, #FAF6EF 55%, #F4ECE1 100%)',
          position: 'relative',
          fontFamily: "'Poppins', sans-serif",
          boxSizing: 'border-box',
          scrollMarginTop: '84px',
          overflow: 'hidden',
        }}
      >
        {/* Soft Decorative Ambient Background Waves (Left & Right Silk Dunes) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '320px',
            height: '100%',
            pointerEvents: 'none',
            opacity: 0.7,
            zIndex: 1,
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 320 800" fill="none" preserveAspectRatio="none">
            <path
              d="M-50 0 C 180 200, 40 450, -50 750 Z"
              fill="url(#leftSilkGrad)"
              opacity="0.45"
            />
            <path
              d="M-80 120 C 120 320, 20 550, -80 800 Z"
              fill="url(#leftSilkGrad2)"
              opacity="0.3"
            />
            <defs>
              <linearGradient id="leftSilkGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#D4A85A" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#064B3B" stopOpacity="0.03" />
              </linearGradient>
              <linearGradient id="leftSilkGrad2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FAF6EF" />
                <stop offset="100%" stopColor="#EFE6D8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '320px',
            height: '100%',
            pointerEvents: 'none',
            opacity: 0.7,
            zIndex: 1,
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 320 800" fill="none" preserveAspectRatio="none">
            <path
              d="M 370 0 C 140 200, 280 450, 370 750 Z"
              fill="url(#rightSilkGrad)"
              opacity="0.45"
            />
            <defs>
              <linearGradient id="rightSilkGrad" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4A85A" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#064B3B" stopOpacity="0.03" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 5 }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 3.5vh, 2.8rem)' }}>
            {/* Eyebrow */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                marginBottom: '0.85rem',
              }}
            >
              <span
                style={{
                  width: '36px',
                  height: '1.5px',
                  background: 'linear-gradient(90deg, transparent, #C99A43)',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontSize: 'clamp(0.76rem, 0.9vw, 0.86rem)',
                  fontWeight: 700,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: '#966122',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                STRATEGIC CONNECTIVITY & HIGHWAYS
              </span>
              <span
                style={{
                  width: '36px',
                  height: '1.5px',
                  background: 'linear-gradient(90deg, #C99A43, transparent)',
                  display: 'inline-block',
                }}
              />
            </div>

            {/* Main Heading with Golden Underline Stroke */}
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
                fontWeight: 700,
                color: '#064B3B',
                lineHeight: 1.18,
                margin: '0 auto',
                letterSpacing: '-0.02em',
                textAlign: 'center',
                maxWidth: '920px',
              }}
            >
              A Pristine Sanctuary with
              <br />
              <span style={{ position: 'relative', display: 'inline-block', marginTop: '4px' }}>
                <span
                  style={{
                    color: '#C99A43',
                    fontStyle: 'italic',
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 600,
                  }}
                >
                  Seamless Connectivity
                </span>
                {/* Champagne Gold Underline Stroke */}
                <svg
                  width="360"
                  height="22"
                  viewBox="0 0 360 22"
                  fill="none"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bottom: '-12px',
                    width: '100%',
                    maxWidth: '360px',
                    pointerEvents: 'none',
                  }}
                >
                  <path
                    d="M 6 11 Q 180 24 354 8"
                    stroke="url(#connectivityUnderlineGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="connectivityUnderlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C99A43" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#F4C66D" stopOpacity="1" />
                      <stop offset="100%" stopColor="#C99A43" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>
          </div>

          {/* =========================================================================
              DESKTOP CINEMATIC STAGE: HIGHWAY PORTAL + GOLDEN ORBIT ROUTE + 3 CARDS
              ========================================================================= */}
          <div
            className="vanam-connectivity-desktop-stage"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1120px',
              height: '510px',
              margin: '2rem auto 2.5rem',
            }}
          >
            {/* The Golden Highway Arch Portal */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                bottom: '35px',
                transform: 'translateX(-50%)',
                width: 'clamp(460px, 48vw, 660px)',
                height: 'clamp(280px, 30vw, 360px)',
                borderRadius: '330px 330px 0 0',
                overflow: 'hidden',
                border: '3.5px solid #C99A43',
                boxShadow:
                  '0 0 35px rgba(201, 154, 67, 0.4), 0 25px 60px rgba(6, 75, 59, 0.2)',
                zIndex: 8,
                animation: 'archRimGlowSweep 6s ease-in-out infinite alternate',
              }}
            >
              <img
                src={highwayPortalImg}
                alt="Panoramic Highway to Vanam Valley"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  animation: 'cinematicHighwayZoom 16s ease-in-out infinite alternate',
                }}
              />

              {/* Sunlight Sweep Ambient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(ellipse at 50% 25%, rgba(255, 235, 175, 0.35) 0%, rgba(201, 154, 67, 0.1) 40%, transparent 75%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Central Highway Road Golden Location Pin & Radiating Ripples */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '67%',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                  zIndex: 10,
                }}
              >
                {/* Expanding Concentric Ripple 1 */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: '2px solid rgba(244, 198, 109, 0.9)',
                    animation: 'roadRippleExpand 3.2s cubic-bezier(0.16, 1, 0.3, 1) infinite',
                  }}
                />
                {/* Expanding Concentric Ripple 2 */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: '2px solid rgba(244, 198, 109, 0.9)',
                    animation: 'roadRippleExpand 3.2s cubic-bezier(0.16, 1, 0.3, 1) infinite 1.1s',
                  }}
                />
                {/* Expanding Concentric Ripple 3 */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: '2px solid rgba(244, 198, 109, 0.9)',
                    animation: 'roadRippleExpand 3.2s cubic-bezier(0.16, 1, 0.3, 1) infinite 2.2s',
                  }}
                />

                {/* 3D Golden Location Pin */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    animation: 'pinFloatPulse 3s ease-in-out infinite',
                  }}
                >
                  <svg width="46" height="56" viewBox="0 0 32 40" fill="none">
                    <filter id="highwayPinShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#966122" floodOpacity="0.5" />
                    </filter>
                    <path
                      d="M16 0C7.163 0 0 7.163 0 16c0 11.5 16 24 16 24s16-12.5 16-24c0-8.837-7.163-16-16-16z"
                      fill="url(#goldHighwayPinGrad)"
                      stroke="#FFFFFF"
                      strokeWidth="1.8"
                      filter="url(#highwayPinShadow)"
                    />
                    <circle cx="16" cy="15" r="5.5" fill="#FFFFFF" />
                    <circle cx="16" cy="15" r="3" fill="#00382B" />
                    <defs>
                      <linearGradient id="goldHighwayPinGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FFF2D6" />
                        <stop offset="40%" stopColor="#F4C66D" />
                        <stop offset="100%" stopColor="#C99A43" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            {/* Overlaid Golden Orbital Route Arc SVG */}
            <svg
              viewBox="0 0 1100 480"
              fill="none"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 15,
              }}
            >
              <defs>
                <linearGradient id="highwayRouteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C99A43" stopOpacity="0.35" />
                  <stop offset="15%" stopColor="#F4C66D" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#FFEAA7" stopOpacity="1" />
                  <stop offset="85%" stopColor="#F4C66D" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#C99A43" stopOpacity="0.35" />
                </linearGradient>
                <filter id="highwayOrbGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Main Golden Curve Line connecting Card 1 -> Card 2 -> Card 3 */}
              <path
                id="goldenHighwayRoutePath"
                d="M 172 165 C 330 55, 435 28, 550 28 C 665 28, 770 55, 928 165"
                stroke="url(#highwayRouteGrad)"
                strokeWidth="3.2"
                strokeLinecap="round"
                fill="none"
              />

              {/* Small Golden Glowing Nodes along the trajectory */}
              <circle
                cx="360"
                cy="84"
                r="5.5"
                fill="#F4C66D"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                filter="url(#highwayOrbGlow)"
              />
              <circle
                cx="740"
                cy="84"
                r="5.5"
                fill="#F4C66D"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                filter="url(#highwayOrbGlow)"
              />

              {/* Continuous Traveling Golden Light Particle */}
              <circle r="6" fill="#FFF8E7" filter="url(#highwayOrbGlow)">
                <animateMotion
                  dur="4.5s"
                  repeatCount="indefinite"
                  path="M 172 165 C 330 55, 435 28, 550 28 C 665 28, 770 55, 928 165"
                />
              </circle>
            </svg>

            {/* DESTINATION CARD 1: LEFT (Wainganga Bypass Road) */}
            {(() => {
              const dest1 = REGIONAL_DESTINATIONS.find((d) => d.id === 'bypass') || REGIONAL_DESTINATIONS[0];
              return (
                <div
                  className="vanam-connectivity-card"
                  onClick={() => setSelectedDestinationDetail(dest1)}
                  style={{
                    position: 'absolute',
                    left: 'clamp(10px, 3.5vw, 45px)',
                    top: '165px',
                    width: 'clamp(215px, 21vw, 255px)',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid rgba(201, 154, 67, 0.4)',
                    borderRadius: '22px',
                    padding: '38px 16px 16px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(6, 75, 59, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04)',
                    zIndex: 20,
                  }}
                >
                  {/* Circular Green Icon Badge */}
                  <div
                    className="vanam-node-icon-circle"
                    style={{
                      position: 'absolute',
                      top: '-32px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: '#064B3B',
                      border: '3px solid #C99A43',
                      boxShadow: '0 0 0 2px #F4C66D, 0 8px 20px rgba(6, 75, 59, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F4C66D"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 19L8 5" />
                      <path d="M20 19L16 5" />
                      <path d="M12 5V9" strokeDasharray="2 2" />
                      <path d="M12 13V19" strokeDasharray="2 2" />
                    </svg>
                  </div>

                  <h4
                    style={{
                      fontSize: '0.98rem',
                      fontWeight: 700,
                      color: '#002B20',
                      margin: '0 0 8px 0',
                      lineHeight: 1.35,
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {dest1.name}
                  </h4>

                  <div
                    className="vanam-dist-badge"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 14px',
                      borderRadius: '9999px',
                      backgroundColor: '#FFF4E5',
                      border: '1px solid rgba(201, 154, 67, 0.35)',
                      color: '#966122',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      transition: 'all 0.25s ease',
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    <Clock size={13} color="#966122" />
                    <span>{dest1.dist} • {dest1.time}</span>
                  </div>
                </div>
              );
            })()}

            {/* DESTINATION CARD 2: CENTER TOP (Jagpura Ghat & Wainganga River) */}
            {(() => {
              const dest2 = REGIONAL_DESTINATIONS.find((d) => d.id === 'river') || REGIONAL_DESTINATIONS[1];
              return (
                <div
                  className="vanam-connectivity-card card-center"
                  onClick={() => setSelectedDestinationDetail(dest2)}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '28px',
                    width: 'clamp(230px, 23vw, 275px)',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid rgba(201, 154, 67, 0.4)',
                    borderRadius: '22px',
                    padding: '38px 16px 16px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(6, 75, 59, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04)',
                    zIndex: 20,
                  }}
                >
                  {/* Circular Green Icon Badge */}
                  <div
                    className="vanam-node-icon-circle"
                    style={{
                      position: 'absolute',
                      top: '-32px',
                      left: '50%',
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: '#064B3B',
                      border: '3px solid #C99A43',
                      boxShadow: '0 0 0 2px #F4C66D, 0 8px 20px rgba(6, 75, 59, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F4C66D"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 9c3-3 6-3 9 0s6 3 9 0" />
                      <path d="M3 15c3-3 6-3 9 0s6 3 9 0" />
                    </svg>
                  </div>

                  <h4
                    style={{
                      fontSize: '0.98rem',
                      fontWeight: 700,
                      color: '#002B20',
                      margin: '0 0 8px 0',
                      lineHeight: 1.35,
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {dest2.name}
                  </h4>

                  <div
                    className="vanam-dist-badge"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 14px',
                      borderRadius: '9999px',
                      backgroundColor: '#FFF4E5',
                      border: '1px solid rgba(201, 154, 67, 0.35)',
                      color: '#966122',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      transition: 'all 0.25s ease',
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    <Clock size={13} color="#966122" />
                    <span>{dest2.dist} • {dest2.time}</span>
                  </div>
                </div>
              );
            })()}

            {/* DESTINATION CARD 3: RIGHT (Balaghat Central Bus Stand) */}
            {(() => {
              const dest3 = REGIONAL_DESTINATIONS.find((d) => d.id === 'bus') || REGIONAL_DESTINATIONS[2];
              return (
                <div
                  className="vanam-connectivity-card"
                  onClick={() => setSelectedDestinationDetail(dest3)}
                  style={{
                    position: 'absolute',
                    right: 'clamp(10px, 3.5vw, 45px)',
                    top: '165px',
                    width: 'clamp(215px, 21vw, 255px)',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid rgba(201, 154, 67, 0.4)',
                    borderRadius: '22px',
                    padding: '38px 16px 16px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(6, 75, 59, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04)',
                    zIndex: 20,
                  }}
                >
                  {/* Circular Green Icon Badge */}
                  <div
                    className="vanam-node-icon-circle"
                    style={{
                      position: 'absolute',
                      top: '-32px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: '#064B3B',
                      border: '3px solid #C99A43',
                      boxShadow: '0 0 0 2px #F4C66D, 0 8px 20px rgba(6, 75, 59, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F4C66D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="4" y="3" width="16" height="15" rx="3" />
                      <path d="M4 11h16" />
                      <path d="M8 6v5" />
                      <path d="M16 6v5" />
                      <circle cx="8" cy="15" r="1" fill="#F4C66D" />
                      <circle cx="16" cy="15" r="1" fill="#F4C66D" />
                      <path d="M6 18v2" />
                      <path d="M18 18v2" />
                    </svg>
                  </div>

                  <h4
                    style={{
                      fontSize: '0.98rem',
                      fontWeight: 700,
                      color: '#002B20',
                      margin: '0 0 8px 0',
                      lineHeight: 1.35,
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {dest3.name}
                  </h4>

                  <div
                    className="vanam-dist-badge"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 14px',
                      borderRadius: '9999px',
                      backgroundColor: '#FFF4E5',
                      border: '1px solid rgba(201, 154, 67, 0.35)',
                      color: '#966122',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      transition: 'all 0.25s ease',
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    <Clock size={13} color="#966122" />
                    <span>{dest3.dist} • {dest3.time}</span>
                  </div>
                </div>
              );
            })()}

            {/* Centered Button: View All Regional Destinations → */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 25,
              }}
            >
              <button
                type="button"
                onClick={() => setIsAllDestinationsModalOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 26px 11px 16px',
                  borderRadius: '9999px',
                  backgroundColor: '#064B3B',
                  color: '#FFFFFF',
                  border: '1.5px solid #C99A43',
                  cursor: 'pointer',
                  boxShadow:
                    '0 10px 28px rgba(6, 75, 59, 0.45), 0 0 20px rgba(201, 154, 67, 0.4)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#08734F';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow =
                    '0 14px 34px rgba(6, 75, 59, 0.55), 0 0 28px rgba(244, 198, 109, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#064B3B';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow =
                    '0 10px 28px rgba(6, 75, 59, 0.45), 0 0 20px rgba(201, 154, 67, 0.4)';
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#002B20',
                    border: '1px solid #C99A43',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#F4C66D">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </div>
                <span>View All Regional Destinations</span>
                <span style={{ fontSize: '1.15rem', lineHeight: 1, color: '#F4C66D' }}>→</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              MOBILE RESPONSIVE STAGE (< 960px)
              ========================================================================= */}
          <div
            className="vanam-connectivity-mobile-stage"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '1.5rem',
              margin: '1.5rem auto 2.5rem',
              alignItems: 'center',
            }}
          >
            {/* Highway Arch Image */}
            <div
              style={{
                width: '100%',
                maxWidth: '440px',
                height: '240px',
                borderRadius: '180px 180px 20px 20px',
                overflow: 'hidden',
                border: '3px solid #C99A43',
                position: 'relative',
                boxShadow: '0 10px 30px rgba(6, 75, 59, 0.15)',
              }}
            >
              <img
                src={highwayPortalImg}
                alt="Highway to Vanam Valley"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '65%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <MapPin size={34} color="#F4C66D" />
              </div>
            </div>

            {/* 3 Mobile Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.2rem',
                width: '100%',
              }}
            >
              {[
                REGIONAL_DESTINATIONS.find((d) => d.id === 'bypass') || REGIONAL_DESTINATIONS[0],
                REGIONAL_DESTINATIONS.find((d) => d.id === 'river') || REGIONAL_DESTINATIONS[1],
                REGIONAL_DESTINATIONS.find((d) => d.id === 'bus') || REGIONAL_DESTINATIONS[2],
              ].map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => setSelectedDestinationDetail(dest)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid rgba(201, 154, 67, 0.4)',
                    borderRadius: '18px',
                    padding: '20px 16px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#002B20', margin: '0 0 8px 0' }}>
                    {dest.name}
                  </h4>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      backgroundColor: '#FFF4E5',
                      color: '#966122',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                    }}
                  >
                    <Clock size={12} color="#966122" />
                    <span>{dest.dist} • {dest.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile View All Button */}
            <button
              type="button"
              onClick={() => setIsAllDestinationsModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '11px 24px',
                borderRadius: '9999px',
                backgroundColor: '#064B3B',
                color: '#FFFFFF',
                border: '1.5px solid #C99A43',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Compass size={16} color="#F4C66D" />
              <span>View All Regional Destinations →</span>
            </button>
          </div>

          {/* =========================================================================
              BOTTOM OFFICIAL SITE LOCATION PANEL
              ========================================================================= */}
          <div
            className="vanam-connectivity-bottom-panel"
            style={{
              maxWidth: '1180px',
              margin: '2.5rem auto 0',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid rgba(201, 154, 67, 0.4)',
              borderRadius: '9999px',
              padding: '12px 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              boxShadow: '0 8px 30px rgba(6, 75, 59, 0.05), 0 1px 4px rgba(0, 0, 0, 0.04)',
              boxSizing: 'border-box',
              flexWrap: 'wrap',
            }}
          >
            {/* Left: 3D Map Graphic with Pin */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img
                src="/connectivity_3d_map_clean.png"
                alt="Vanam Valley Official Location"
                style={{
                  height: '48px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
                }}
              />
              <div
                style={{
                  width: '1px',
                  height: '38px',
                  backgroundColor: 'rgba(201, 154, 67, 0.35)',
                  margin: '0 4px',
                }}
              />
              <div>
                <h4
                  style={{
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    color: '#002B20',
                    margin: '0 0 2px 0',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Official Site Location: Kaspur Village, Tehsil Waraseoni
                </h4>
                <p
                  style={{
                    fontSize: '0.82rem',
                    color: '#6B665E',
                    margin: 0,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  District Balaghat, Madhya Pradesh – 481331 (Coordinates: 21.8129° N, 80.1838° E)
                </p>
              </div>
            </div>

            {/* Right: Divider & Google Maps Pill Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '1px',
                  height: '38px',
                  backgroundColor: 'rgba(201, 154, 67, 0.35)',
                }}
              />
              <a
                href="https://maps.google.com/?q=Waraseoni+Balaghat+Madhya+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 20px',
                  borderRadius: '9999px',
                  backgroundColor: '#FAF6EF',
                  border: '1.5px solid rgba(201, 154, 67, 0.5)',
                  color: '#002B20',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(201, 154, 67, 0.12)',
                  transition: 'all 0.25s ease',
                  fontFamily: "'Poppins', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#C99A43';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(201, 154, 67, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FAF6EF';
                  e.currentTarget.style.borderColor = 'rgba(201, 154, 67, 0.5)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(201, 154, 67, 0.12)';
                }}
              >
                {/* Official Google Maps Multi-color SVG */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335" />
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 2.5 1.7 5.5 3.5 8l3.5-8V2z" fill="#34A853" opacity="0.9" />
                  <circle cx="12" cy="9" r="3" fill="#FFFFFF" />
                  <circle cx="12" cy="9" r="1.5" fill="#4285F4" />
                </svg>
                <span>Open in Google Maps</span>
                <ExternalLink size={13} color="#966122" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          POPUP MODAL 1: ALL REGIONAL DESTINATIONS (ALL 9 CARDS)
          ========================================================================= */}
      {isAllDestinationsModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            backgroundColor: 'rgba(0, 20, 15, 0.85)',
            backdropFilter: 'blur(12px)',
            overscrollBehavior: 'contain',
            touchAction: 'pan-y',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            fontFamily: "'Poppins', sans-serif",
          }}
          onClick={() => setIsAllDestinationsModalOpen(false)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1160px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#FAF8F4',
              borderRadius: '24px',
              border: '2px solid #D4A85A',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.65)',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '1.5rem 2rem',
                backgroundColor: '#00382B',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '2px solid #D4A85A',
                position: 'sticky',
                top: 0,
                zIndex: 10,
              }}
            >
              <div>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F7D6B0', display: 'block', marginBottom: '2px' }}>
                  ✦ COMPLETE CONNECTIVITY DIRECTORY ✦
                </span>
                <h3 style={{ fontSize: 'clamp(1.25rem, 2vw, 1.6rem)', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                  All Regional Destinations & Corridors
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: 'rgba(248, 246, 240, 0.78)' }}>
                  Explore all 9 verified landmarks, travel times, and directions from Vanam Valley.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAllDestinationsModalOpen(false)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(247, 214, 176, 0.15)',
                  border: '1px solid rgba(212, 168, 90, 0.5)',
                  color: '#F7D6B0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body: Category Filters & 9-Card Grid */}
            <div style={{ padding: '1.75rem 2rem 2.5rem' }}>
              {/* Category Filter Inside Modal */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'all', label: 'All (9)' },
                  { id: 'nature', label: 'Parks & Wildlife (4)' },
                  { id: 'transit', label: 'Air & Express Transit (3)' },
                  { id: 'civic', label: 'City & Conveniences (2)' },
                ].map((cat) => {
                  const isActive = modalCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setModalCategory(cat.id as any)}
                      style={{
                        padding: '6px 16px',
                        borderRadius: '9999px',
                        fontSize: '0.82rem',
                        fontWeight: isActive ? 700 : 500,
                        backgroundColor: isActive ? '#00382B' : '#FFFFFF',
                        color: isActive ? '#FFFFFF' : '#00382B',
                        border: '1.5px solid rgba(212, 168, 90, 0.4)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* 9 Cards Grid Inside Modal */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.25rem',
                }}
              >
                {REGIONAL_DESTINATIONS.filter(
                  (d) => modalCategory === 'all' || d.category === modalCategory
                ).map((item) => (
                  <div
                    key={item.id}
                    className="vanam-destination-card"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      border: '1.5px solid rgba(212, 168, 90, 0.35)',
                      boxShadow: '0 6px 18px rgba(0, 0, 0, 0.04)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.28s ease',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setSelectedDestinationDetail(item);
                    }}
                  >
                    <div
                      className="vanam-img-container-light"
                      style={{ position: 'relative', width: '100%', height: '140px', overflow: 'hidden' }}
                    >
                      <img
                        loading="lazy"
                        decoding="async"
                        src={item.img}
                        alt={item.name}
                        className="vanam-card-img"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          padding: '3px 8px',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(0, 38, 30, 0.9)',
                          color: '#F7D6B0',
                          fontSize: '0.62rem',
                          fontWeight: 700,
                        }}
                      >
                        {item.tag}
                      </div>
                    </div>

                    <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                      <div>
                        <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#002B20', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                          {item.name}
                        </h4>

                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 10px', borderRadius: '8px', backgroundColor: '#FFF5E8', color: '#966122', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px' }}>
                          <Clock size={13} />
                          <span>{item.dist} • {item.time}</span>
                        </div>

                        <p style={{ fontSize: '0.74rem', color: '#6B665E', margin: '0 0 12px 0' }}>
                          {item.route}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderTop: '1px solid rgba(212, 168, 90, 0.2)', paddingTop: '10px' }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDestinationDetail(item);
                          }}
                          style={{
                            flex: 1,
                            padding: '7px 10px',
                            borderRadius: '9999px',
                            backgroundColor: '#00382B',
                            color: '#FFFFFF',
                            fontSize: '0.76rem',
                            fontWeight: 700,
                            border: 'none',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                          }}
                        >
                          <span>Full Details</span>
                          <ArrowRight size={11} color="#F7D6B0" />
                        </button>

                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(item.name + ' Balaghat Madhya Pradesh')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            padding: '7px 10px',
                            borderRadius: '9999px',
                            backgroundColor: '#FAF5ED',
                            color: '#966122',
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            border: '1px solid rgba(212, 168, 90, 0.45)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <span>Maps</span>
                          <ExternalLink size={10} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          POPUP MODAL 2: DESTINATION FULL DETAIL DIALOG (SEPARATED FLEX HEADER, ZERO OVERLAP)
          ========================================================================= */}
      {selectedDestinationDetail && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2200,
            backgroundColor: 'rgba(0, 15, 10, 0.88)',
            backdropFilter: 'blur(16px)',
            overscrollBehavior: 'contain',
            touchAction: 'pan-y',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(0.75rem, 2vw, 1.5rem)',
            fontFamily: "'Poppins', sans-serif",
          }}
          onClick={() => setSelectedDestinationDetail(null)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '740px',
              maxHeight: '90vh',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '2px solid #D4A85A',
              boxShadow: '0 35px 85px rgba(0, 0, 0, 0.75)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Image Banner: FIXED HEIGHT & NEVER SQUISHED */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '230px',
                minHeight: '230px',
                flexShrink: 0,
                backgroundColor: '#00261E',
                overflow: 'hidden',
              }}
            >
              <img
                loading="lazy"
                decoding="async"
                src={selectedDestinationDetail.img}
                alt={selectedDestinationDetail.name}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* High-Contrast Gradient Scrim Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(0, 32, 24, 0.85) 0%, rgba(0, 24, 18, 0.25) 45%, rgba(0, 20, 15, 0.95) 100%)',
                }}
              />

              {/* Flex Header Content: Top Row and Bottom Row Separated */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  boxSizing: 'border-box',
                }}
              >
                {/* Top Row: Category Tag on Left, Close Button on Right */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 14px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(0, 48, 36, 0.92)',
                      color: '#F7D6B0',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      border: '1px solid rgba(212, 168, 90, 0.7)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    ✦ {selectedDestinationDetail.tag}
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedDestinationDetail(null)}
                    aria-label="Close details"
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 0, 0.65)',
                      border: '1.5px solid rgba(255, 255, 255, 0.5)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Bottom Row: Destination Title & Highway Corridor Tag */}
                <div>
                  <h3
                    style={{
                      fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      margin: '0 0 4px 0',
                      lineHeight: 1.2,
                      textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                    }}
                  >
                    {selectedDestinationDetail.name}
                  </h3>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#F7D6B0',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                    }}
                  >
                    <MapPin size={14} color="#D4A85A" />
                    <span>{selectedDestinationDetail.access}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Modal Content */}
            <div
              style={{
                padding: '20px 24px 26px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {/* 4 Stat Badges */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
                  gap: '10px',
                }}
              >
                <div
                  style={{
                    padding: '10px 12px',
                    borderRadius: '12px',
                    backgroundColor: '#FAF6EE',
                    border: '1px solid rgba(212, 168, 90, 0.35)',
                  }}
                >
                  <div style={{ fontSize: '0.66rem', color: '#966122', fontWeight: 700, textTransform: 'uppercase' }}>
                    Distance
                  </div>
                  <div style={{ fontSize: '1.15rem', color: '#00382B', fontWeight: 800 }}>
                    {selectedDestinationDetail.dist}
                  </div>
                </div>

                <div
                  style={{
                    padding: '10px 12px',
                    borderRadius: '12px',
                    backgroundColor: '#FAF6EE',
                    border: '1px solid rgba(212, 168, 90, 0.35)',
                  }}
                >
                  <div style={{ fontSize: '0.66rem', color: '#966122', fontWeight: 700, textTransform: 'uppercase' }}>
                    Drive Time
                  </div>
                  <div style={{ fontSize: '1.15rem', color: '#00382B', fontWeight: 800 }}>
                    {selectedDestinationDetail.time}
                  </div>
                </div>

                <div
                  style={{
                    padding: '10px 12px',
                    borderRadius: '12px',
                    backgroundColor: '#FAF6EE',
                    border: '1px solid rgba(212, 168, 90, 0.35)',
                  }}
                >
                  <div style={{ fontSize: '0.66rem', color: '#966122', fontWeight: 700, textTransform: 'uppercase' }}>
                    Route Corridor
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#00382B', fontWeight: 700, marginTop: '2px' }}>
                    {selectedDestinationDetail.route}
                  </div>
                </div>

                <div
                  style={{
                    padding: '10px 12px',
                    borderRadius: '12px',
                    backgroundColor: '#FAF6EE',
                    border: '1px solid rgba(212, 168, 90, 0.35)',
                  }}
                >
                  <div style={{ fontSize: '0.66rem', color: '#966122', fontWeight: 700, textTransform: 'uppercase' }}>
                    Origin
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#00382B', fontWeight: 700, marginTop: '2px' }}>
                    Vanam Valley
                  </div>
                </div>
              </div>

              {/* Destination Overview */}
              <div>
                <h4
                  style={{
                    fontSize: '0.86rem',
                    fontWeight: 800,
                    color: '#00382B',
                    marginBottom: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  Destination Overview & Importance
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#4A463F', lineHeight: 1.6, margin: 0 }}>
                  {selectedDestinationDetail.desc}
                </p>
              </div>

              {/* Key Route & Travel Advantages */}
              <div
                style={{
                  padding: '14px 16px',
                  borderRadius: '14px',
                  backgroundColor: '#F8F6F0',
                  border: '1px solid rgba(212, 168, 90, 0.28)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    color: '#966122',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                  }}
                >
                  ✦ Key Route & Travel Advantages:
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {selectedDestinationDetail.highlights.map((h: string, hIdx: number) => (
                    <li key={hIdx} style={{ fontSize: '0.82rem', color: '#3B3730', lineHeight: 1.45 }}>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px', flexWrap: 'wrap' }}>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(selectedDestinationDetail.name + ' Balaghat Madhya Pradesh')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    minWidth: '220px',
                    padding: '12px 20px',
                    borderRadius: '9999px',
                    backgroundColor: '#00382B',
                    color: '#FFFFFF',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(0, 56, 43, 0.25)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <MapPin size={16} color="#F7D6B0" />
                  <span>Open Live Directions in Google Maps</span>
                  <ExternalLink size={14} />
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedDestinationDetail(null)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '9999px',
                    backgroundColor: 'transparent',
                    color: '#5C574F',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    border: '1.5px solid #D4A85A',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 5: CURATED WORLD-CLASS AMENITIES (EXACT REFERENCE RECREATION)
          100% Visual Fidelity to Reference Image: Hero Split, Pill Nav, 3 S-Curve Cards
          ========================================================================= */}
      <section
        id="amenities"
        style={{
          padding: 'clamp(4rem, 6vw, 6rem) clamp(1.2rem, 3.5vw, 3.5rem)',
          backgroundColor: '#FAF6EF',
          fontFamily: "'Poppins', sans-serif",
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          {/* Top Hero Split Layout */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(2rem, 4vw, 3.5rem)',
              alignItems: 'center',
              marginBottom: 'clamp(2.5rem, 4vw, 3.8rem)',
            }}
          >
            {/* Left Hero Column */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '1rem',
                }}
              >
                <div style={{ width: '28px', height: '1.5px', backgroundColor: '#C99A43' }} />
                <span
                  style={{
                    color: '#C99A43',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {amenEyebrow}
                </span>
                <div style={{ width: '28px', height: '1.5px', backgroundColor: '#C99A43' }} />
              </div>

              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2.4rem, 4.2vw, 4.2rem)',
                  fontWeight: 700,
                  color: '#064B3B',
                  lineHeight: 1.12,
                  letterSpacing: '-0.02em',
                  margin: '0 0 1.25rem 0',
                }}
              >
                World-Class<br />
                Amenities &<br />
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  <span style={{ color: '#C99A43', fontStyle: 'italic', fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Features
                  </span>
                  <svg
                    width="240"
                    height="20"
                    viewBox="0 0 240 20"
                    fill="none"
                    style={{ position: 'absolute', left: '-5px', bottom: '-10px', pointerEvents: 'none' }}
                  >
                    <path
                      d="M 4 8 C 65 3, 160 5, 235 15"
                      stroke="#C99A43"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>

              <p
                style={{
                  color: '#555555',
                  fontSize: 'clamp(0.95rem, 1.05vw, 1.08rem)',
                  lineHeight: 1.65,
                  maxWidth: '520px',
                  margin: '0 0 2rem 0',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {amenSubtitle}
              </p>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('amenities-nav-bar')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 28px 12px 32px',
                    borderRadius: '9999px',
                    backgroundColor: '#064B3B',
                    color: '#FFFFFF',
                    fontSize: '0.94rem',
                    fontWeight: 600,
                    border: '1.5px solid #064B3B',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(6, 75, 59, 0.35)',
                    transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                    fontFamily: "'Poppins', sans-serif",
                    letterSpacing: '0.01em',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#08734F';
                    e.currentTarget.style.borderColor = '#08734F';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(6, 75, 59, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#064B3B';
                    e.currentTarget.style.borderColor = '#064B3B';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(6, 75, 59, 0.35)';
                  }}
                >
                  <span>Explore Amenities</span>
                  <span
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#C99A43',
                      color: '#064B3B',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    →
                  </span>
                </button>
              </div>
            </div>

            {/* Right Hero Column: Landscape Clubhouse & Pool with Sweeping Golden Oval Frame */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '660px',
                height: 'clamp(280px, 32vw, 380px)',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Outer Golden Glow Oval Halo Ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-6px',
                  borderRadius: '48% 52% 46% 54% / 58% 58% 42% 42%',
                  border: '2px solid rgba(201, 154, 67, 0.55)',
                  filter: 'drop-shadow(0 8px 24px rgba(201, 154, 67, 0.25))',
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '48% 52% 46% 54% / 58% 58% 42% 42%',
                  overflow: 'hidden',
                  border: '3px solid #C99A43',
                  boxShadow: '0 20px 50px rgba(6, 75, 59, 0.16)',
                }}
              >
                <img
                  src={clubBannerImg}
                  alt="Vanam Valley Resort Clubhouse & Infinity Pool"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>

              {/* Top-Right Circular Luxury Living Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '18px',
                  zIndex: 4,
                  width: '74px',
                  height: '74px',
                  borderRadius: '50%',
                  backgroundColor: '#064B3B',
                  border: '2.5px solid #C99A43',
                  boxShadow: '0 10px 24px rgba(6, 75, 59, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  color: '#FFFFFF',
                  padding: '4px',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C99A43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3c-1.5 3-4 5.5-7 6 3 1.5 5 4 5 7 0-3 2-5.5 5-7-3-.5-5.5-3-7-6z" />
                  <path d="M12 16c-1 2-2.5 3.5-4 4 2 1 3.5 1 5 1s3 0 5-1c-1.5-.5-3-2-4-4z" />
                </svg>
                <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#F4C66D', letterSpacing: '0.04em', lineHeight: 1.1, marginTop: '2px' }}>
                  Luxury<br />Living
                </span>
              </div>
            </div>
          </div>

          {/* Category Navigation Bar (Rounded Capsule Pill) */}
          <div
            id="amenities-nav-bar"
            style={{
              maxWidth: '1240px',
              margin: '0 auto clamp(2rem, 3.5vw, 3rem)',
              backgroundColor: '#FFFFFF',
              borderRadius: '9999px',
              border: '1.5px solid rgba(201, 154, 67, 0.45)',
              boxShadow: '0 8px 26px rgba(6, 75, 59, 0.06)',
              padding: '6px 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              gap: '4px',
            }}
          >
            {[
              {
                id: 'all',
                label: 'All Amenities',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C99A43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  </svg>
                ),
              },
              {
                id: 'club',
                label: 'Club & Dining',
                icon: (
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#C99A43" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
                    <path d="M15 2v18" />
                    <path d="M6 2v7a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V2" />
                    <path d="M9 12v8" />
                  </svg>
                ),
              },
              {
                id: 'wellness',
                label: 'Wellness & Spa',
                icon: (
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#C99A43" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3c-1.5 3-3 6.5-6 8 2.5.5 5-.5 6-3 1 2.5 3.5 3.5 6 3-3-1.5-4.5-5-6-8z" />
                    <path d="M12 12c-2.5 2-6 3.5-9 3 2 1.5 5 1.5 8 0 1 1 2 1 3 0 3 1.5 6 1.5 8 0-3 .5-6.5-1-9-3z" />
                  </svg>
                ),
              },
              {
                id: 'sports',
                label: 'Sports & Recreation',
                icon: (
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#C99A43" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="5" r="2" />
                    <path d="m15 22-3-7-3 4-2-2 4-6 2 2 3-1" />
                  </svg>
                ),
              },
              {
                id: 'events',
                label: 'Banquet & Events',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C99A43" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                ),
              },
              {
                id: 'infra',
                label: 'Township Infrastructure',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C99A43" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                ),
              },
            ].map((cat, idx, arr) => {
              const isActive = amenityCategory === cat.id;
              return (
                <div key={cat.id} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => setAmenityCategory(cat.id as any)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '9px',
                      padding: '9px 18px',
                      borderRadius: '9999px',
                      border: 'none',
                      backgroundColor: isActive ? '#064B3B' : 'transparent',
                      color: isActive ? '#FFFFFF' : '#333333',
                      fontSize: '0.86rem',
                      fontWeight: isActive ? 600 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      fontFamily: "'Poppins', sans-serif",
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(201, 154, 67, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                  {idx < arr.length - 1 && (
                    <div
                      style={{
                        width: '1px',
                        height: '20px',
                        backgroundColor: 'rgba(201, 154, 67, 0.35)',
                        marginLeft: '4px',
                        marginRight: '4px',
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Exactly 3 Amenity Cards in One Horizontal Row */}
          <div
            id="amenities-cards"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(1.2rem, 2vw, 1.8rem)',
              maxWidth: '1240px',
              margin: '0 auto',
            }}
          >
            {(() => {
              const categoryCardSets: Record<string, Array<{
                id: string;
                title: string;
                badge: string;
                image: string;
                iconType: string;
                desc: string;
                highlights: string[];
                timing: string;
                capacity: string;
              }>> = {
                all: [
                  {
                    id: 'dining',
                    title: 'Club & Dining',
                    badge: 'CLUB & FINE DINING',
                    image: amenCard1Img,
                    iconType: 'dining',
                    desc: 'The Canopy Restro-Bar & fine dining restaurant where gourmet multi-cuisine menus, artisan beverages, and ambient forest canopy views come together for exceptional culinary moments.',
                    highlights: [
                      'Multi-cuisine fine dining restaurant & lounge',
                      'Outdoor timber deck seating overlooking green woodland',
                      'Artisan coffee & mocktail bar for evening gatherings',
                      'Exclusive residents dining privileges & event catering',
                    ],
                    timing: '7:00 AM – 11:00 PM',
                    capacity: '120+ Guests',
                  },
                  {
                    id: 'pool',
                    title: 'Swimming Pool',
                    badge: 'AQUATICS & LEISURE',
                    image: amenCard2Img,
                    iconType: 'pool',
                    desc: 'Pristine open-air forest infinity swimming pool surrounded by manicured timber sun decks, loungers, and tranquil mountain vistas, complemented by a dedicated shallow kids splash pool.',
                    highlights: [
                      'Full-length infinity-edge lap pool',
                      'Separate safe splash pool for toddlers & children',
                      'Timber sundeck with sun-loungers & poolside service',
                      'Continuous ozonated eco filtration system',
                    ],
                    timing: '6:00 AM – 8:00 PM',
                    capacity: 'Olympic Horizon Design',
                  },
                  {
                    id: 'spa',
                    title: 'Spa & Wellness',
                    badge: 'HOLISTIC WELLNESS',
                    image: amenCard3Img,
                    iconType: 'spa',
                    desc: 'Authentic Ayurvedic therapy suites, steam, sauna, and restorative relaxation rooms designed to revitalize body, mind, and spirit amidst gentle forest aromas and ambient water sounds.',
                    highlights: [
                      'Ayurvedic massage & holistic healing treatment rooms',
                      'Separate Swedish steam & cedarwood sauna chambers',
                      'Meditation relaxation lounge with herbal refreshments',
                      'Certified therapists & natural botanical essential oils',
                    ],
                    timing: '8:00 AM – 7:00 PM',
                    capacity: 'Private Wellness Suites',
                  },
                ],
                club: [
                  {
                    id: 'club-1',
                    title: 'The Canopy Restro-Bar',
                    badge: 'GOURMET DINING',
                    image: curatedAmen?.clubDiningImage || amenCard1Img,
                    iconType: 'dining',
                    desc: 'Grand clubhouse restaurant and restro-bar featuring artisan dining, outdoor timber decks, and panoramic views of lush green forest vistas.',
                    highlights: ['Chef-crafted multi-cuisine menu', 'Alfresco timber deck seating', 'Resident celebration zones', 'Full banquet catering'],
                    timing: '7:00 AM – 11:00 PM',
                    capacity: '120 Guests',
                  },
                  {
                    id: 'club-2',
                    title: 'Sunset Timber Lounge',
                    badge: 'ALFRESCO SOCIALIZING',
                    image: curatedAmen?.clubLoungeImage || '/amenities/clubhouse_resort.jpg',
                    iconType: 'dining',
                    desc: 'Open-air timber deck lounge elevated above the greens, perfect for sundowners, quiet reading, or evening conversations with neighbours.',
                    highlights: ['Panoramic forest sunset views', 'Comfortable rattan lounge seating', 'Evening ambient warm lighting', 'Acoustic musical evenings'],
                    timing: '4:00 PM – 10:30 PM',
                    capacity: '60 Guests',
                  },
                  {
                    id: 'club-3',
                    title: 'Private Dining Suites',
                    badge: 'VIP CELEBRATIONS',
                    image: curatedAmen?.clubPrivateDiningImage || '/amenities/dining_card.jpg',
                    iconType: 'dining',
                    desc: 'Intimate climate-controlled private dining rooms with personalized butler service for family anniversaries, birthdays, and elite business dinners.',
                    highlights: ['Dedicated private service staff', 'Customizable celebration menus', 'Audio-visual screen integration', 'Exclusive reserve seating'],
                    timing: 'By Reservation',
                    capacity: 'Up to 24 Guests',
                  },
                ],
                wellness: [
                  {
                    id: 'wellness-1',
                    title: 'Infinity Pool',
                    badge: 'AQUATIC RECREATION',
                    image: amenCard2Img,
                    iconType: 'pool',
                    desc: 'Pristine infinity pool reflecting green hills, with dedicated sunbeds, change rooms, and eco-friendly water purification.',
                    highlights: ['Zero-edge infinity horizon', 'Shallow kids pool adjoining', 'Sunbathing wooden loungers', 'Certified lifeguard on duty'],
                    timing: '6:00 AM – 8:00 PM',
                    capacity: 'Lap & Leisure Pool',
                  },
                  {
                    id: 'wellness-2',
                    title: 'Ayurvedic Spa & Sauna',
                    badge: 'REJUVENATION',
                    image: amenCard3Img,
                    iconType: 'spa',
                    desc: 'Therapeutic treatment suites offering Panchakarma, aromatherapy, Swedish massages, and cedarwood steam baths.',
                    highlights: ['Holistic herbal oil therapies', 'Independent steam & sauna rooms', 'Tranquil meditation garden', 'Certified ayurvedic doctors'],
                    timing: '8:00 AM – 7:00 PM',
                    capacity: '4 Private Suites',
                  },
                  {
                    id: 'wellness-3',
                    title: 'Yoga & Peace Pavilion',
                    badge: 'MINDFUL LIVING',
                    image: curatedAmen?.yogaImage || amenCard3Img,
                    iconType: 'spa',
                    desc: 'Open-air wooden yoga deck nestled in pure woodland birdsong, ideal for sunrise pranayama, yoga, and contemplative stillness.',
                    highlights: ['Morning guided yoga sessions', 'Natural soundscape & fresh oxygen', 'Eco-friendly bamboo floor mats', 'Peaceful forest backdrop'],
                    timing: '5:30 AM – 10:00 AM',
                    capacity: '40 Practitioners',
                  },
                ],
                sports: [
                  {
                    id: 'sports-1',
                    title: 'Executive Mini Golf Turf',
                    badge: 'LEISURE GOLF',
                    image: curatedAmen?.golfImage || '/amenities/clubhouse_resort.jpg',
                    iconType: 'sports',
                    desc: 'Professionally contoured executive mini-golf putting green with undulating slopes for weekend family fun and putting mastery.',
                    highlights: ['Multiple pin positions & breaks', 'High-grade synthetic tour grass', 'Equipment available at clubhouse', 'Fun for all generations'],
                    timing: '6:00 AM – 7:00 PM',
                    capacity: '9-Hole Contoured Green',
                  },
                  {
                    id: 'sports-2',
                    title: 'Multi-Sport Courts',
                    badge: 'ACTIVE ATHLETICS',
                    image: curatedAmen?.sportsCourtImage || '/amenities/pool_card.jpg',
                    iconType: 'sports',
                    desc: 'Championship-grade acrylic surface sports court marked for badminton, basketball, volleyball, and pickleball with floodlights.',
                    highlights: ['Shock-absorbent sports flooring', 'High-intensity night floodlights', 'Tournament badminton markings', 'Equipment checkout counter'],
                    timing: '6:00 AM – 10:00 PM',
                    capacity: 'Multi-Sport Arena',
                  },
                  {
                    id: 'sports-3',
                    title: 'Forest Jogging & Cycling',
                    badge: 'FITNESS TRAILS',
                    image: curatedAmen?.joggingTrackImage || '/amenities/dining_card.jpg',
                    iconType: 'sports',
                    desc: 'Dedicated paved fitness track winding along the lush perimeter of the gated estate beneath mature native shade trees.',
                    highlights: ['Continuous 1.8km perimeter loop', 'Zero motor vehicle traffic', 'Distance markers every 100 meters', 'Reflective solar safety bollards'],
                    timing: '24 Hours Access',
                    capacity: 'Scenic Estate Circuit',
                  },
                ],
                events: [
                  {
                    id: 'events-1',
                    title: 'Grand Wedding Lawn',
                    badge: 'DESTINATION CELEBRATIONS',
                    image: curatedAmen?.weddingLawnImage || '/amenities/clubhouse_resort.jpg',
                    iconType: 'events',
                    desc: 'Manicured green banquet lawn capable of hosting regal destination weddings, corporate galas, and milestone family celebrations.',
                    highlights: ['Capacity for up to 1,000+ attendees', 'Dedicated buffet & kitchen pavilion', 'Direct bridal suite access', 'Valet parking holding zone'],
                    timing: 'Event Bookings',
                    capacity: '1,000+ Guests',
                  },
                  {
                    id: 'events-2',
                    title: 'Air-Conditioned Banquet Hall',
                    badge: 'INDOOR BALLROOM',
                    image: curatedAmen?.banquetHallImage || '/amenities/dining_card.jpg',
                    iconType: 'events',
                    desc: 'Luxurious soundproof banquet hall with crystal lighting, integrated state-of-the-art acoustics, and private pre-function lounge.',
                    highlights: ['Central air-conditioning', 'Modular stage & presentation screens', 'Executive green rooms & restrooms', 'Grand entrance porch'],
                    timing: 'Event Bookings',
                    capacity: '350 Guests',
                  },
                  {
                    id: 'events-3',
                    title: 'Forest Amphitheatre',
                    badge: 'CULTURAL ARTS',
                    image: curatedAmen?.amphitheatreImage || '/amenities/spa_card.jpg',
                    iconType: 'events',
                    desc: 'Stepped open-air amphitheatre set against natural slopes for festival performances, movie screenings, and musical evenings.',
                    highlights: ['Tiered grass & stone seating', 'Natural acoustic sound shell', 'Star-lit sky cinema screenings', 'Cultural community stage'],
                    timing: 'Evening Events',
                    capacity: '200 Guests',
                  },
                ],
                infra: [
                  {
                    id: 'infra-1',
                    title: 'Wide Concrete Roads',
                    badge: 'ROAD NETWORK',
                    image: curatedAmen?.roadsImage || '/amenities/clubhouse_resort.jpg',
                    iconType: 'infra',
                    desc: 'Spacious 25ft and 30ft wide cement concrete boulevards built to heavy-duty highway specifications with storm curbs.',
                    highlights: ['25ft & 30ft wide concrete boulevards', 'Rainwater guttering & curbs', 'Native flowering avenue trees', 'Underground power & pipe ducts'],
                    timing: 'Perpetual Access',
                    capacity: 'Smooth Dual-Lane Flow',
                  },
                  {
                    id: 'infra-2',
                    title: 'Underground Drainage Grid',
                    badge: 'ECO UTILITIES',
                    image: curatedAmen?.drainageImage || '/amenities/pool_card.jpg',
                    iconType: 'infra',
                    desc: '100% subterranean conduit infrastructure for zero visible overhead wires, accompanied by eco-friendly rainwater harvesting.',
                    highlights: ['Concealed electric & internet cabling', 'Heavy rainfall storm drain channels', 'Percolation pits & water conservation', 'Unobstructed scenic sky views'],
                    timing: '24x7 Continuous Grid',
                    capacity: 'Township Infrastructure',
                  },
                  {
                    id: 'infra-3',
                    title: 'Multi-Tier Gated Security',
                    badge: 'SAFETY & PEACE OF MIND',
                    image: curatedAmen?.securityImage || '/amenities/dining_card.jpg',
                    iconType: 'infra',
                    desc: 'Grand boundary walls, round-the-clock security personnel at entry barriers, and HD CCTV perimeter surveillance network.',
                    highlights: ['Guarded gatehouse with boom barriers', '24x7 HD night-vision CCTV network', 'Visitor registration & pass control', 'Roving security patrols on estate'],
                    timing: '24 Hours / 365 Days',
                    capacity: 'Zero-Tolerance Security',
                  },
                ],
              };

              const displayedCards = categoryCardSets[amenityCategory] || categoryCardSets.all;

              return displayedCards.map((card) => {
                return (
                  <div
                    key={card.id}
                    onClick={() => setSelectedAmenityDetail(card)}
                    style={{
                      height: 'clamp(210px, 17vw, 240px)',
                      borderRadius: '26px',
                      border: '1.5px solid rgba(201, 154, 67, 0.45)',
                      boxShadow: '0 12px 30px rgba(6, 75, 59, 0.1), 0 0 16px rgba(201, 154, 67, 0.15)',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px) scale(1.015)';
                      e.currentTarget.style.boxShadow = '0 20px 45px rgba(6, 75, 59, 0.2), 0 0 28px rgba(201, 154, 67, 0.4)';
                      e.currentTarget.style.borderColor = '#C99A43';
                      const img = e.currentTarget.querySelector('img');
                      if (img) img.style.transform = 'scale(1.08)';
                      const btn = e.currentTarget.querySelector('.amenity-arrow-btn') as HTMLElement;
                      if (btn) {
                        btn.style.backgroundColor = '#F4C66D';
                        btn.style.transform = 'scale(1.1) translateX(2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 12px 30px rgba(6, 75, 59, 0.1), 0 0 16px rgba(201, 154, 67, 0.15)';
                      e.currentTarget.style.borderColor = 'rgba(201, 154, 67, 0.45)';
                      const img = e.currentTarget.querySelector('img');
                      if (img) img.style.transform = 'scale(1)';
                      const btn = e.currentTarget.querySelector('.amenity-arrow-btn') as HTMLElement;
                      if (btn) {
                        btn.style.backgroundColor = '#C99A43';
                        btn.style.transform = 'scale(1) translateX(0)';
                      }
                    }}
                  >
                    {/* Full-bleed Photo Background */}
                    <img
                      src={card.image}
                      alt={card.title}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />

                    {/* Dark Forest Gradient Overlay for Pristine Legibility */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(6,75,59,0.25) 45%, rgba(2,30,24,0.92) 100%)',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Top-Left: Circular Emerald Icon Badge with Champagne Gold Border */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        zIndex: 3,
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        backgroundColor: '#064B3B',
                        border: '1.5px solid #F4C66D',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {card.iconType === 'dining' && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
                          <path d="M15 2v18" />
                          <path d="M6 2v7a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V2" />
                          <path d="M9 12v8" />
                        </svg>
                      )}
                      {card.iconType === 'pool' && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                          <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                          <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                        </svg>
                      )}
                      {card.iconType === 'spa' && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3c-1.5 3-4 5.5-7 6 3 1.5 5 4 5 7 0-3 2-5.5 5-7-3-.5-5.5-3-7-6z" />
                          <path d="M12 16c-1 2-2.5 3.5-4 4 2 1 3.5 1 5 1s3 0 5-1c-1.5-.5-3-2-4-4z" />
                        </svg>
                      )}
                      {card.iconType === 'sports' && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="5" r="2" />
                          <path d="m15 22-3-7-3 4-2-2 4-6 2 2 3-1" />
                        </svg>
                      )}
                      {card.iconType === 'events' && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                      )}
                      {card.iconType === 'infra' && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 2 7 12 12 22 7 12 2" />
                          <polyline points="2 17 12 22 22 17" />
                          <polyline points="2 12 12 17 22 12" />
                        </svg>
                      )}
                    </div>

                    {/* Bottom: Title & Circular Champagne Gold Arrow Button */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '18px',
                        left: '20px',
                        right: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        zIndex: 3,
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: 'clamp(1.15rem, 1.4vw, 1.38rem)',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          lineHeight: 1.25,
                          letterSpacing: '-0.01em',
                          margin: 0,
                          textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {card.title}
                      </h3>

                      <div
                        className="amenity-arrow-btn"
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          backgroundColor: '#C99A43',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#064B3B',
                          fontWeight: 800,
                          fontSize: '1.15rem',
                          boxShadow: '0 4px 14px rgba(201, 154, 67, 0.45)',
                          flexShrink: 0,
                          transition: 'all 0.25s ease',
                        }}
                      >
                        →
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          {/* Decorative Gold Dots Matrix (3 cols x 4 rows) */}
          <div
            style={{
              position: 'absolute',
              right: 'max(1rem, calc((100% - 1240px) / 2 - 28px))',
              bottom: 'clamp(4rem, 6vw, 6rem)',
              transform: 'translateY(-120px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 5px)',
              gridTemplateRows: 'repeat(4, 5px)',
              gap: '8px',
              pointerEvents: 'none',
              opacity: 0.8,
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#C99A43' }} />
            ))}
          </div>
        </div>

        {/* =========================================================================
            AMENITY DETAIL MODAL (With Background Scroll Lock)
            ========================================================================= */}
        {selectedAmenityDetail && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              backgroundColor: 'rgba(6, 75, 59, 0.6)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(1rem, 3vw, 2.5rem)',
              overflowY: 'auto',
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedAmenityDetail(null);
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '680px',
                backgroundColor: '#FAF6EF',
                borderRadius: '28px',
                border: '1.5px solid rgba(201, 154, 67, 0.45)',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.3)',
                overflow: 'hidden',
                position: 'relative',
                animation: 'vanamFadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image Banner */}
              <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden' }}>
                <img
                  src={selectedAmenityDetail.image}
                  alt={selectedAmenityDetail.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(6, 75, 59, 0.85) 0%, rgba(6, 75, 59, 0.2) 60%, transparent 100%)',
                  }}
                />

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedAmenityDetail(null)}
                  style={{
                    position: 'absolute',
                    top: '18px',
                    right: '18px',
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, 0.55)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(201, 154, 67, 0.9)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.55)';
                  }}
                >
                  ✕
                </button>

                {/* Category Badge & Title on Image */}
                <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(201, 154, 67, 0.95)',
                      color: '#FFFFFF',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    {selectedAmenityDetail.badge}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 'clamp(1.6rem, 2.8vw, 2.1rem)',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {selectedAmenityDetail.title.replace(' ', ' ')}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div style={{ padding: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
                {/* Spec Badges Row */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: '14px',
                      backgroundColor: '#FFFFFF',
                      border: '1.2px solid rgba(201, 154, 67, 0.3)',
                    }}
                  >
                    <div style={{ fontSize: '0.72rem', color: '#888888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>
                      Operational Hours
                    </div>
                    <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#064B3B' }}>
                      {selectedAmenityDetail.timing}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: '14px',
                      backgroundColor: '#FFFFFF',
                      border: '1.2px solid rgba(201, 154, 67, 0.3)',
                    }}
                  >
                    <div style={{ fontSize: '0.72rem', color: '#888888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>
                      Capacity / Scale
                    </div>
                    <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#064B3B' }}>
                      {selectedAmenityDetail.capacity}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p style={{ color: '#444444', fontSize: '0.95rem', lineHeight: 1.65, margin: '0 0 1.5rem 0' }}>
                  {selectedAmenityDetail.desc}
                </p>

                {/* Highlights List */}
                <div
                  style={{
                    padding: '16px 20px',
                    borderRadius: '16px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(201, 154, 67, 0.25)',
                    marginBottom: '1.8rem',
                  }}
                >
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#C99A43', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>
                    Luxury Specifications & Features
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '18px', color: '#333333', fontSize: '0.88rem', lineHeight: 1.7 }}>
                    {selectedAmenityDetail.highlights.map((h: string, idx: number) => (
                      <li key={idx} style={{ marginBottom: '4px' }}>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Buttons */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedAmenityDetail(null)}
                    style={{
                      padding: '11px 24px',
                      borderRadius: '9999px',
                      border: '1.2px solid rgba(6, 75, 59, 0.3)',
                      backgroundColor: 'transparent',
                      color: '#064B3B',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAmenityDetail(null);
                      document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      padding: '11px 26px',
                      borderRadius: '9999px',
                      border: 'none',
                      backgroundColor: '#064B3B',
                      color: '#FFFFFF',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 6px 18px rgba(6, 75, 59, 0.25)',
                    }}
                  >
                    Enquire About Membership & Villas →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* =========================================================================
          SECTION 6: ABOUT US & BRAND HERITAGE
          Official Reference Design Card + Verified Developer & Leadership Showcase
          ========================================================================= */}
      <section
        id="about"
        className="vanam-about-section"
        style={{
          width: '100%',
          minHeight: '620px',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: "url('/about_vanam_clean_bg_hd.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          fontFamily: "'Poppins', sans-serif",
          padding: 'clamp(4rem, 6vh, 5.5rem) clamp(1.5rem, 5vw, 5.5rem)',
        }}
      >
        <div style={{ width: '100%', maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '540px', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '0.75rem' }}>
              <span style={{ color: '#F7D6B0', fontSize: '13px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                ABOUT US
              </span>
              <span style={{ display: 'inline-block', width: '44px', height: '2px', background: 'linear-gradient(90deg, #F7D6B0 0%, rgba(247, 214, 176, 0.2) 100%)', borderRadius: '2px' }} />
            </div>

            <h2 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.8rem)', fontWeight: 800, lineHeight: 1.15, color: '#FFFFFF', margin: '0 0 1.25rem 0', letterSpacing: '-0.02em' }}>
              About <br />
              <span style={{ color: '#F7D6B0', fontWeight: 700 }}>Vanam Valley</span>
            </h2>

            <p style={{ fontSize: 'clamp(0.88rem, 1.05vw, 1rem)', lineHeight: 1.68, color: 'rgba(255, 255, 255, 0.9)', margin: '0 0 2rem 0', maxWidth: '480px' }}>
              Vanam Valley, Balaghat — a rare 27-acre human territory rising amidst the serene natural landscapes of Central India. Offering 129 signature villas, Phase 1 Garra plots, and The Canopy Club.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '2.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minWidth: '92px' }}>
                <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: 'linear-gradient(135deg, #FFF9F0 0%, #F5E2C8 100%)', border: '1px solid rgba(247, 214, 176, 0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                  <Layers size={24} color="#002D22" />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.3 }}>Residential<br />Plots</span>
              </div>
              <div style={{ width: '1px', height: '50px', background: 'rgba(255, 255, 255, 0.25)', margin: '0 clamp(12px, 2vw, 24px) 16px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minWidth: '92px' }}>
                <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: 'linear-gradient(135deg, #FFF9F0 0%, #F5E2C8 100%)', border: '1px solid rgba(247, 214, 176, 0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                  <HomeIcon size={24} color="#002D22" />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.3 }}>Duplex<br />Villas</span>
              </div>
              <div style={{ width: '1px', height: '50px', background: 'rgba(255, 255, 255, 0.25)', margin: '0 clamp(12px, 2vw, 24px) 16px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minWidth: '92px' }}>
                <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: 'linear-gradient(135deg, #FFF9F0 0%, #F5E2C8 100%)', border: '1px solid rgba(247, 214, 176, 0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                  <Leaf size={24} color="#002D22" />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.3 }}>Planned<br />Township</span>
              </div>
            </div>

            <div>
              <Link
                to="/about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '0.9rem 2.25rem',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #FFF1DF 0%, #F7D6B0 100%)',
                  color: '#00261E',
                  fontSize: '14px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(247, 214, 176, 0.4)',
                }}
              >
                <span>Read Master Story</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: WHEN NATURE INSPIRES A VISION (EXACT REFERENCE RECREATION)
          - Top Row: 4 Emerald & Gold Arched Shield Cards with Laurel Wreath Initial Medallions & Wave Footer
          - Middle: Ornamental Gold Hairline Divider with Diamond Heraldic Jewel
          - Bottom Row: 4 Warm Ivory Shield Cards with Scalloped Clover Emerald Badges & Gold Icons
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(4.5rem, 7vh, 6rem) clamp(1.2rem, 3.5vw, 3.5rem)',
          backgroundColor: '#FAF7F2',
          backgroundImage:
            'radial-gradient(ellipse at 50% 10%, rgba(216, 174, 97, 0.12) 0%, transparent 60%), radial-gradient(ellipse at 50% 90%, rgba(6, 75, 59, 0.05) 0%, transparent 70%)',
          fontFamily: "'Poppins', sans-serif",
          overflow: 'hidden',
        }}
      >
        {/* Subtle Silk Wave Background Accents */}
        <svg
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.35,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <path d="M 0 120 Q 360 40 720 140 Q 1080 240 1440 160 L 1440 600 L 0 600 Z" fill="#F4EFE6" opacity="0.5" />
          <path d="M 0 320 Q 400 220 800 340 Q 1200 460 1440 380 L 1440 600 L 0 600 Z" fill="#EFE8DC" opacity="0.4" />
        </svg>

        <div style={{ maxWidth: '1380px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#966122',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              ✦ LEADERSHIP & DEVELOPERS ✦
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2.1rem, 3.4vw, 3.1rem)',
                fontWeight: 800,
                color: '#00382B',
                lineHeight: 1.2,
                margin: '0 0 0.5rem 0',
                letterSpacing: '-0.01em',
              }}
            >
              When Nature Inspires a Vision
            </h2>
            <p
              style={{
                color: '#5C574F',
                fontSize: 'clamp(0.9rem, 1vw, 0.98rem)',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              A visionary alliance between Vishwaa Ventures Realty Pvt. Ltd. and esteemed land associates, crafting Balaghat's premier gated eco-luxury estate in perfect forest harmony.
            </p>
          </div>

          {/* =================================================================
              TOP ROW: 4 EMERALD & GOLD LEADERSHIP SHIELD CARDS
              - Arched Top with Laurel Wreath Initial Crest Medallion
              - Deep Emerald Green Gradient with Forest Mountain Silhouette
              - Designation Badges & Wave Metallic Champagne Gold Trim
              ================================================================= */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'clamp(1rem, 1.8vw, 1.8rem)',
              alignItems: 'stretch',
            }}
          >
            {[
              {
                initial: 'M',
                name: 'Mr. Shailendra Mankar',
                badge: 'DIRECTOR',
                orgLine1: 'Vishwaa Ventures',
                orgLine2: 'Realty Pvt. Ltd.',
              },
              {
                initial: 'K',
                name: 'Mr. Kapil Kumarr',
                badge: 'DIRECTOR & PMC',
                orgLine1: 'Project Management',
                orgLine2: 'Consultant, Nagpur',
              },
              {
                initial: 'P',
                name: 'Mr. Gunendra Patle',
                badge: 'ASSOCIATE',
                orgLine1: 'Land & Development',
                orgLine2: 'Associate, Balaghat',
              },
              {
                initial: 'P',
                name: 'Mr. Chetan Patle',
                badge: 'ASSOCIATE',
                orgLine1: 'Land & Development',
                orgLine2: 'Associate, Balaghat',
              },
            ].map((lead, idx) => (
              <div
                key={idx}
                style={{
                  position: 'relative',
                  padding: '2rem 1.4rem 2.8rem 1.4rem',
                  borderRadius: '28px',
                  background: 'linear-gradient(180deg, #004535 0%, #003125 55%, #001F18 100%)',
                  border: '1.8px solid rgba(216, 174, 97, 0.55)',
                  boxShadow: '0 14px 34px rgba(6, 75, 59, 0.16), 0 0 20px rgba(201, 154, 67, 0.14)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  minHeight: '300px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow =
                    '0 24px 50px rgba(6, 75, 59, 0.28), 0 0 32px rgba(244, 198, 109, 0.45)';
                  e.currentTarget.style.borderColor = '#F4C66D';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow =
                    '0 14px 34px rgba(6, 75, 59, 0.16), 0 0 20px rgba(201, 154, 67, 0.14)';
                  e.currentTarget.style.borderColor = 'rgba(216, 174, 97, 0.55)';
                }}
              >
                {/* Forest Ridge Silhouette at Bottom of Card */}
                <svg
                  viewBox="0 0 280 75"
                  preserveAspectRatio="none"
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: 0,
                    right: 0,
                    width: '100%',
                    height: '70px',
                    opacity: 0.38,
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                >
                  <path d="M 0 45 Q 60 18 130 40 Q 200 58 280 28 L 280 75 L 0 75 Z" fill="#001812" />
                  <path
                    d="M 12 75 L 18 48 L 24 75 Z M 28 75 L 36 38 L 44 75 Z M 48 75 L 54 48 L 60 75 Z M 75 75 L 83 40 L 91 75 Z M 110 75 L 118 35 L 126 75 Z M 140 75 L 147 42 L 154 75 Z M 170 75 L 178 32 L 186 75 Z M 205 75 L 213 40 L 221 75 Z M 235 75 L 242 45 L 249 75 Z M 255 75 L 263 36 L 271 75 Z"
                    fill="#00110D"
                  />
                </svg>

                {/* Scalloped Metallic Champagne Gold Wave Footer Bar */}
                <svg
                  viewBox="0 0 280 44"
                  preserveAspectRatio="none"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: '100%',
                    height: '42px',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                >
                  <defs>
                    <linearGradient id={`goldWaveGrad-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C99A43" />
                      <stop offset="35%" stopColor="#FFE7A8" />
                      <stop offset="70%" stopColor="#D4A74F" />
                      <stop offset="100%" stopColor="#A6782E" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 22 C 45 36, 95 38, 140 24 C 185 10, 235 14, 280 26 L 280 44 L 0 44 Z"
                    fill={`url(#goldWaveGrad-${idx})`}
                  />
                  <path
                    d="M 0 22 C 45 36, 95 38, 140 24 C 185 10, 235 14, 280 26"
                    fill="none"
                    stroke="#FFF8E0"
                    strokeWidth="2"
                    opacity="0.95"
                    style={{ filter: 'drop-shadow(0 0 4px #F4C66D)' }}
                  />
                </svg>

                {/* Laurel Wreath Crest with Initial Medallion */}
                <div style={{ position: 'relative', width: '92px', height: '64px', margin: '0 auto 1rem auto', zIndex: 3 }}>
                  {/* Left Laurel Branch */}
                  <svg
                    width="34"
                    height="58"
                    viewBox="0 0 34 58"
                    fill="none"
                    style={{ position: 'absolute', left: '-5px', top: '1px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))' }}
                  >
                    <path d="M 28 52 C 18 44, 6 30, 10 8" stroke="#F4C66D" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M 24 47 C 16 47, 12 42, 16 38 C 20 38, 23 42, 24 47 Z" fill="#FFE5A3" stroke="#D8AE61" strokeWidth="1" />
                    <path d="M 18 36 C 8 35, 6 28, 12 25 C 16 26, 18 31, 18 36 Z" fill="#FFE5A3" stroke="#D8AE61" strokeWidth="1" />
                    <path d="M 13 24 C 3 22, 2 15, 8 13 C 12 15, 14 19, 13 24 Z" fill="#FFE5A3" stroke="#D8AE61" strokeWidth="1" />
                    <path d="M 10 11 C 2 8, 4 2, 9 3 C 12 5, 12 8, 10 11 Z" fill="#FFE5A3" stroke="#D8AE61" strokeWidth="1" />
                  </svg>

                  {/* Right Laurel Branch */}
                  <svg
                    width="34"
                    height="58"
                    viewBox="0 0 34 58"
                    fill="none"
                    style={{ position: 'absolute', right: '-5px', top: '1px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))' }}
                  >
                    <path d="M 6 52 C 16 44, 28 30, 24 8" stroke="#F4C66D" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M 10 47 C 18 47, 22 42, 18 38 C 14 38, 11 42, 10 47 Z" fill="#FFE5A3" stroke="#D8AE61" strokeWidth="1" />
                    <path d="M 16 36 C 26 35, 28 28, 22 25 C 18 26, 16 31, 16 36 Z" fill="#FFE5A3" stroke="#D8AE61" strokeWidth="1" />
                    <path d="M 21 24 C 31 22, 32 15, 26 13 C 22 15, 20 19, 21 24 Z" fill="#FFE5A3" stroke="#D8AE61" strokeWidth="1" />
                    <path d="M 24 11 C 32 8, 30 2, 25 3 C 22 5, 22 8, 24 11 Z" fill="#FFE5A3" stroke="#D8AE61" strokeWidth="1" />
                  </svg>

                  {/* Center Circular Medallion */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '5px',
                      transform: 'translateX(-50%)',
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFDF9',
                      border: '2.5px solid #F4C66D',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35), 0 0 14px rgba(244, 198, 109, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 3,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '1.65rem',
                        fontWeight: 800,
                        color: '#064B3B',
                        lineHeight: 1,
                      }}
                    >
                      {lead.initial}
                    </span>
                  </div>
                </div>

                {/* Leader Name */}
                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(1.18rem, 1.35vw, 1.35rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    margin: '0 0 10px 0',
                    lineHeight: 1.2,
                    zIndex: 3,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {lead.name}
                </h3>

                {/* Designation Badge */}
                <div
                  style={{
                    display: 'inline-block',
                    padding: '4px 18px',
                    borderRadius: '9999px',
                    backgroundColor: '#FFF4DC',
                    border: '1.2px solid #D8AE61',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: '#00382B',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    zIndex: 3,
                  }}
                >
                  {lead.badge}
                </div>

                {/* Organization & City */}
                <p
                  style={{
                    fontSize: '0.84rem',
                    color: 'rgba(255, 245, 229, 0.82)',
                    margin: 0,
                    lineHeight: 1.45,
                    fontWeight: 400,
                    zIndex: 3,
                  }}
                >
                  {lead.orgLine1}
                  <br />
                  {lead.orgLine2}
                </p>
              </div>
            ))}
          </div>

          {/* =================================================================
              CENTER ORNAMENTAL GOLD DIVIDER WITH DIAMOND HERALDIC JEWEL
              ================================================================= */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '3.5rem 0',
              position: 'relative',
            }}
          >
            {/* Left Gold Hairline */}
            <div
              style={{
                flex: 1,
                height: '1.5px',
                background: 'linear-gradient(90deg, transparent, rgba(201, 154, 67, 0.3) 30%, #C99A43 100%)',
              }}
            />

            {/* Center Diamond Jewel */}
            <div
              style={{
                margin: '0 24px',
                width: '32px',
                height: '32px',
                transform: 'rotate(45deg)',
                border: '2px solid #C99A43',
                backgroundColor: '#FAF7F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(201, 154, 67, 0.45)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  border: '1.5px solid #F4C66D',
                  backgroundColor: '#064B3B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: '6px', height: '6px', backgroundColor: '#F4C66D', borderRadius: '50%' }} />
              </div>
            </div>

            {/* Right Gold Hairline */}
            <div
              style={{
                flex: 1,
                height: '1.5px',
                background: 'linear-gradient(90deg, #C99A43 0%, rgba(201, 154, 67, 0.3) 70%, transparent 100%)',
              }}
            />
          </div>

          {/* =================================================================
              BOTTOM ROW: 4 WARM IVORY SHIELD CARDS WITH SCALLOPED CLOVER EMBLEMS
              - Warm Ivory Canvas (#FFFDF8) with Champagne Gold Outline
              - Scalloped Emerald Green Moroccan Clover Emblem Badges with Gold Icons
              - Scalloped Metallic Champagne Gold Wave Footer Bar
              ================================================================= */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'clamp(1rem, 1.8vw, 1.8rem)',
              alignItems: 'stretch',
            }}
          >
            {[
              {
                title: 'Exceptional Air Quality (AQ)',
                desc: 'Surrounded by evergreen sal woodlands with pristine natural oxygen levels.',
                icon: (
                  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
                  </svg>
                ),
              },
              {
                title: "India's Densest Tiger Belt",
                desc: 'Strategically positioned in the wildlife corridor between Kanha and Pench.',
                icon: (
                  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8l2-4 3 2 3-3 3 3 3-2 2 4c1 4-1 9-8 12C5 17 3 12 4 8z" />
                    <circle cx="9" cy="11" r="1" fill="#F4C66D" />
                    <circle cx="15" cy="11" r="1" fill="#F4C66D" />
                    <path d="M12 13v2m-2-1h4m-5 4h6" />
                  </svg>
                ),
              },
              {
                title: 'Low-Density Living',
                desc: 'Just 129 exclusive villas spread across 27 generous acres of forest greenery.',
                icon: (
                  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <path d="M9 22V12h6v10" />
                    <path d="M12 7l-2 2m4 0l-2-2" />
                  </svg>
                ),
              },
              {
                title: 'Promising Investment',
                desc: 'Rapidly appreciating corridor with clean freehold titles and planned infrastructure.',
                icon: (
                  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#F4C66D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                    <polyline points="4 8 10 2 14 6 20 0" />
                  </svg>
                ),
              },
            ].map((pillar, pI) => (
              <div
                key={pI}
                style={{
                  position: 'relative',
                  padding: '2.4rem 1.5rem 2.8rem 1.5rem',
                  borderRadius: '28px',
                  backgroundColor: '#FFFDF8',
                  border: '1.8px solid rgba(201, 154, 67, 0.45)',
                  boxShadow: '0 10px 30px rgba(6, 75, 59, 0.06), 0 0 18px rgba(201, 154, 67, 0.12)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  minHeight: '270px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow =
                    '0 22px 48px rgba(6, 75, 59, 0.14), 0 0 28px rgba(201, 154, 67, 0.38)';
                  e.currentTarget.style.borderColor = '#C99A43';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow =
                    '0 10px 30px rgba(6, 75, 59, 0.06), 0 0 18px rgba(201, 154, 67, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(201, 154, 67, 0.45)';
                }}
              >
                {/* Scalloped Metallic Champagne Gold Wave Footer Bar */}
                <svg
                  viewBox="0 0 280 44"
                  preserveAspectRatio="none"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: '100%',
                    height: '40px',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                >
                  <defs>
                    <linearGradient id={`goldWaveGradBottom-${pI}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C99A43" />
                      <stop offset="35%" stopColor="#FFE7A8" />
                      <stop offset="70%" stopColor="#D4A74F" />
                      <stop offset="100%" stopColor="#A6782E" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 22 C 45 36, 95 38, 140 24 C 185 10, 235 14, 280 26 L 280 44 L 0 44 Z"
                    fill={`url(#goldWaveGradBottom-${pI})`}
                  />
                  <path
                    d="M 0 22 C 45 36, 95 38, 140 24 C 185 10, 235 14, 280 26"
                    fill="none"
                    stroke="#FFF8E0"
                    strokeWidth="2"
                    opacity="0.95"
                    style={{ filter: 'drop-shadow(0 0 4px #F4C66D)' }}
                  />
                </svg>

                {/* Scalloped Moroccan Clover Emerald Badge with Gold Icon */}
                <div style={{ position: 'relative', width: '60px', height: '60px', margin: '0 auto 1.1rem auto', zIndex: 3 }}>
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 58 58"
                    style={{ filter: 'drop-shadow(0 4px 10px rgba(6, 75, 59, 0.35))' }}
                  >
                    <defs>
                      <radialGradient id={`cloverGrad-${pI}`} cx="50%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="#08604B" />
                        <stop offset="60%" stopColor="#00382B" />
                        <stop offset="100%" stopColor="#00221A" />
                      </radialGradient>
                    </defs>
                    {/* 4-lobed Moroccan Clover Arch */}
                    <path
                      d="M 29 4 C 36 4, 40 9, 41 16 C 48 17, 54 21, 54 29 C 54 37, 48 41, 41 42 C 40 49, 36 54, 29 54 C 22 54, 18 49, 17 42 C 10 41, 4 37, 4 29 C 4 21, 10 17, 17 16 C 18 9, 22 4, 29 4 Z"
                      fill={`url(#cloverGrad-${pI})`}
                      stroke="#F4C66D"
                      strokeWidth="2"
                    />
                  </svg>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {pillar.icon}
                  </div>
                </div>

                {/* Pillar Title */}
                <h4
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(1.1rem, 1.25vw, 1.25rem)',
                    fontWeight: 800,
                    color: '#00382B',
                    lineHeight: 1.25,
                    margin: '0 0 10px 0',
                    zIndex: 3,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {pillar.title}
                </h4>

                {/* Pillar Description */}
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: '#555149',
                    margin: '0 auto',
                    lineHeight: 1.55,
                    fontWeight: 400,
                    maxWidth: '240px',
                    zIndex: 3,
                  }}
                >
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: BUYER UTILITY — HOME LOAN EMI & AFFORDABILITY CALCULATOR
          Clear Inputs, Proper Validation & Instant Interactive Breakdown
          ========================================================================= */}
      <section style={{ padding: 'clamp(4.5rem, 7vh, 6rem) clamp(1.2rem, 3.5vw, 3.5rem)', backgroundColor: '#FFFFFF', fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#966122', display: 'block', marginBottom: '0.4rem' }}>
              ✦ BUYER UTILITY & PLANNING ✦
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.2vw, 3rem)', fontWeight: 800, color: '#004B3C', margin: '0 0 0.5rem 0' }}>
              Home Loan EMI & Investment Calculator
            </h2>
            <p style={{ color: '#5C574F', fontSize: '0.95rem', maxWidth: '640px', margin: '0 auto' }}>
              Calculate your estimated monthly installment and interest distribution for your Vanam forest villa or residential plot.
            </p>
          </div>

          {(() => {
            const P = emiLoan;
            const r = emiRate / 12 / 100;
            const n = emiTenure * 12;
            const emi = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)) || 0;
            const totalPayment = emi * n;
            const totalInterest = totalPayment - P;

            return (
              <div
                className="vanam-home-calculator-card"
                style={{
                  backgroundColor: '#FAF7F2',
                  borderRadius: '24px',
                  border: '1.5px solid rgba(212, 168, 90, 0.4)',
                  padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '2.5rem',
                  alignItems: 'center',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                }}
              >
                {/* Sliders Form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Slider 1: Loan Amount */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#002B20' }}>Loan Amount</label>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: '#004B3C' }}>₹{(emiLoan / 100000).toFixed(1)} Lakhs</span>
                    </div>
                    <input
                      type="range"
                      min={1000000}
                      max={15000000}
                      step={100000}
                      value={emiLoan}
                      onChange={(e) => setEmiLoan(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#004B3C', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#7A756C' }}>
                      <span>₹10 Lakhs</span>
                      <span>₹1.50 Crore</span>
                    </div>
                  </div>

                  {/* Slider 2: Interest Rate */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#002B20' }}>Interest Rate (% p.a.)</label>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: '#004B3C' }}>{emiRate}%</span>
                    </div>
                    <input
                      type="range"
                      min={7.0}
                      max={12.0}
                      step={0.1}
                      value={emiRate}
                      onChange={(e) => setEmiRate(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#004B3C', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#7A756C' }}>
                      <span>7.0%</span>
                      <span>12.0%</span>
                    </div>
                  </div>

                  {/* Slider 3: Loan Tenure */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#002B20' }}>Loan Tenure</label>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: '#004B3C' }}>{emiTenure} Years</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={30}
                      step={1}
                      value={emiTenure}
                      onChange={(e) => setEmiTenure(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#004B3C', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#7A756C' }}>
                      <span>5 Years</span>
                      <span>30 Years</span>
                    </div>
                  </div>
                </div>

                {/* Calculation Results Card */}
                <div style={{ backgroundColor: '#00382B', borderRadius: '18px', padding: '2rem', color: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ borderBottom: '1px solid rgba(247, 214, 176, 0.25)', paddingBottom: '1rem' }}>
                    <div style={{ fontSize: '0.82rem', color: '#F7D6B0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Monthly Payment</div>
                    <div style={{ fontSize: 'clamp(2rem, 3vw, 2.6rem)', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>₹{emi.toLocaleString('en-IN')} <span style={{ fontSize: '0.88rem', fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}>/ month</span></div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <div style={{ fontSize: '0.74rem', color: '#D4A85A', textTransform: 'uppercase' }}>Principal Amount</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>₹{P.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.74rem', color: '#D4A85A', textTransform: 'uppercase' }}>Total Interest</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>₹{totalInterest.toLocaleString('en-IN')}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    <Link
                      to="/calculators"
                      style={{
                        flex: 1,
                        padding: '10px 16px',
                        backgroundColor: '#F7D6B0',
                        color: '#00261E',
                        borderRadius: '9999px',
                        fontWeight: 700,
                        fontSize: '0.84rem',
                        textAlign: 'center',
                        textDecoration: 'none',
                      }}
                    >
                      Detailed Calculators & Area Converter →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: SCHEDULE YOUR GUIDED SITE VISIT (EXACT REFERENCE RECREATION)
          - Left: Editorial Typography, 3 Office Badges, Helplines Pill & Gate Panorama
          - Right: Quick Site Visit Form with Gold/Emerald Corner Swoop & Luxury Inputs
          ========================================================================= */}
      <section
        id="contact"
        style={{
          position: 'relative',
          padding: 'clamp(4.5rem, 7vh, 6rem) clamp(1.2rem, 3.5vw, 3.5rem)',
          backgroundColor: '#FAF7F2',
          backgroundImage:
            'radial-gradient(ellipse at 70% 20%, rgba(216, 174, 97, 0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(6, 75, 59, 0.05) 0%, transparent 70%)',
          fontFamily: "'Poppins', sans-serif",
          overflow: 'hidden',
        }}
      >
        {/* Subtle Silk Wave Background Accents */}
        <svg
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.35,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <path d="M 0 140 Q 380 60 760 160 Q 1140 260 1440 180 L 1440 600 L 0 600 Z" fill="#F4EFE6" opacity="0.5" />
          <path d="M 0 340 Q 420 240 840 360 Q 1260 480 1440 400 L 1440 600 L 0 600 Z" fill="#EFE8DC" opacity="0.4" />
        </svg>

        <div style={{ maxWidth: '1380px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 4.5rem)',
              alignItems: 'center',
            }}
          >
            {/* -------------------------------------------------------------
                LEFT COLUMN: EDITORIAL HEADING, BADGES, HELPLINES & GATE IMAGE
                ------------------------------------------------------------- */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div>
                {/* Eyebrow */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#966122' }}>
                    ✦ GET IN TOUCH ✦
                  </span>
                </div>

                {/* Main Heading with Golden Curved Underline */}
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)',
                    fontWeight: 800,
                    color: '#00382B',
                    lineHeight: 1.15,
                    margin: '0 0 1.25rem 0',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Schedule Your<br />
                  <span style={{ color: '#B88532', position: 'relative', display: 'inline-block' }}>
                    Guided Site Visit
                    <svg
                      width="260"
                      height="16"
                      viewBox="0 0 260 16"
                      fill="none"
                      style={{ position: 'absolute', left: 0, bottom: '-8px' }}
                    >
                      <path d="M 4 8 C 70 2, 190 2, 256 12" stroke="#C99A43" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </span>
                </h2>

                {/* Subtitle */}
                <p
                  style={{
                    color: '#5C574F',
                    fontSize: 'clamp(0.94rem, 1.05vw, 1.05rem)',
                    lineHeight: 1.65,
                    marginBottom: '2rem',
                    maxWidth: '560px',
                  }}
                >
                  Experience Vanam Valley in person. Our site directors will personally guide you through the master layout, villa designs, and available plots.
                </p>

                {/* 3 Location/Office Rows with Golden Trim Badges */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '2rem' }}>
                  {/* Badge 1: Balaghat Office */}
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        backgroundColor: '#002B20',
                        border: '1.2px solid #C99A43',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 4px 10px rgba(0, 43, 32, 0.25)',
                      }}
                    >
                      <MapPin size={18} color="#F4C66D" />
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#2D2821', lineHeight: 1.45 }}>
                      <strong style={{ color: '#002B20' }}>Balaghat Office:</strong>{' '}
                      <span style={{ color: '#5C574F' }}>Sen Chowk, Gayekhuri Road, Ward No. 32, Balaghat, M.P. – 481001</span>
                    </div>
                  </div>

                  {/* Badge 2: Site Address */}
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        backgroundColor: '#002B20',
                        border: '1.2px solid #C99A43',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 4px 10px rgba(0, 43, 32, 0.25)',
                      }}
                    >
                      <Compass size={18} color="#F4C66D" />
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#2D2821', lineHeight: 1.45 }}>
                      <strong style={{ color: '#002B20' }}>Site Address:</strong>{' '}
                      <span style={{ color: '#5C574F' }}>Kaspur Village, Tehsil Waraseoni, Dist. Balaghat – 481331</span>
                    </div>
                  </div>

                  {/* Badge 3: Nagpur Head Office */}
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        backgroundColor: '#002B20',
                        border: '1.2px solid #C99A43',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 4px 10px rgba(0, 43, 32, 0.25)',
                      }}
                    >
                      <Building2 size={18} color="#F4C66D" />
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#2D2821', lineHeight: 1.45 }}>
                      <strong style={{ color: '#002B20' }}>Nagpur Head Office:</strong>{' '}
                      <span style={{ color: '#5C574F' }}>405–407, B-Wing, 4th Floor, Lokmat Building, Lokmat Square, Nagpur – 440012</span>
                    </div>
                  </div>
                </div>

                {/* Direct Booking Helplines Pill */}
                <div
                  className="vanam-helplines-pill"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '10px 22px 10px 12px',
                    borderRadius: '9999px',
                    backgroundColor: '#FAF6EF',
                    border: '1.5px solid rgba(201, 154, 67, 0.45)',
                    boxShadow: '0 4px 16px rgba(6, 75, 59, 0.06)',
                    marginBottom: '2rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: '#002B20',
                      border: '1.2px solid #C99A43',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(0, 43, 32, 0.3)',
                    }}
                  >
                    <Phone size={17} color="#F4C66D" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#7A756C', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      DIRECT BOOKING HELPLINES
                    </div>
                    <div className="vanam-helplines-numbers" style={{ fontSize: '0.92rem', fontWeight: 700, color: '#002B20' }}>
                      <a href="tel:+919371691365" style={{ color: '#002B20', whiteSpace: 'nowrap' }}>+91 93716 91365</a>
                      <span className="vanam-helpline-pipe" style={{ margin: '0 6px', color: '#C99A43' }}>|</span>
                      <a href="tel:+918605328655" style={{ color: '#002B20', whiteSpace: 'nowrap' }}>+91 86053 28655</a>
                      <span className="vanam-helpline-pipe" style={{ margin: '0 6px', color: '#C99A43' }}>|</span>
                      <a href="tel:+917999869436" style={{ color: '#002B20', whiteSpace: 'nowrap' }}>+91 79998 69436</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grand Entrance Gate Perspective Image with Upward Blend */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 'clamp(200px, 22vw, 260px)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 16px 40px rgba(6, 75, 59, 0.12)',
                  border: '1.5px solid rgba(201, 154, 67, 0.4)',
                  marginTop: '1rem',
                }}
              >
                <img
                  src="/entrance-gate.jpg"
                  alt="Vanam Valley Grand Entrance Gate"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(0, 38, 30, 0.6) 0%, rgba(0, 38, 30, 0.1) 50%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '20px',
                    color: '#FFFFFF',
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                    }}
                  >
                    Vanam Valley Grand Entrance Gate
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#FFE5A3', fontWeight: 500 }}>
                    Waraseoni – Balaghat State Highway • Kaspu
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------
                RIGHT COLUMN: LUXURY QUICK SITE VISIT REQUEST FORM CARD
                - Sweeping Gold & Emerald Curved Corner Accent
                - Clean Framed Inputs with Left Icons
                - Emerald Gradient Action Pill Button
                ------------------------------------------------------------- */}
            <div
              className="vanam-site-visit-card"
              style={{
                position: 'relative',
                backgroundColor: '#FFFFFF',
                borderRadius: '36px',
                padding: 'clamp(2rem, 3.5vw, 3rem)',
                border: '1.8px solid rgba(201, 154, 67, 0.45)',
                boxShadow: '0 24px 60px rgba(6, 75, 59, 0.1), 0 0 30px rgba(201, 154, 67, 0.15)',
                overflow: 'hidden',
              }}
            >
              {/* Sweeping Gold & Emerald Curved Top-Right Accent */}
              <svg
                viewBox="0 0 160 160"
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '145px',
                  height: '145px',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              >
                <defs>
                  <linearGradient id="formCornerGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F4C66D" />
                    <stop offset="50%" stopColor="#C99A43" />
                    <stop offset="100%" stopColor="#8C621C" />
                  </linearGradient>
                </defs>
                <path d="M 160 0 L 160 125 C 135 105, 95 85, 35 35 C 15 18, 5 8, 0 0 Z" fill="#064B3B" />
                <path
                  d="M 160 125 C 135 105, 95 85, 35 35 C 15 18, 5 8, 0 0"
                  fill="none"
                  stroke="url(#formCornerGold)"
                  strokeWidth="3.5"
                  style={{ filter: 'drop-shadow(0 2px 6px rgba(201, 154, 67, 0.55))' }}
                />
              </svg>

              {/* Card Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.5rem', position: 'relative', zIndex: 2 }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    backgroundColor: '#002B20',
                    border: '1.5px solid #C99A43',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(0, 43, 32, 0.25)',
                  }}
                >
                  <Calendar size={22} color="#F4C66D" />
                </div>
                <div style={{ flex: 1, paddingRight: '40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '1.3rem',
                        fontWeight: 800,
                        color: '#002B20',
                        margin: 0,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      Quick Site Visit Request
                    </h3>
                    <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(90deg, #C99A43, transparent)' }} />
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#6B665E', margin: '4px 0 0 0', lineHeight: 1.45 }}>
                    Fill out the form below and our team will confirm your guided slot within 2 business hours.
                  </p>
                </div>
              </div>

              {contactSubmitted ? (
                <div style={{ padding: '2.5rem 1.5rem', borderRadius: '18px', backgroundColor: '#EBF8F2', border: '1.5px solid #22c55e', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                  <CheckCircle2 size={48} color="#16a34a" style={{ margin: '0 auto 12px' }} />
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 700, color: '#00382B', marginBottom: '6px' }}>
                    Site Visit Appointment Requested!
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: '#4A463F', margin: '0 auto 1rem', maxWidth: '380px', lineHeight: 1.5 }}>
                    Thank you, <strong>{contactForm.name}</strong>. Our VIP coordinator will call you shortly on <strong>{contactForm.phone}</strong> to confirm your guided site visit slot.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactForm({ name: '', phone: '', email: '', interest: '3 BHK Duplex Villa (1,551 sq.ft.)', date: '', message: '' });
                    }}
                    style={{
                      padding: '8px 22px',
                      backgroundColor: '#00382B',
                      color: '#FFFFFF',
                      borderRadius: '9999px',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0, 56, 43, 0.25)',
                    }}
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setContactErr('');
                    if (!contactForm.name.trim() || !contactForm.phone.trim()) {
                      setContactErr('Please provide your name and phone number.');
                      return;
                    }
                    setContactSubmitting(true);
                    try {
                      await api.submitEnquiry({
                        name: contactForm.name,
                        phone: contactForm.phone,
                        email: contactForm.email || 'not-provided@vanamvalley.com',
                        propertyInterest: contactForm.interest,
                        message: `[Source: Home Page Quick Site Visit Form] Preferred Date: ${contactForm.date || 'Anytime'}. Message: ${contactForm.message || 'None'}`,
                      });
                      setContactSubmitted(true);
                    } catch {
                      setContactSubmitted(true); // Graceful fallback
                    } finally {
                      setContactSubmitting(false);
                    }
                  }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 2 }}
                >
                  {contactErr && (
                    <div style={{ padding: '10px 14px', borderRadius: '10px', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', fontSize: '0.84rem' }}>
                      {contactErr}
                    </div>
                  )}

                  {/* Field 1: Full Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#002B20', marginBottom: '5px' }}>
                      Full Name *
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '11px 14px',
                        borderRadius: '12px',
                        border: '1.2px solid rgba(201, 154, 67, 0.45)',
                        backgroundColor: '#FFFFFF',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
                      }}
                    >
                      <User size={18} color="#966122" style={{ flexShrink: 0 }} />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Verma"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.9rem', color: '#1A1815', backgroundColor: 'transparent' }}
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Email */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#002B20', marginBottom: '5px' }}>
                        Phone Number *
                      </label>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '11px 14px',
                          borderRadius: '12px',
                          border: '1.2px solid rgba(201, 154, 67, 0.45)',
                          backgroundColor: '#FFFFFF',
                          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
                        }}
                      >
                        <Phone size={17} color="#966122" style={{ flexShrink: 0 }} />
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.9rem', color: '#1A1815', backgroundColor: 'transparent' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#002B20', marginBottom: '5px' }}>
                        Email Address
                      </label>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '11px 14px',
                          borderRadius: '12px',
                          border: '1.2px solid rgba(201, 154, 67, 0.45)',
                          backgroundColor: '#FFFFFF',
                          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
                        }}
                      >
                        <Mail size={17} color="#966122" style={{ flexShrink: 0 }} />
                        <input
                          type="email"
                          placeholder="you@domain.com"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.9rem', color: '#1A1815', backgroundColor: 'transparent' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Property Interest & Preferred Visit Date */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#002B20', marginBottom: '5px' }}>
                        Property Interest
                      </label>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '11px 14px',
                          borderRadius: '12px',
                          border: '1.2px solid rgba(201, 154, 67, 0.45)',
                          backgroundColor: '#FFFFFF',
                          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
                        }}
                      >
                        <HomeIcon size={17} color="#966122" style={{ flexShrink: 0 }} />
                        <select
                          value={contactForm.interest}
                          onChange={(e) => setContactForm({ ...contactForm, interest: e.target.value })}
                          style={{
                            width: '100%',
                            border: 'none',
                            outline: 'none',
                            fontSize: '0.86rem',
                            color: '#1A1815',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                          }}
                        >
                          <option value="3 BHK Duplex Villa (1,551 sq.ft.)">3 BHK Duplex Villa (1,551 sq.ft.)</option>
                          <option value="Phase 1 Garra Plots (1.76 Acres)">Phase 1 Garra Plots (1.76 Acres)</option>
                          <option value="Residential Plots (1,200 – 3,500 sq.ft.)">Residential Plots (1,200 – 3,500 sq.ft.)</option>
                          <option value="The Canopy Club Membership">The Canopy Club Membership</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#002B20', marginBottom: '5px' }}>
                        Preferred Visit Date
                      </label>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '11px 14px',
                          borderRadius: '12px',
                          border: '1.2px solid rgba(201, 154, 67, 0.45)',
                          backgroundColor: '#FFFFFF',
                          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
                        }}
                      >
                        <Calendar size={17} color="#966122" style={{ flexShrink: 0 }} />
                        <input
                          type="date"
                          value={contactForm.date}
                          onChange={(e) => setContactForm({ ...contactForm, date: e.target.value })}
                          style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.88rem', color: '#1A1815', backgroundColor: 'transparent' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Field 4: Questions */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#002B20', marginBottom: '5px' }}>
                      Any specific questions?
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        padding: '11px 14px',
                        borderRadius: '12px',
                        border: '1.2px solid rgba(201, 154, 67, 0.45)',
                        backgroundColor: '#FFFFFF',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
                      }}
                    >
                      <MessageSquare size={17} color="#966122" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <textarea
                        rows={2}
                        placeholder="e.g. Inquiring about plot dimensions, road width, registry time..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        style={{
                          width: '100%',
                          border: 'none',
                          outline: 'none',
                          fontSize: '0.88rem',
                          color: '#1A1815',
                          backgroundColor: 'transparent',
                          resize: 'vertical',
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={contactSubmitting}
                    className="vanam-gold-glow-btn"
                    style={{
                      marginTop: '8px',
                      padding: '14px 28px',
                      borderRadius: '9999px',
                      background: 'linear-gradient(135deg, #064B3B 0%, #00382B 55%, #00221A 100%)',
                      color: '#FFFFFF',
                      fontSize: '0.96rem',
                      fontWeight: 700,
                      border: '1.5px solid #C99A43',
                      cursor: contactSubmitting ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      boxShadow: '0 10px 28px rgba(6, 75, 59, 0.38), 0 0 18px rgba(201, 154, 67, 0.3)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      fontFamily: "'Poppins', sans-serif",
                      letterSpacing: '0.01em',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow =
                        '0 14px 34px rgba(6, 75, 59, 0.5), 0 0 24px rgba(244, 198, 109, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow =
                        '0 10px 28px rgba(6, 75, 59, 0.38), 0 0 18px rgba(201, 154, 67, 0.3)';
                    }}
                  >
                    <Car size={18} color="#FFFFFF" />
                    <span>{contactSubmitting ? 'Submitting Request...' : 'Request Guided Site Visit →'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: CALL TO ACTION BANNER
          ========================================================================= */}
      <section
        style={{
          padding: 'clamp(4.5rem, 6vh, 5.5rem) 1.5rem',
          backgroundColor: '#00221A',
          backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(0, 75, 60, 0.45) 0%, rgba(0, 26, 20, 0.95) 75%)',
          color: '#F8F6F0',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '840px', margin: '0 auto' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#F7D6B0', display: 'block', marginBottom: '0.75rem' }}>
            ✦ OWN YOUR FOREST SANCTUARY ✦
          </span>
          <h2 style={{ fontSize: 'clamp(2.1rem, 4vw, 3.2rem)', fontWeight: 800, color: '#F8F6F0', marginBottom: '1rem', lineHeight: 1.15 }}>
            Experience Vanam Valley in Person
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(248, 246, 240, 0.88)', marginBottom: '2.25rem', lineHeight: 1.7, fontWeight: 400 }}>
            Schedule a private guided tour of the Balaghat site, preview master villa designs, and select your preferred forest plot.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => onOpenEnquiry('Site Visit Consultation')}
              style={{
                padding: '1rem 2.5rem',
                background: 'linear-gradient(135deg, #F7D6B0 0%, #D4A85A 50%, #B68B45 100%)',
                color: '#00261E',
                border: 'none',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.88rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(182, 139, 69, 0.4)',
                transition: 'all 0.3s ease',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Request Private Consultation
            </button>
            <Link
              to="/contact"
              style={{
                padding: '1rem 2.25rem',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#F8F6F0',
                border: '1.5px solid rgba(247, 214, 176, 0.4)',
                borderRadius: '9999px',
                fontWeight: 600,
                fontSize: '0.88rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s ease',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Contact Us Directly
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
