import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: 'villas' | 'architecture' | 'interiors' | 'landscapes' | 'amenities' | 'lifestyle';
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    title: 'The Signature Banyan Villa',
    category: 'villas',
    caption: 'Modern exterior stone and timber finishes nestled in virgin forest.',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    title: 'Double-Height Living Pavilion',
    category: 'interiors',
    caption: 'Floor-to-ceiling glass apertures welcoming natural sunlight and foliage views.',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    title: 'Teak Courtyard Villa',
    category: 'architecture',
    caption: 'Low-profile modernist pavilions with floating cantilevered timber roofs.',
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80',
    title: 'Balaghat Forest Canopy',
    category: 'landscapes',
    caption: 'Tranquil seasonal waterways and evergreen woodland trails.',
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
    title: 'Canopy Infinity Pool',
    category: 'amenities',
    caption: 'Resort-style aquatic sanctuary surrounded by private woodland hills.',
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    title: 'Executive Mini Golf Green',
    category: 'amenities',
    caption: 'Manicured putting green designed for weekend leisure.',
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    title: 'Master Forest Bedroom',
    category: 'interiors',
    caption: 'Minimalist retreat with natural oak wood tones and private sundeck.',
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    title: 'Wildlife Sanctuary Trails',
    category: 'lifestyle',
    caption: 'Morning pedestrian walks connecting community groves and sanctuaries.',
  },
  {
    id: '9',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    title: 'Ayurvedic Spa & Wellness',
    category: 'amenities',
    caption: 'Open-air yoga and meditation spaces promoting holistic rejuvenation.',
  },
];

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div style={{ paddingTop: '90px', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      {/* Header Banner */}
      <section
        style={{
          backgroundColor: '#003329',
          color: '#F8F6F0',
          padding: '4.5rem 1.5rem 3.5rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#F7D6B0',
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            Visual Portfolio
          </span>
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              color: '#F8F6F0',
              margin: '0 0 1rem',
            }}
          >
            Architectural & Forest Gallery
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(248, 246, 240, 0.85)', margin: 0 }}>
            Witness the craftsmanship, natural landscapes, and holistic spaces across Vanam Valley.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section
        style={{
          backgroundColor: '#F8F6F0',
          borderBottom: '1px solid #E8E5DE',
          padding: '1rem 1.5rem',
          position: 'sticky',
          top: '74px',
          zIndex: 80,
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { label: 'All Showcase', val: 'all' },
            { label: 'Villas', val: 'villas' },
            { label: 'Architecture', val: 'architecture' },
            { label: 'Interiors', val: 'interiors' },
            { label: 'Landscapes', val: 'landscapes' },
            { label: 'Amenities', val: 'amenities' },
            { label: 'Lifestyle', val: 'lifestyle' },
          ].map((cat) => (
            <button
              key={cat.val}
              type="button"
              onClick={() => setActiveCategory(cat.val)}
              style={{
                padding: '7px 18px',
                borderRadius: '9999px',
                fontSize: '0.84rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeCategory === cat.val ? '#004B3C' : '#FFFFFF',
                color: activeCategory === cat.val ? '#F8F6F0' : '#5C574F',
                boxShadow: activeCategory === cat.val ? '0 2px 8px rgba(0,75,60,0.2)' : '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'all 0.2s',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '4rem 1.5rem 6rem' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                style={{
                  position: 'relative',
                  height: '280px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                  backgroundColor: '#F5F3EF',
                }}
                className="gallery-card"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                  className="gallery-img"
                />

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0, 51, 41, 0.85) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.25rem',
                    color: '#F8F6F0',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      textTransform: 'uppercase',
                      color: '#F7D6B0',
                      letterSpacing: '0.08em',
                      fontWeight: 600,
                    }}
                  >
                    {item.category}
                  </span>
                  <h4
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '1.35rem',
                      color: '#F8F6F0',
                      margin: '2px 0 0',
                    }}
                  >
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {currentLightboxItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 30, 24, 0.95)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxIndex(null);
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'none',
              border: 'none',
              color: '#F8F6F0',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <X size={32} />
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '1.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F8F6F0',
              cursor: 'pointer',
            }}
          >
            <ChevronLeft size={28} />
          </button>

          {/* Image & Caption */}
          <div style={{ maxWidth: '960px', width: '100%', textAlign: 'center' }}>
            <img
              loading="lazy"
              decoding="async"
              src={currentLightboxItem.url}
              alt={currentLightboxItem.title}
              style={{
                maxHeight: '75vh',
                maxWidth: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
                margin: '0 auto',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              }}
            />
            <div style={{ marginTop: '1.25rem', color: '#F8F6F0' }}>
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.75rem',
                  color: '#F7D6B0',
                  margin: 0,
                }}
              >
                {currentLightboxItem.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(248, 246, 240, 0.8)', margin: '4px 0 0' }}>
                {currentLightboxItem.caption}
              </p>
            </div>
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '1.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F8F6F0',
              cursor: 'pointer',
            }}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}

      <style>{`
        .gallery-card:hover .gallery-img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};
