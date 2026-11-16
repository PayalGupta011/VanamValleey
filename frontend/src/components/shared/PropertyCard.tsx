import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Maximize2, Home, ArrowRight, Phone, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Property } from '../../types';

interface PropertyCardProps {
  property: Property;
  onEnquire?: (propertyTitle: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onEnquire }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const images = property.images && property.images.length > 0
    ? property.images
    : [{ url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', isPrimary: true }];

  const currentImg = images[activeImgIdx]?.url || images[0]?.url;
  const isVilla = property.propertyType === 'villa';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        overflow: 'hidden',
        border: isHovered ? '1.5px solid #D4A85A' : '1.5px solid #EAE3D7',
        boxShadow: isHovered
          ? '0 20px 45px rgba(0, 48, 38, 0.18), 0 0 0 1px rgba(212, 168, 90, 0.35)'
          : '0 8px 24px rgba(0, 38, 30, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: 'clamp(360px, 48vh, 430px)',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        boxSizing: 'border-box',
        fontFamily: "'Poppins', sans-serif",
      }}
      className="property-card"
    >
      {/* =======================================================================
          TOP IMAGE ZONE (52% HEIGHT) — PHOTO CAROUSEL, GLASS BADGES, PRICE
          ======================================================================= */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '52%',
          minHeight: '180px',
          overflow: 'hidden',
          backgroundColor: '#F3EFE9',
        }}
      >
        <img
          src={currentImg}
          alt={property.title}
          loading="lazy"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="property-img"
        />

        {/* Cinematic Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0, 24, 18, 0.45) 0%, transparent 35%, transparent 60%, rgba(0, 24, 18, 0.8) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Top-Left Badges */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            zIndex: 3,
          }}
        >
          {/* Type Badge */}
          <span
            style={{
              padding: '4px 12px',
              backgroundColor: 'rgba(0, 42, 32, 0.88)',
              color: '#FFFFFF',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              borderRadius: '9999px',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
            }}
          >
            {isVilla ? '3 BHK Villa' : 'Residential Plot'}
          </span>

          {/* Signature Featured Badge */}
          {property.featured && (
            <span
              style={{
                padding: '4px 11px',
                background: 'linear-gradient(135deg, #FBE8D3 0%, #F7D6B0 100%)',
                color: '#00281F',
                fontSize: '0.7rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                borderRadius: '9999px',
                boxShadow: '0 4px 12px rgba(247, 214, 176, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
              }}
            >
              ✦ Signature
            </span>
          )}
        </div>

        {/* Top-Right Availability Status */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 3,
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 10px',
              backgroundColor: 'rgba(0, 36, 28, 0.88)',
              color: '#FFFFFF',
              fontSize: '0.7rem',
              fontWeight: 600,
              borderRadius: '9999px',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: property.status === 'available' ? '#4ADE80' : '#F87171',
                boxShadow: property.status === 'available' ? '0 0 8px #4ADE80' : 'none',
              }}
            />
            <span style={{ textTransform: 'capitalize' }}>
              {property.status === 'available' ? 'Available' : property.status}
            </span>
          </span>
        </div>

        {/* Bottom Floating Price Ribbon on Image */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '12px',
            zIndex: 3,
            display: 'flex',
            alignItems: 'baseline',
            gap: '5px',
            backgroundColor: 'rgba(0, 32, 24, 0.92)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(247, 214, 176, 0.3)',
            borderRadius: '10px',
            padding: '4px 12px',
            boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
          }}
        >
          <span
            style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#F7D6B0',
            }}
          >
            From
          </span>
          <span
            className="luxury-serif"
            style={{
              fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif !important",
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#FFFFFF',
            }}
          >
            {property.priceDisplay || 'Price on Request'}
          </span>
        </div>

        {/* Image Carousel Controls if multiple images */}
        {images.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '12px',
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'rgba(0, 20, 15, 0.75)',
              borderRadius: '9999px',
              padding: '3px 6px',
              backdropFilter: 'blur(6px)',
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveImgIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={14} />
            </button>
            <span style={{ fontSize: '0.68rem', color: '#F7D6B0', fontWeight: 600, padding: '0 2px' }}>
              {activeImgIdx + 1}/{images.length}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveImgIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
              }}
              aria-label="Next image"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* =======================================================================
          BOTTOM DETAILS ZONE (48% HEIGHT) — COMPACT EDITORIAL REFINEMENT
          ======================================================================= */}
      <div
        style={{
          padding: '1rem 1.3rem 0.95rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          backgroundColor: '#FFFFFF',
          boxSizing: 'border-box',
        }}
      >
        <div>
          {/* Location Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#A26E2D',
              fontSize: '0.76rem',
              fontWeight: 600,
              letterSpacing: '0.03em',
              marginBottom: '0.25rem',
            }}
          >
            <MapPin size={13} color="#B68B45" />
            <span>
              {property.location?.area ? `${property.location.area}, ` : ''}
              {property.location?.city || 'Balaghat'}, {property.location?.state || 'Madhya Pradesh'}
            </span>
          </div>

          {/* Title in Luxury Editorial Serif */}
          <h3
            className="luxury-serif"
            style={{
              fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif !important",
              fontSize: 'clamp(1.2rem, 1.4vw, 1.35rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '0.55rem',
            }}
          >
            <Link
              to={`/properties/${property.slug}`}
              style={{
                color: isHovered ? '#B3762E' : '#00382B',
                textDecoration: 'none',
                transition: 'color 0.25s ease',
              }}
            >
              {property.title}
            </Link>
          </h3>

          {/* Specifications Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginBottom: '0.55rem',
            }}
          >
            {property.configuration && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  color: '#00382B',
                  backgroundColor: '#F8F6F1',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  border: '1px solid #EBE4D8',
                }}
              >
                <Home size={12} color="#00382B" />
                <span>{property.configuration}</span>
              </div>
            )}

            {property.plotArea?.value > 0 && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  color: '#00382B',
                  backgroundColor: '#F8F6F1',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  border: '1px solid #EBE4D8',
                }}
              >
                <Maximize2 size={12} color="#00382B" />
                <span>
                  {property.plotArea.value} {property.plotArea.unit}
                </span>
              </div>
            )}

            {property.builtUpArea?.value > 0 && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  color: '#555048',
                  backgroundColor: '#F8F6F1',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  border: '1px solid #EBE4D8',
                }}
              >
                <Sparkles size={12} color="#B68B45" />
                <span>
                  {property.builtUpArea.value} {property.builtUpArea.unit}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer: Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            paddingTop: '6px',
            borderTop: '1px solid #F2EFE9',
          }}
        >
          {/* Enquire Quick Button */}
          {onEnquire && (
            <button
              type="button"
              onClick={() => onEnquire(property.title)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 14px',
                backgroundColor: isHovered ? '#FBE8D3' : '#F6F2EB',
                color: '#00382B',
                border: '1px solid #E5D9C8',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F7D6B0';
                e.currentTarget.style.borderColor = '#D4A85A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isHovered ? '#FBE8D3' : '#F6F2EB';
                e.currentTarget.style.borderColor = '#E5D9C8';
              }}
            >
              <Phone size={12} color="#00382B" />
              <span>Enquire</span>
            </button>
          )}

          {/* Primary View Details Button */}
          <Link
            to={`/properties/${property.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 16px',
              backgroundColor: '#00382B',
              color: '#FFFFFF',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(0, 56, 43, 0.25)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#004D3C';
              e.currentTarget.style.transform = 'translateX(2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#00382B';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <span>View Sanctuary</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
};
