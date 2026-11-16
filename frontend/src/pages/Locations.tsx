import React, { useState } from 'react';
import {
  MapPin,
  Play,
  Trees,
  Wind,
  Car,
  Calendar,
  X,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface LocationsProps {
  onOpenEnquiry: (interest?: string) => void;
}

interface ExcursionDetail {
  id: string;
  title: string;
  location: string;
  desc: string;
  fullDesc: string;
  distance: string;
  travelTime: string;
  bestTime: string;
  keyHighlights: string[];
  img: string;
}

const EXCURSIONS: ExcursionDetail[] = [
  {
    id: 'gangrel',
    title: 'Gangrel Waterfall',
    location: 'BALAGHAT DISTRICT',
    desc: 'A scenic water cascade surrounded by forest boulders and perennial streams.',
    fullDesc:
      'Gangrel Waterfall is a pristine natural gem tucked inside the Balaghat woodlands. Surrounded by ancient boulders and perennial watercourses, it is a beloved escape for contemplative nature walks, landscape photography, and serene weekend family picnics.',
    distance: '18 Km from Vanam Valley',
    travelTime: '25 Mins via NH-543',
    bestTime: 'July – February (Peak Post-Monsoon Flow)',
    keyHighlights: ['Freshwater natural cascade', 'Safe shallow wading pools', 'Indigenous flora and birdwatching trails'],
    img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sonewani',
    title: 'Sonewani Wildlife Sanctuary',
    location: 'BALAGHAT FLORA & FAUNA BELT',
    desc: 'A protected forest ecosystem fostering indigenous deer, leopards, and diverse tree canopies.',
    fullDesc:
      'Part of the contiguous Satpura-Maikal ecological corridor, Sonewani Wildlife Sanctuary harbors vibrant populations of spotted deer, Indian leopards, wild boars, and rare resident bird species amidst mature sal and teak forests.',
    distance: '24 Km from Vanam Valley',
    travelTime: '35 Mins via State Highway',
    bestTime: 'October – May (Optimal Wildlife Sightings)',
    keyHighlights: ['Guided safari tracks', 'Ancient stone forest watchtowers', 'Zero commercial pollution zone'],
    img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pench',
    title: 'Pench National Park',
    location: 'KIPLING COUNTRY TIGER RESERVE',
    desc: "One of central India's premier national parks, immortalized in Rudyard Kipling's Jungle Book.",
    fullDesc:
      "Pench National Park spans the southern slopes of the Satpura ranges along the Madhya Pradesh-Maharashtra border. Globally immortalized by Rudyard Kipling's Jungle Book, it boasts one of India's healthiest Royal Bengal tiger populations alongside leopards, dholes, and over 285 bird species.",
    distance: '65 Km from Vanam Valley',
    travelTime: '1 Hr 15 Mins via Balaghat-Seoni Highway',
    bestTime: 'October – June (Core zones open)',
    keyHighlights: ['Mowgli & Bagheera homeland', 'High Royal Bengal tiger density', 'Spectacular Pench River safari drives'],
    img: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'kanha',
    title: 'Kanha National Park',
    location: "ASIA'S RENOWNED WILDLIFE HAVEN",
    desc: 'Famed for its sprawling sal and bamboo forests and rich wildlife, including the Barasingha.',
    fullDesc:
      'Kanha Tiger Reserve is globally celebrated for its lush rolling sal meadows, crystal-clear streams, and pioneering conservation that brought the rare Hardground Barasingha (swamp deer) back from the brink of extinction.',
    distance: '85 Km from Vanam Valley',
    travelTime: '1 Hr 45 Mins via State Highway',
    bestTime: 'October – Mid June',
    keyHighlights: ['Hardground Barasingha conservation sanctuary', 'Pristine Mukki & Kisli safari gates', 'Iconic Kipling grasslands'],
    img: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80',
  },
];

export const Locations: React.FC<LocationsProps> = ({ onOpenEnquiry }) => {
  const [selectedExcursion, setSelectedExcursion] = useState<ExcursionDetail | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Lock background scroll when any modal is open
  React.useEffect(() => {
    if (selectedExcursion || isVideoModalOpen) {
      const origBodyOverflow = document.body.style.overflow;
      const origHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = origBodyOverflow || '';
        document.documentElement.style.overflow = origHtmlOverflow || '';
      };
    }
  }, [selectedExcursion, isVideoModalOpen]);

  const scrollToAttractions = () => {
    const el = document.getElementById('excursions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F2', fontFamily: "'Poppins', sans-serif" }}>
      {/* =========================================================================
          HERO BANNER: THE FOREST LIVING SETTING — BALAGHAT, MADHYA PRADESH
          Exact Match to Reference Design (media_1794830322945_1b819d35.jpg)
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '580px',
          backgroundColor: '#00261E',
          backgroundImage: "url('/connectivity_highway_pristine.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: 'clamp(4.5rem, 8vh, 6.5rem) 1.5rem 5rem',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
        className="locations-hero-section"
      >
        {/* Cinematic Sunset Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0, 38, 30, 0.78) 0%, rgba(0, 24, 18, 0.62) 50%, rgba(0, 18, 14, 0.9) 100%)',
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
            background: 'radial-gradient(ellipse at center, rgba(244, 198, 109, 0.22) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '880px', margin: '0 auto' }}>
          {/* Top Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '1rem',
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
              THE FOREST LIVING SETTING
            </span>
            <div style={{ width: '40px', height: '1.5px', backgroundColor: '#C99A43', opacity: 0.85 }} />
          </div>

          {/* Editorial Headline */}
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.6rem, 5.2vw, 4.4rem)',
              lineHeight: 1.1,
              fontWeight: 800,
              color: '#FFFFFF',
              margin: '0 0 1.25rem 0',
              letterSpacing: '-0.02em',
              textShadow: '0 4px 20px rgba(0,0,0,0.7)',
            }}
          >
            Balaghat,<br />
            <span
              style={{
                fontStyle: 'italic',
                fontWeight: 600,
                color: '#F7D6B0',
              }}
            >
              Madhya Pradesh
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.15vw, 1.1rem)',
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.92)',
              maxWidth: '720px',
              margin: '0 auto 2.25rem',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            An enchanting forest district in central India, blessed with abundant evergreen woodlands, pristine waterfalls, and immediate proximity to world-renowned tiger sanctuaries.
          </p>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            {/* Primary Gold Pill Button */}
            <button
              type="button"
              onClick={scrollToAttractions}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '13px 28px',
                background: 'linear-gradient(135deg, #FFE7CE 0%, #F7D6B0 45%, #E2B27B 100%)',
                color: '#00261E',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.92rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 28px rgba(247, 214, 176, 0.45)',
                transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
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
              <MapPin size={17} color="#00261E" />
              <span>Explore Nearby Attractions</span>
            </button>

            {/* Secondary Outline Pill Button */}
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 26px',
                backgroundColor: 'rgba(0, 36, 28, 0.65)',
                color: '#FFFFFF',
                borderRadius: '9999px',
                fontWeight: 600,
                fontSize: '0.92rem',
                border: '1.5px solid rgba(247, 214, 176, 0.55)',
                cursor: 'pointer',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: '0 8px 22px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(212, 168, 90, 0.2)';
                e.currentTarget.style.borderColor = '#FFE5C2';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 36, 28, 0.65)';
                e.currentTarget.style.borderColor = 'rgba(247, 214, 176, 0.55)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: '#D4A85A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Play size={10} fill="#00261E" color="#00261E" style={{ marginLeft: '1px' }} />
              </div>
              <span>Watch Location Video</span>
            </button>
          </div>
        </div>

        {/* Sweeping Golden Wave Separator at Bottom */}
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
          SECTION 2: STRATEGIC SETTING — NATURE'S OWN SANCTUARY
          Exact Match to Reference Design (media_1794830322945_1b819d35.jpg)
          ========================================================================= */}
      <section style={{ padding: 'clamp(3.5rem, 6vh, 5.5rem) clamp(1.2rem, 3.5vw, 3.5rem)', backgroundColor: '#FAF7F2' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Split 2-Column Overview */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
              alignItems: 'start',
              marginBottom: '3.5rem',
            }}
          >
            {/* Left Column: Heading with Leaf Icon & Underline */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem' }}>
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#966122',
                  }}
                >
                  STRATEGIC SETTING
                </span>
                <div style={{ width: '32px', height: '1.5px', backgroundColor: '#C99A43' }} />
              </div>

              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
                  fontWeight: 800,
                  color: '#00382B',
                  lineHeight: 1.15,
                  margin: '0 0 1rem 0',
                  letterSpacing: '-0.02em',
                }}
              >
                Nature’s Own<br />
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                  Sanctuary
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="#34D399" stroke="#00382B" strokeWidth="1.5">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                  </svg>
                </span>
              </h2>

              <div style={{ width: '70px', height: '3px', backgroundColor: '#C99A43', borderRadius: '2px', marginBottom: '1.25rem' }} />

              <p
                style={{
                  color: '#002B20',
                  fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                  fontWeight: 600,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Where unspoiled biodiversity and peaceful seclusion coexist with accessible state connectivity.
              </p>
            </div>

            {/* Right Column: Editorial Paragraphs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p
                style={{
                  color: '#4A463F',
                  fontSize: 'clamp(0.94rem, 1.05vw, 1.02rem)',
                  lineHeight: 1.78,
                  margin: 0,
                }}
              >
                Balaghat district in south-eastern Madhya Pradesh is celebrated for its lush forested hills and rich mineral geology. Vanam Valley is specifically positioned within this verdant expanse, offering an escape from metropolitan pollution, noise, and congestion.
              </p>
              <p
                style={{
                  color: '#4A463F',
                  fontSize: 'clamp(0.94rem, 1.05vw, 1.02rem)',
                  lineHeight: 1.78,
                  margin: 0,
                }}
              >
                Whether as a primary wellness sanctuary or an executive weekend home, your residence is anchored amidst some of India’s most celebrated natural ecologies.
              </p>
            </div>
          </div>

          {/* 4 Floating Gold/Ivory Pill Badges Container */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1.5px solid rgba(201, 154, 67, 0.45)',
              padding: 'clamp(1.25rem, 2vw, 1.75rem) clamp(1.5rem, 2.5vw, 2.5rem)',
              boxShadow: '0 12px 36px rgba(6, 75, 59, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
              alignItems: 'center',
            }}
          >
            {/* Badge 1: Forest Sanctuary */}
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
                  flexShrink: 0,
                  boxShadow: '0 4px 10px rgba(201, 154, 67, 0.25)',
                }}
              >
                <Trees size={22} color="#00382B" />
              </div>
              <div>
                <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#002B20', lineHeight: 1.25 }}>
                  Forest Sanctuary
                </div>
                <div style={{ fontSize: '0.78rem', color: '#7A756C', marginTop: '2px' }}>
                  Mature indigenous tree cover
                </div>
              </div>
            </div>

            {/* Badge 2: Clear Air Index */}
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
                  flexShrink: 0,
                  boxShadow: '0 4px 10px rgba(201, 154, 67, 0.25)',
                }}
              >
                <Wind size={22} color="#00382B" />
              </div>
              <div>
                <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#002B20', lineHeight: 1.25 }}>
                  Clear Air Index
                </div>
                <div style={{ fontSize: '0.78rem', color: '#7A756C', marginTop: '2px' }}>
                  Pure mountain woodland oxygen
                </div>
              </div>
            </div>

            {/* Badge 3: Tiger Corridor */}
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
                  flexShrink: 0,
                  boxShadow: '0 4px 10px rgba(201, 154, 67, 0.25)',
                }}
              >
                <Sparkles size={22} color="#00382B" />
              </div>
              <div>
                <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#002B20', lineHeight: 1.25 }}>
                  Tiger Corridor
                </div>
                <div style={{ fontSize: '0.78rem', color: '#7A756C', marginTop: '2px' }}>
                  Bordering Pench &amp; Kanha belt
                </div>
              </div>
            </div>

            {/* Badge 4: Road Network */}
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
                  flexShrink: 0,
                  boxShadow: '0 4px 10px rgba(201, 154, 67, 0.25)',
                }}
              >
                <Car size={22} color="#00382B" />
              </div>
              <div>
                <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#002B20', lineHeight: 1.25 }}>
                  Road Network
                </div>
                <div style={{ fontSize: '0.78rem', color: '#7A756C', marginTop: '2px' }}>
                  All-weather highway access
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: SURROUNDED BY NATURAL WONDERS (VERIFIED REGIONAL EXCURSIONS)
          4 Arched Cards Grid with Explore Actions (Matching Image 2)
          ========================================================================= */}
      <section
        id="excursions"
        style={{
          padding: 'clamp(4rem, 7vh, 6rem) clamp(1.2rem, 3.5vw, 3.5rem)',
          backgroundColor: '#FFFFFF',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '0.6rem' }}>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#966122',
                }}
              >
                VERIFIED REGIONAL EXCURSIONS
              </span>
              <div style={{ width: '32px', height: '1.5px', backgroundColor: '#C99A43' }} />
            </div>

            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)',
                fontWeight: 800,
                color: '#00382B',
                lineHeight: 1.15,
                margin: '0 0 0.75rem 0',
                letterSpacing: '-0.02em',
              }}
            >
              Surrounded by Natural Wonders
            </h2>

            <p style={{ color: '#5C574F', fontSize: '1.02rem', maxWidth: '640px', margin: '0 auto' }}>
              Iconic destinations highlighted in the official Vanam Valley brochure.
            </p>
          </div>

          {/* 4 Arched Natural Wonders Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(1.5rem, 2.5vw, 2.2rem)',
            }}
          >
            {EXCURSIONS.map((spot) => (
              <div
                key={spot.id}
                style={{
                  backgroundColor: '#FAF7F2',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1.5px solid rgba(201, 154, 67, 0.4)',
                  boxShadow: '0 10px 30px rgba(6, 75, 59, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow =
                    '0 20px 45px rgba(6, 75, 59, 0.16), 0 0 20px rgba(201, 154, 67, 0.3)';
                  e.currentTarget.style.borderColor = '#C99A43';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(6, 75, 59, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(201, 154, 67, 0.4)';
                }}
                onClick={() => setSelectedExcursion(spot)}
              >
                {/* Image Arch Container */}
                <div
                  style={{
                    position: 'relative',
                    height: '220px',
                    width: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={spot.img}
                    alt={spot.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0, 38, 30, 0.4) 0%, transparent 60%)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    {/* Location Badge */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#966122',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <MapPin size={12} color="#966122" />
                      <span>{spot.location}</span>
                    </div>

                    {/* Destination Title */}
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '1.4rem',
                        fontWeight: 800,
                        color: '#002B20',
                        margin: '0 0 0.65rem 0',
                        lineHeight: 1.25,
                      }}
                    >
                      {spot.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        color: '#5C574F',
                        fontSize: '0.86rem',
                        lineHeight: 1.55,
                        margin: '0 0 1.25rem 0',
                      }}
                    >
                      {spot.desc}
                    </p>
                  </div>

                  {/* Explore Pill Button */}
                  <div style={{ paddingTop: '0.5rem' }}>
                    <button
                      type="button"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 16px',
                        borderRadius: '9999px',
                        backgroundColor: '#FFFFFF',
                        border: '1.2px solid #C99A43',
                        color: '#00382B',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span>Explore</span>
                      <span style={{ fontSize: '0.95rem', color: '#966122' }}>→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: PLANNING A VISIT TO BALAGHAT? (BOTTOM CTA BANNER)
          Matching Image 2 Reference
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(4.5rem, 8vh, 6rem) clamp(1.2rem, 3.5vw, 3.5rem)',
          backgroundColor: '#FAF7F2',
          backgroundImage: "radial-gradient(ellipse at 50% 90%, rgba(201, 154, 67, 0.12) 0%, transparent 70%)",
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Circular Calendar Badge */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#FFE6BD',
              border: '2px solid #C99A43',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 8px 24px rgba(201, 154, 67, 0.35)',
            }}
          >
            <Calendar size={28} color="#00382B" />
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              color: '#00382B',
              margin: '0 0 1rem 0',
              lineHeight: 1.2,
            }}
          >
            Planning a Visit to Balaghat?
          </h2>

          <p
            style={{
              color: '#5C574F',
              fontSize: 'clamp(0.96rem, 1.1vw, 1.05rem)',
              lineHeight: 1.7,
              margin: '0 auto 2.25rem',
              maxWidth: '680px',
            }}
          >
            We provide pre-arranged site visit assistance, chauffeur pick-up arrangements, and personalized master plan tours for prospective forest villa buyers.
          </p>

          <button
            type="button"
            onClick={() => onOpenEnquiry('Balaghat Site Visit Inquiry')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 34px',
              background: 'linear-gradient(135deg, #004B3C 0%, #00261E 100%)',
              color: '#FFFFFF',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.94rem',
              border: '1.5px solid #C99A43',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0, 56, 43, 0.35), 0 0 18px rgba(201, 154, 67, 0.3)',
              transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow =
                '0 14px 36px rgba(0, 56, 43, 0.45), 0 0 24px rgba(201, 154, 67, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow =
                '0 10px 30px rgba(0, 56, 43, 0.35), 0 0 18px rgba(201, 154, 67, 0.3)';
            }}
          >
            <Car size={18} color="#F4C66D" />
            <span>Book Guided Site Visit</span>
            <span style={{ fontSize: '1.1rem', color: '#F4C66D', lineHeight: 1 }}>→</span>
          </button>
        </div>

        {/* Bottom Silhouette Contour Curve */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '35px',
            pointerEvents: 'none',
          }}
        >
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M 0,25 Q 360,5 720,25 Q 1080,45 1440,25 L 1440,40 L 0,40 Z" fill="#FFFFFF" />
            <path d="M 0,25 Q 360,5 720,25 Q 1080,45 1440,25" fill="none" stroke="#C99A43" strokeWidth="2" opacity="0.6" />
          </svg>
        </div>
      </section>

      {/* =========================================================================
          EXCURSION DETAILS MODAL
          ========================================================================= */}
      {selectedExcursion && (
        <div
          className="vanam-modal-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2100,
            backgroundColor: 'rgba(0, 24, 18, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
            overscrollBehavior: 'contain',
            overflowY: 'auto',
          }}
          onClick={() => setSelectedExcursion(null)}
        >
          <div
            className="vanam-modal-card"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '680px',
              maxHeight: 'min(90vh, 780px)',
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '2px solid #C99A43',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 30px rgba(201, 154, 67, 0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div style={{ position: 'relative', height: '240px', width: '100%' }}>
              <img
                src={selectedExcursion.img}
                alt={selectedExcursion.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0, 38, 30, 0.85) 0%, transparent 60%)',
                }}
              />
              <button
                type="button"
                onClick={() => setSelectedExcursion(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 24, 18, 0.75)',
                  border: '1px solid rgba(247, 214, 176, 0.5)',
                  color: '#F7D6B0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                <X size={18} />
              </button>
              <div style={{ position: 'absolute', bottom: '16px', left: '20px', right: '20px', color: '#FFFFFF' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.1em', color: '#F7D6B0', textTransform: 'uppercase' }}>
                  {selectedExcursion.location}
                </span>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.65rem', fontWeight: 700, margin: '2px 0 0' }}>
                  {selectedExcursion.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p style={{ color: '#4A463F', fontSize: '0.94rem', lineHeight: 1.65, margin: 0 }}>
                {selectedExcursion.fullDesc}
              </p>

              {/* Distance & Travel Time Badges */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ padding: '10px 14px', borderRadius: '12px', backgroundColor: '#FAF7F2', border: '1px solid rgba(201, 154, 67, 0.3)' }}>
                  <div style={{ fontSize: '0.72rem', color: '#7A756C', fontWeight: 600, textTransform: 'uppercase' }}>Proximity</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#002B20', marginTop: '2px' }}>{selectedExcursion.distance}</div>
                </div>
                <div style={{ padding: '10px 14px', borderRadius: '12px', backgroundColor: '#FAF7F2', border: '1px solid rgba(201, 154, 67, 0.3)' }}>
                  <div style={{ fontSize: '0.72rem', color: '#7A756C', fontWeight: 600, textTransform: 'uppercase' }}>Drive Time</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#002B20', marginTop: '2px' }}>{selectedExcursion.travelTime}</div>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#002B20', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Brochure Highlights
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {selectedExcursion.keyHighlights.map((hl, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: '#5C574F' }}>
                      <CheckCircle2 size={15} color="#004B3C" style={{ flexShrink: 0 }} />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Action */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedExcursion(null);
                    onOpenEnquiry(`Visit & Tour: ${selectedExcursion.title}`);
                  }}
                  style={{
                    flex: 1,
                    padding: '12px 20px',
                    borderRadius: '9999px',
                    backgroundColor: '#00382B',
                    color: '#FFFFFF',
                    border: '1px solid #C99A43',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 6px 18px rgba(0, 56, 43, 0.3)',
                  }}
                >
                  Plan Day Trip During Site Visit →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          WATCH LOCATION VIDEO MODAL
          ========================================================================= */}
      {isVideoModalOpen && (
        <div
          className="vanam-modal-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2100,
            backgroundColor: 'rgba(0, 24, 18, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
            overscrollBehavior: 'contain',
            overflowY: 'auto',
          }}
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="vanam-modal-card"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '850px',
              maxHeight: 'min(90vh, 780px)',
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              backgroundColor: '#00261E',
              borderRadius: '24px',
              border: '2px solid #C99A43',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.75rem',
                borderBottom: '1px solid rgba(247, 214, 176, 0.25)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Trees size={20} color="#F7D6B0" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                  Balaghat Natural Sanctuaries &amp; Vanam Valley Setting
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
                <X size={22} />
              </button>
            </div>

            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '380px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: '1.5rem',
                }}
              >
                <img
                  src="/connectivity_highway_pristine.jpg"
                  alt="Balaghat Nature Sanctuary"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 38, 30, 0.45)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                  }}
                >
                  <div
                    style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '50%',
                      backgroundColor: '#C99A43',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 30px rgba(201, 154, 67, 0.8)',
                    }}
                  >
                    <Play size={28} fill="#00261E" color="#00261E" style={{ marginLeft: '4px' }} />
                  </div>
                  <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.05rem', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                    Cinematic 4K Location Tour Coming Soon
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsVideoModalOpen(false);
                  onOpenEnquiry('Balaghat Location Video Query');
                }}
                style={{
                  padding: '12px 28px',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #FFE7CE 0%, #F7D6B0 100%)',
                  color: '#00261E',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Request Private Guided Tour Schedule →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
