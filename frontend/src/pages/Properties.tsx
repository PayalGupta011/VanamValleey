import React, { useState, useEffect } from 'react';
import {
  Search,
  RotateCcw,
  ArrowUpDown,
  Car,
  FileCheck,
  Sparkles,
} from 'lucide-react';
import { PropertyCard } from '../components/shared/PropertyCard';
import { LoadingSpinner, EmptyState, ErrorState } from '../components/shared/StateStates';
import type { Property } from '../types';
import { api } from '../services/api';

interface PropertiesProps {
  onOpenEnquiry: (propertyTitle?: string) => void;
  onOpenSiteVisit?: (propertyTitle?: string) => void;
  onOpenChecklist?: () => void;
}

type SortOption = 'featured' | 'price_asc' | 'price_desc' | 'area_asc' | 'area_desc';
type SizeRange = 'all' | 'small' | 'medium' | 'large';
type PriceRange = 'all' | 'under25' | '25to50' | '50to100' | 'above100';

export const Properties: React.FC<PropertiesProps> = ({
  onOpenEnquiry,
  onOpenSiteVisit,
  onOpenChecklist,
}) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Filters state
  const [typeFilter, setTypeFilter] = useState<'all' | 'villa' | 'plot'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sizeRange, setSizeRange] = useState<SizeRange>('all');
  const [priceRange, setPriceRange] = useState<PriceRange>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const fetchProperties = async () => {
    setLoading(true);
    setError(false);
    try {
      const params: any = {};
      if (typeFilter !== 'all') params.propertyType = typeFilter;
      if (statusFilter !== 'all') params.status = statusFilter;

      const res = await api.getProperties(params);
      setProperties(res.properties);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [typeFilter, statusFilter]);

  // Comprehensive client-side filtering & sorting
  const filteredAndSortedProperties = properties
    .filter((p) => {
      // 1. Text Search Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesConfig = p.configuration?.toLowerCase().includes(q);
        const matchesArea = p.location?.area?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesConfig && !matchesArea) return false;
      }

      // 2. Square Feet Size Filter
      const areaVal = p.builtUpArea?.value || p.plotArea?.value || 0;
      if (sizeRange === 'small' && areaVal >= 1500) return false;
      if (sizeRange === 'medium' && (areaVal < 1500 || areaVal > 2500)) return false;
      if (sizeRange === 'large' && areaVal < 2500) return false;

      // 3. Price Budget Filter (amount in rupees)
      const priceVal = typeof p.price === 'number' ? p.price : 0;
      if (priceRange === 'under25' && priceVal >= 2500000) return false;
      if (priceRange === '25to50' && (priceVal < 2500000 || priceVal > 5000000)) return false;
      if (priceRange === '50to100' && (priceVal < 5000000 || priceVal > 10000000)) return false;
      if (priceRange === 'above100' && priceVal < 10000000) return false;

      return true;
    })
    .sort((a, b) => {
      const priceA = typeof a.price === 'number' ? a.price : 0;
      const priceB = typeof b.price === 'number' ? b.price : 0;
      const areaA = a.builtUpArea?.value || a.plotArea?.value || 0;
      const areaB = b.builtUpArea?.value || b.plotArea?.value || 0;

      if (sortBy === 'price_asc') return priceA - priceB;
      if (sortBy === 'price_desc') return priceB - priceA;
      if (sortBy === 'area_asc') return areaA - areaB;
      if (sortBy === 'area_desc') return areaB - areaA;

      // 'featured': featured first, then newest
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    });

  const handleReset = () => {
    setTypeFilter('all');
    setStatusFilter('all');
    setSizeRange('all');
    setPriceRange('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  const isFiltered =
    typeFilter !== 'all' ||
    statusFilter !== 'all' ||
    sizeRange !== 'all' ||
    priceRange !== 'all' ||
    searchQuery.trim() !== '' ||
    sortBy !== 'featured';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', fontFamily: "'Poppins', sans-serif" }}>
      {/* Header Banner */}
      <section
        style={{
          backgroundColor: '#064B3B',
          backgroundImage:
            'radial-gradient(circle at 80% 25%, rgba(201, 154, 67, 0.28) 0%, transparent 60%), linear-gradient(180deg, #064B3B 0%, #033428 100%)',
          color: '#F8F6F0',
          padding: '4.5rem 1.5rem 3.5rem',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(201, 154, 67, 0.15)',
              border: '1px solid rgba(201, 154, 67, 0.4)',
              borderRadius: '999px',
              padding: '6px 16px',
              marginBottom: '1rem',
              color: '#F7D6B0',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            <Sparkles size={14} color="#C99A43" />
            <span>RERA & TNCP Approved Eco-Township</span>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              color: '#FFF5E5',
              margin: '0 0 1rem',
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            Villas & Residential Plots
          </h1>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'rgba(248, 246, 240, 0.88)',
              margin: '0 auto 1.75rem',
              lineHeight: 1.6,
              maxWidth: '680px',
            }}
          >
            Explore 129 signature master-planned residences in Balaghat, Madhya Pradesh. 100% freehold registry ready.
          </p>

          {/* Quick Action Badges: Site Visit & Document Checklist */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            {onOpenSiteVisit && (
              <button
                type="button"
                onClick={() => onOpenSiteVisit()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 22px',
                  backgroundColor: '#C99A43',
                  color: '#064B3B',
                  borderRadius: '999px',
                  border: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(201, 154, 67, 0.35)',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <Car size={16} />
                <span>Book Guided VIP Site Visit</span>
              </button>
            )}

            {onOpenChecklist && (
              <button
                type="button"
                onClick={onOpenChecklist}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 22px',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  borderRadius: '999px',
                  border: '1.5px solid rgba(201, 154, 67, 0.6)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)')}
              >
                <FileCheck size={16} color="#D8AE61" />
                <span>View Document Checklist</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Advanced Filter & Sorting Command Center */}
      <section
        style={{
          backgroundColor: '#FAF6EF',
          borderBottom: '1.5px solid rgba(201, 154, 67, 0.35)',
          padding: '1.5rem',
          position: 'sticky',
          top: '74px',
          zIndex: 80,
          boxShadow: '0 4px 16px rgba(6, 75, 59, 0.04)',
        }}
      >
        <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Row 1: Search, Sort Dropdown & Reset */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            {/* Search Input */}
            <div style={{ position: 'relative', flex: '1', minWidth: '260px' }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#C99A43',
                }}
              />
              <input
                type="text"
                placeholder="Search villas, plots, or sizes (e.g. Duplex, 1551 sq.ft, Garra)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 42px',
                  borderRadius: '10px',
                  border: '1.5px solid #D8D3C8',
                  backgroundColor: '#FFFFFF',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Sort Options */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', fontWeight: 700, color: '#064B3B' }}>
                <ArrowUpDown size={15} color="#C99A43" />
                <span>Sort By:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                style={{
                  padding: '9px 14px',
                  borderRadius: '8px',
                  border: '1.5px solid #C99A43',
                  backgroundColor: '#FFFFFF',
                  color: '#064B3B',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="featured">✨ Featured & Recommended</option>
                <option value="price_asc">Price: Low to High (₹)</option>
                <option value="price_desc">Price: High to Low (₹)</option>
                <option value="area_asc">Size: Smallest to Largest (Sq.Ft.)</option>
                <option value="area_desc">Size: Largest to Smallest (Sq.Ft.)</option>
              </select>
            </div>

            {/* Reset Button */}
            {isFiltered && (
              <button
                type="button"
                onClick={handleReset}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 16px',
                  backgroundColor: '#FFFFFF',
                  color: '#C4392F',
                  border: '1.5px solid #F8B4B4',
                  borderRadius: '8px',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <RotateCcw size={14} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Row 2: Filter Pills (Property Type, Sq.Ft. Size, Price Range) */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '12px',
              paddingTop: '4px',
              borderTop: '1px solid #E8E5DE',
            }}
          >
            {/* Property Type Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6A665E', textTransform: 'uppercase' }}>Type:</span>
              {[
                { val: 'all', label: 'All' },
                { val: 'villa', label: 'Duplex Villas' },
                { val: 'plot', label: 'Plots' },
              ].map((t) => (
                <button
                  key={t.val}
                  type="button"
                  onClick={() => setTypeFilter(t.val as any)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    border: typeFilter === t.val ? '1.5px solid #064B3B' : '1.5px solid #D8D3C8',
                    backgroundColor: typeFilter === t.val ? '#064B3B' : '#FFFFFF',
                    color: typeFilter === t.val ? '#FFFFFF' : '#3E3A34',
                    fontSize: '0.8rem',
                    fontWeight: typeFilter === t.val ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Sq.Ft. Area Size Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6A665E', textTransform: 'uppercase' }}>Sq.Ft:</span>
              {[
                { val: 'all', label: 'All Sizes' },
                { val: 'small', label: '< 1,500' },
                { val: 'medium', label: '1,500 – 2,500' },
                { val: 'large', label: '2,500+' },
              ].map((s) => (
                <button
                  key={s.val}
                  type="button"
                  onClick={() => setSizeRange(s.val as SizeRange)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '999px',
                    border: sizeRange === s.val ? '1.5px solid #C99A43' : '1.5px solid #D8D3C8',
                    backgroundColor: sizeRange === s.val ? '#C99A43' : '#FFFFFF',
                    color: sizeRange === s.val ? '#064B3B' : '#3E3A34',
                    fontSize: '0.8rem',
                    fontWeight: sizeRange === s.val ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Price Budget Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6A665E', textTransform: 'uppercase' }}>Budget:</span>
              {[
                { val: 'all', label: 'All' },
                { val: 'under25', label: '< ₹25L' },
                { val: '25to50', label: '₹25L – ₹50L' },
                { val: '50to100', label: '₹50L – ₹1Cr' },
                { val: 'above100', label: '₹1Cr+' },
              ].map((p) => (
                <button
                  key={p.val}
                  type="button"
                  onClick={() => setPriceRange(p.val as PriceRange)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '999px',
                    border: priceRange === p.val ? '1.5px solid #064B3B' : '1.5px solid #D8D3C8',
                    backgroundColor: priceRange === p.val ? '#064B3B' : '#FFFFFF',
                    color: priceRange === p.val ? '#FFFFFF' : '#3E3A34',
                    fontSize: '0.8rem',
                    fontWeight: priceRange === p.val ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Results Counter Pill */}
            <div
              style={{
                marginLeft: 'auto',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#064B3B',
                backgroundColor: 'rgba(6, 75, 59, 0.08)',
                padding: '4px 12px',
                borderRadius: '6px',
              }}
            >
              Showing <strong>{filteredAndSortedProperties.length}</strong> Properties
            </div>
          </div>
        </div>
      </section>

      {/* Property Cards Grid */}
      <section style={{ padding: '3.5rem 1.5rem 5rem' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          {loading && <LoadingSpinner message="Curating premium real estate options..." />}
          {error && <ErrorState message="Could not load properties." onRetry={fetchProperties} />}

          {!loading && !error && filteredAndSortedProperties.length === 0 && (
            <EmptyState
              title="No Properties Match Your Filter"
              description="Try adjusting your square feet range, budget filter, or search query."
              action={
                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    padding: '0.65rem 1.6rem',
                    borderRadius: '9999px',
                    backgroundColor: '#064B3B',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.92rem',
                    boxShadow: '0 4px 14px rgba(6, 75, 59, 0.25)',
                  }}
                >
                  Clear All Filters
                </button>
              }
            />
          )}

          {!loading && !error && filteredAndSortedProperties.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 310px), 1fr))',
                gap: '2rem',
              }}
            >
              {filteredAndSortedProperties.map((property) => (
                <div key={property._id} style={{ position: 'relative' }}>
                  <PropertyCard property={property} onEnquire={onOpenEnquiry} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
