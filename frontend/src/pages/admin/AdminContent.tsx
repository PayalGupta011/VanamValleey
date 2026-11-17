import React, { useState, useEffect } from 'react';
import {
  Save,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Sparkles,
  Layers,
  Compass,
  Phone,
  Search,
  Building,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';
import { api } from '../../services/api';
import type { WebsiteSettings } from '../../types';
import { LoadingSpinner } from '../../components/shared/StateStates';

type TabType =
  | 'all_images'
  | 'hero'
  | 'properties'
  | 'signature'
  | 'amenities'
  | 'locations'
  | 'about'
  | 'contact'
  | 'seo';

export const AdminContent: React.FC = () => {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('hero');

  useEffect(() => {
    api.getSettings().then((data) => {
      if (data) {
        // Ensure nested structures exist so inputs never fail
        const initial: WebsiteSettings = {
          ...data,
          hero: {
            title: data.hero?.title || 'Luxury Forest Living in Balaghat',
            subtitle: data.hero?.subtitle || "Discover nature-inspired homes nestled in the heart of Madhya Pradesh's lush forests.",
            ctaPrimary: data.hero?.ctaPrimary || { text: 'Explore Properties', link: '/properties' },
            ctaSecondary: data.hero?.ctaSecondary || { text: 'Enquire Now', link: '/contact' },
            images: data.hero?.images || [{ url: '/vanam-grand-entrance.jpg', alt: 'Grand Entrance' }],
          },
          propertyOptions: {
            eyebrow: data.propertyOptions?.eyebrow || 'EXCLUSIVE TOWNSHIP PROPERTIES',
            headingFirst: data.propertyOptions?.headingFirst || 'Explore Our',
            headingSecond: data.propertyOptions?.headingSecond || 'Property Options',
            description: data.propertyOptions?.description || 'From 100% freehold residential plots to master-crafted duplex forest villas, choose the ideal living space designed for comfort, luxury, and generational legacy.',
            card1: {
              title: data.propertyOptions?.card1?.title || 'Duplex Villas',
              spec: data.propertyOptions?.card1?.spec || '1,551 sq.ft. Built-up',
              image: data.propertyOptions?.card1?.image || '/properties_showcase/villa_arch_photo_new.jpg',
            },
            card2: {
              title: data.propertyOptions?.card2?.title || 'Vanam Valley Township',
              subtitle: data.propertyOptions?.card2?.subtitle || 'Planned Eco-Township',
              image: data.propertyOptions?.card2?.image || '/properties_showcase/township_arch_photo_new.jpg',
            },
            card3: {
              title: data.propertyOptions?.card3?.title || 'Residential Plots',
              spec: data.propertyOptions?.card3?.spec || '1,200 – 3,500 sq.ft.',
              image: data.propertyOptions?.card3?.image || '/properties_showcase/plots_arch_photo_new.jpg',
            },
          },
          signatureProjects: {
            eyebrow: data.signatureProjects?.eyebrow || 'THE MASTER ENCLAVES',
            heading: data.signatureProjects?.heading || 'Signature Projects & Phases',
            subtitle: data.signatureProjects?.subtitle || 'Three distinct residential and wellness enclaves crafted in pure harmony with the surrounding forest.',
            islandImage: data.signatureProjects?.islandImage || '/signature_projects/township_3d_island.png',
            phase1: {
              title: data.signatureProjects?.phase1?.title || 'Rengatolla Gara Plots',
              spec: data.signatureProjects?.phase1?.spec || '1.76 Acres',
              description: data.signatureProjects?.phase1?.description || 'Approved freehold plotted enclave nestled in Garra with modern infrastructure.',
              image: data.signatureProjects?.phase1?.image || '/signature_projects/phase1_plots.jpg',
            },
            phase2: {
              title: data.signatureProjects?.phase2?.title || 'The Villa Reserve',
              spec: data.signatureProjects?.phase2?.spec || '1,551 Sq.Ft. | 3 BHK Duplex',
              description: data.signatureProjects?.phase2?.description || 'Master-crafted 3 BHK duplex villas designed with panoramic forest views and private terrace gardens.',
              image: data.signatureProjects?.phase2?.image || '/signature_projects/phase2_villas.jpg',
            },
            phase3: {
              title: data.signatureProjects?.phase3?.title || 'The Canopy Club',
              spec: data.signatureProjects?.phase3?.spec || '15,000 Sq.Ft.',
              description: data.signatureProjects?.phase3?.description || 'Luxury resort-inspired clubhouse featuring an infinity pool, wellness spa, banquet hall, and lounge.',
              image: data.signatureProjects?.phase3?.image || '/signature_projects/phase3_club.jpg',
            },
            leaf1: {
              value: data.signatureProjects?.leaf1?.value || '27 Acres',
              label: data.signatureProjects?.leaf1?.label || 'Master Forest Territory',
            },
            leaf2: {
              value: data.signatureProjects?.leaf2?.value || '129 Units',
              label: data.signatureProjects?.leaf2?.label || '3 BHK Duplex Residences',
            },
            leaf3: {
              value: data.signatureProjects?.leaf3?.value || '15,000 Sq.Ft.',
              label: data.signatureProjects?.leaf3?.label || 'Canopy Resort Clubhouse',
            },
            leaf4: {
              value: data.signatureProjects?.leaf4?.value || '100% Freehold',
              label: data.signatureProjects?.leaf4?.label || 'Registry-Ready Clear Titles',
            },
          },
          curatedAmenities: {
            eyebrow: data.curatedAmenities?.eyebrow || 'RESORT-INSPIRED LIFESTYLE',
            heading: data.curatedAmenities?.heading || 'World-Class Amenities & Features',
            subtitle: data.curatedAmenities?.subtitle || 'Thoughtfully curated club, wellness, dining, and sports facilities designed to enrich life across every generation.',
            clubhouseImage: data.curatedAmenities?.clubhouseImage || '/amenities/clubhouse_resort.jpg',
            card1: {
              title: data.curatedAmenities?.card1?.title || 'Club & Dining',
              image: data.curatedAmenities?.card1?.image || '/amenities/dining_card.jpg',
            },
            card2: {
              title: data.curatedAmenities?.card2?.title || 'Swimming Pool',
              image: data.curatedAmenities?.card2?.image || '/amenities/pool_card.jpg',
            },
            card3: {
              title: data.curatedAmenities?.card3?.title || 'Spa & Wellness',
              image: data.curatedAmenities?.card3?.image || '/amenities/spa_card.jpg',
            },
            clubDiningImage: data.curatedAmenities?.clubDiningImage || '/amenities_card1_dining_hd.jpg',
            clubLoungeImage: data.curatedAmenities?.clubLoungeImage || '/amenities/clubhouse_resort.jpg',
            clubPrivateDiningImage: data.curatedAmenities?.clubPrivateDiningImage || '/amenities/dining_card.jpg',
            yogaImage: data.curatedAmenities?.yogaImage || '/amenities_card3_spa_hd.jpg',
            golfImage: data.curatedAmenities?.golfImage || '/amenities/clubhouse_resort.jpg',
            sportsCourtImage: data.curatedAmenities?.sportsCourtImage || '/amenities/pool_card.jpg',
            joggingTrackImage: data.curatedAmenities?.joggingTrackImage || '/amenities/dining_card.jpg',
            weddingLawnImage: data.curatedAmenities?.weddingLawnImage || '/amenities/clubhouse_resort.jpg',
            banquetHallImage: data.curatedAmenities?.banquetHallImage || '/amenities/dining_card.jpg',
            amphitheatreImage: data.curatedAmenities?.amphitheatreImage || '/amenities/spa_card.jpg',
            roadsImage: data.curatedAmenities?.roadsImage || '/amenities/clubhouse_resort.jpg',
            drainageImage: data.curatedAmenities?.drainageImage || '/amenities/pool_card.jpg',
            securityImage: data.curatedAmenities?.securityImage || '/amenities/dining_card.jpg',
          },
          connectivityHighwayImage: data.connectivityHighwayImage || '/connectivity_highway_pristine.jpg',
          amenities: data.amenities || [],
          locationHighlights: data.locationHighlights || [],
          about: {
            title: data.about?.title || 'The Sanctuary of Green Elegance',
            description:
              data.about?.description ||
              'Vanam Valley is an exclusive eco-luxury forest living master-planned development in Balaghat, Madhya Pradesh. Designed with nature as its architectural canvas, it encompasses 129 signature 3 BHK luxury villas and premium residential plots, combining undisturbed wilderness with world-class hospitality and recreational amenities.',
            vision: data.about?.vision || '',
            entranceImage: data.about?.entranceImage || '/about_gate_exact.jpg',
            heroImage: data.about?.heroImage || '/about_hero_villa.jpg',
            highlights: data.about?.highlights || [],
            images: data.about?.images || [],
          },
          contact: data.contact || { phone: '', email: '', address: '' },
          navbar: data.navbar || { phone: '', links: [] },
          footer: data.footer || { description: '', copyright: '' },
          seo: data.seo || { siteTitle: '', siteDescription: '' },
        };
        setSettings(initial);
      }
      setLoading(false);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setFeedback(null);

    const res = await api.adminUpdateSettings(settings);
    setSaving(false);

    if (res.success) {
      setFeedback({ type: 'success', message: 'Website content & images updated and published live!' });
      setTimeout(() => setFeedback(null), 4000);
    } else {
      setFeedback({ type: 'error', message: res.message || 'Failed to update website content.' });
    }
  };

  if (loading || !settings) {
    return <LoadingSpinner message="Loading full website content manager..." />;
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 0.9rem',
    border: '1.5px solid #D8D3C8',
    borderRadius: '8px',
    fontSize: '0.92rem',
    boxSizing: 'border-box',
    backgroundColor: '#FCFAF6',
    color: '#1B2E28',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.82rem',
    fontWeight: 700,
    color: '#064B3B',
    marginBottom: '0.35rem',
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
  };

  const cardContainerStyle: React.CSSProperties = {
    backgroundColor: '#F8F5EE',
    border: '1.5px solid rgba(201, 154, 67, 0.35)',
    borderRadius: '12px',
    padding: '1.25rem',
    marginBottom: '1.25rem',
  };

  const ImageFieldEditor: React.FC<{
    label: string;
    value: string;
    onChange: (url: string) => void;
    defaultUrl?: string;
    hint?: string;
  }> = ({ label, value, onChange, defaultUrl, hint }) => {
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      setUploadError(null);

      const formData = new FormData();
      formData.append('image', file);
      formData.append('category', 'website-cms');
      formData.append('alt', label);

      const res = await api.adminUploadMedia(formData);
      setUploading(false);

      if (res.success && res.media?.url) {
        onChange(res.media.url);
      } else {
        setUploadError(res.message || 'Upload failed. You can paste the direct image URL instead.');
      }
    };

    return (
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
          <label style={labelStyle}>{label}</label>
          {defaultUrl && value !== defaultUrl && (
            <button
              type="button"
              onClick={() => onChange(defaultUrl)}
              style={{
                background: 'none',
                border: 'none',
                color: '#C99A43',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Reset to Default
            </button>
          )}
        </div>
        {hint && <p style={{ fontSize: '0.78rem', color: '#7A756D', margin: '0 0 0.5rem' }}>{hint}</p>}

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Live Thumbnail Preview */}
          <div
            style={{
              width: '120px',
              height: '75px',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '2px solid rgba(201, 154, 67, 0.45)',
              backgroundColor: '#1E2B25',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            {value ? (
              <img
                src={value}
                alt={label}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  if (defaultUrl) (e.currentTarget as HTMLImageElement).src = defaultUrl;
                }}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A09B90', fontSize: '0.72rem' }}>
                No image
              </div>
            )}
          </div>

          {/* URL text input + upload file picker */}
          <div style={{ flex: 1, minWidth: '240px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter image URL (/path.jpg or https://...)"
                style={{ ...inputStyle, flex: 1 }}
              />
              {value && (
                <button
                  type="button"
                  onClick={() => onChange('')}
                  style={{
                    padding: '0 12px',
                    backgroundColor: '#FDE8E8',
                    color: '#9B1C1C',
                    border: '1px solid #F8B4B4',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                  title="Remove image"
                >
                  Clear
                </button>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <label
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  backgroundColor: '#064B3B',
                  color: '#FFFFFF',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  opacity: uploading ? 0.7 : 1,
                  boxShadow: '0 2px 6px rgba(6, 75, 59, 0.2)',
                }}
              >
                <Upload size={14} />
                <span>{uploading ? 'Uploading...' : 'Upload Image File'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  disabled={uploading}
                  style={{ display: 'none' }}
                />
              </label>

              {value && (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.78rem', color: '#064B3B', fontWeight: 600, textDecoration: 'none' }}
                >
                  View Full Image ↗
                </a>
              )}
            </div>

            {uploadError && (
              <span style={{ fontSize: '0.76rem', color: '#C4392F', fontWeight: 500 }}>
                {uploadError}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', paddingBottom: '4rem' }}>
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.75rem',
          paddingBottom: '1.25rem',
          borderBottom: '1.5px solid #E8E5DE',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '2.2rem',
              color: '#004B3C',
              margin: '0 0 0.35rem',
              fontWeight: 700,
            }}
          >
            Complete Website Content & Images CMS
          </h1>
          <p style={{ color: '#6A665E', fontSize: '0.92rem', margin: 0 }}>
            Full control over every section of the Home page: Hero, Property Options, Signature 3D Township, Curated Amenities, Locations, About Us, Contact & SEO.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 28px',
            backgroundColor: '#064B3B',
            color: '#FFFFFF',
            borderRadius: '8px',
            border: 'none',
            fontSize: '0.92rem',
            fontWeight: 700,
            cursor: saving ? 'not-allowed' : 'pointer',
            boxShadow: '0 6px 18px rgba(6, 75, 59, 0.28)',
            opacity: saving ? 0.7 : 1,
            transition: 'all 0.2s ease',
          }}
        >
          <Save size={18} />
          <span>{saving ? 'Publishing Changes...' : 'Publish Live Updates'}</span>
        </button>
      </div>

      {feedback && (
        <div
          style={{
            padding: '1rem 1.25rem',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: feedback.type === 'success' ? '#DEF7EC' : '#FDF2F2',
            color: feedback.type === 'success' ? '#03543F' : '#9B1C1C',
            border: feedback.type === 'success' ? '1.5px solid #BCF0DA' : '1.5px solid #F8B4B4',
            boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
          }}
        >
          {feedback.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span style={{ fontSize: '0.92rem', fontWeight: 600 }}>{feedback.message}</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          borderBottom: '2px solid #E8E5DE',
          marginBottom: '2rem',
          overflowX: 'auto',
          paddingBottom: '2px',
        }}
        className="admin-content-tabs-bar"
      >
        {[
          { label: '🖼️ All Website Images Hub', val: 'all_images', icon: ImageIcon },
          { label: 'Hero Banner', val: 'hero', icon: Sparkles },
          { label: 'Property Options (3 Cards)', val: 'properties', icon: Building },
          { label: 'Signature Projects & 3D Island', val: 'signature', icon: Layers },
          { label: 'Curated Amenities & Club', val: 'amenities', icon: Compass },
          { label: 'Location & Connectivity', val: 'locations', icon: Compass },
          { label: 'About Project & Vision', val: 'about', icon: Building },
          { label: 'Navbar, Contact & Social', val: 'contact', icon: Phone },
          { label: 'SEO & Brand Logo', val: 'seo', icon: Search },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.val;
          return (
            <button
              key={tab.val}
              type="button"
              onClick={() => setActiveTab(tab.val as TabType)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 18px',
                border: 'none',
                background: isActive ? '#FAF6EF' : 'transparent',
                cursor: 'pointer',
                fontSize: '0.86rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#064B3B' : '#6A665E',
                borderBottom: isActive ? '3px solid #C99A43' : '3px solid transparent',
                borderRadius: '8px 8px 0 0',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              <Icon size={16} color={isActive ? '#C99A43' : '#6A665E'} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Form Body */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1.5px solid #E8E5DE',
          padding: '2.25rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        }}
      >
        {/* =================================================================
            TAB 0: ALL WEBSITE IMAGES HUB (UNIVERSAL MEDIA MANAGER)
            ================================================================= */}
        {activeTab === 'all_images' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.65rem', color: '#064B3B', margin: '0 0 0.5rem', fontWeight: 700 }}>
                🖼️ All Website Images Hub (Universal Media Console)
              </h3>
              <p style={{ color: '#6A665E', fontSize: '0.9rem', margin: 0 }}>
                Directly edit, replace, upload new files, or reset every image across all sections of the Vanam Valley website.
              </p>
            </div>

            {/* Section 1: Hero Visuals */}
            <div style={{ ...cardContainerStyle, marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 1rem', color: '#064B3B', fontSize: '1.1rem', fontWeight: 700, borderBottom: '1px solid #E2DDD3', paddingBottom: '0.5rem' }}>
                🌟 Hero Section & Grand Entrance Gate
              </h4>
              <ImageFieldEditor
                label="Vanam Valley Grand Entrance Gate Photo"
                value={settings.hero?.images?.[0]?.url || '/vanam-grand-entrance.jpg'}
                onChange={(url) => {
                  const imgs = [...(settings.hero?.images || [{ url: '', alt: 'Grand Entrance' }])];
                  imgs[0] = { ...imgs[0], url };
                  setSettings({ ...settings, hero: { ...settings.hero, images: imgs } });
                }}
                defaultUrl="/vanam-grand-entrance.jpg"
                hint="Main hero card image beside the welcome headline"
              />
            </div>

            {/* Section 2: Property Options */}
            <div style={{ ...cardContainerStyle, marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 1rem', color: '#064B3B', fontSize: '1.1rem', fontWeight: 700, borderBottom: '1px solid #E2DDD3', paddingBottom: '0.5rem' }}>
                🏘️ Property Options (3 Showcase Cards)
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <ImageFieldEditor
                  label="Card 1: Duplex Villas Photo"
                  value={settings.propertyOptions?.card1?.image || '/properties_showcase/villa_arch_photo_new.jpg'}
                  onChange={(url) =>
                    setSettings({
                      ...settings,
                      propertyOptions: {
                        ...settings.propertyOptions,
                        card1: { ...settings.propertyOptions?.card1, image: url },
                      },
                    })
                  }
                  defaultUrl="/properties_showcase/villa_arch_photo_new.jpg"
                />
                <ImageFieldEditor
                  label="Card 2: Vanam Valley Township Photo"
                  value={settings.propertyOptions?.card2?.image || '/properties_showcase/township_arch_photo_new.jpg'}
                  onChange={(url) =>
                    setSettings({
                      ...settings,
                      propertyOptions: {
                        ...settings.propertyOptions,
                        card2: { ...settings.propertyOptions?.card2, image: url },
                      },
                    })
                  }
                  defaultUrl="/properties_showcase/township_arch_photo_new.jpg"
                />
                <ImageFieldEditor
                  label="Card 3: Residential Plots Photo"
                  value={settings.propertyOptions?.card3?.image || '/properties_showcase/plots_arch_photo_new.jpg'}
                  onChange={(url) =>
                    setSettings({
                      ...settings,
                      propertyOptions: {
                        ...settings.propertyOptions,
                        card3: { ...settings.propertyOptions?.card3, image: url },
                      },
                    })
                  }
                  defaultUrl="/properties_showcase/plots_arch_photo_new.jpg"
                />
              </div>
            </div>

            {/* Section 3: Signature Projects & 3D Island */}
            <div style={{ ...cardContainerStyle, marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 1rem', color: '#064B3B', fontSize: '1.1rem', fontWeight: 700, borderBottom: '1px solid #E2DDD3', paddingBottom: '0.5rem' }}>
                🏝️ Signature Projects & 3D Master Enclave
              </h4>
              <ImageFieldEditor
                label="3D Master Floating Island Illustration"
                value={settings.signatureProjects?.islandImage || '/signature_projects/township_3d_island.png'}
                onChange={(url) =>
                  setSettings({
                    ...settings,
                    signatureProjects: {
                      ...settings.signatureProjects,
                      islandImage: url,
                    },
                  })
                }
                defaultUrl="/signature_projects/township_3d_island.png"
                hint="Central 3D floating paradise masterplan graphic"
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '1rem' }}>
                <ImageFieldEditor
                  label="Phase 1: Rengatolla Gara Plots Photo"
                  value={settings.signatureProjects?.phase1?.image || '/signature_projects/phase1_plots.jpg'}
                  onChange={(url) =>
                    setSettings({
                      ...settings,
                      signatureProjects: {
                        ...settings.signatureProjects,
                        phase1: { ...settings.signatureProjects?.phase1, image: url },
                      },
                    })
                  }
                  defaultUrl="/signature_projects/phase1_plots.jpg"
                />
                <ImageFieldEditor
                  label="Phase 2: The Villa Reserve Photo"
                  value={settings.signatureProjects?.phase2?.image || '/signature_projects/phase2_villas.jpg'}
                  onChange={(url) =>
                    setSettings({
                      ...settings,
                      signatureProjects: {
                        ...settings.signatureProjects,
                        phase2: { ...settings.signatureProjects?.phase2, image: url },
                      },
                    })
                  }
                  defaultUrl="/signature_projects/phase2_villas.jpg"
                />
                <ImageFieldEditor
                  label="Phase 3: The Canopy Club Photo"
                  value={settings.signatureProjects?.phase3?.image || '/signature_projects/phase3_club.jpg'}
                  onChange={(url) =>
                    setSettings({
                      ...settings,
                      signatureProjects: {
                        ...settings.signatureProjects,
                        phase3: { ...settings.signatureProjects?.phase3, image: url },
                      },
                    })
                  }
                  defaultUrl="/signature_projects/phase3_club.jpg"
                />
              </div>
            </div>

            {/* Section 4: Strategic Connectivity & Highways */}
            <div style={{ ...cardContainerStyle, marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 1rem', color: '#064B3B', fontSize: '1.1rem', fontWeight: 700, borderBottom: '1px solid #E2DDD3', paddingBottom: '0.5rem' }}>
                🛣️ Strategic Connectivity & Highways
              </h4>
              <ImageFieldEditor
                label="Central Highway Arch Image (Pristine Highway)"
                value={settings.connectivityHighwayImage || '/connectivity_highway_pristine.jpg'}
                onChange={(url) => setSettings({ ...settings, connectivityHighwayImage: url })}
                defaultUrl="/connectivity_highway_pristine.jpg"
                hint="Central highway photograph shown in the golden circular arch"
              />
            </div>

            {/* Section 5: Curated Amenities & Clubhouse */}
            <div style={{ ...cardContainerStyle, marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 1rem', color: '#064B3B', fontSize: '1.1rem', fontWeight: 700, borderBottom: '1px solid #E2DDD3', paddingBottom: '0.5rem' }}>
                🏊 Curated Resort Amenities & World-Class Features
              </h4>
              <ImageFieldEditor
                label="Grand Clubhouse & Resort Pool Hero Banner"
                value={settings.curatedAmenities?.clubhouseImage || '/amenities_clubhouse_hero_hd.jpg'}
                onChange={(url) =>
                  setSettings({
                    ...settings,
                    curatedAmenities: {
                      ...settings.curatedAmenities,
                      clubhouseImage: url,
                    },
                  })
                }
                defaultUrl="/amenities_clubhouse_hero_hd.jpg"
                hint="Large oval landscape photograph of the clubhouse & infinity pool"
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '1rem' }}>
                <ImageFieldEditor
                  label="Card 1: Club & Fine Dining Photo"
                  value={settings.curatedAmenities?.card1?.image || '/amenities_card1_dining_hd.jpg'}
                  onChange={(url) =>
                    setSettings({
                      ...settings,
                      curatedAmenities: {
                        ...settings.curatedAmenities,
                        card1: { ...settings.curatedAmenities?.card1, image: url },
                      },
                    })
                  }
                  defaultUrl="/amenities_card1_dining_hd.jpg"
                />
                <ImageFieldEditor
                  label="Card 2: Resort Swimming Pool Photo"
                  value={settings.curatedAmenities?.card2?.image || '/amenities_card2_pool_hd.jpg'}
                  onChange={(url) =>
                    setSettings({
                      ...settings,
                      curatedAmenities: {
                        ...settings.curatedAmenities,
                        card2: { ...settings.curatedAmenities?.card2, image: url },
                      },
                    })
                  }
                  defaultUrl="/amenities_card2_pool_hd.jpg"
                />
                <ImageFieldEditor
                  label="Card 3: Ayurvedic Spa & Wellness Photo"
                  value={settings.curatedAmenities?.card3?.image || '/amenities_card3_spa_hd.jpg'}
                  onChange={(url) =>
                    setSettings({
                      ...settings,
                      curatedAmenities: {
                        ...settings.curatedAmenities,
                        card3: { ...settings.curatedAmenities?.card3, image: url },
                      },
                    })
                  }
                  defaultUrl="/amenities_card3_spa_hd.jpg"
                />
              </div>

              {/* Sports, Events, Infra & Yoga Additional Images */}
              <div style={{ marginTop: '1.5rem', borderTop: '1px dashed #D8AE61', paddingTop: '1.25rem' }}>
                <div style={{ fontWeight: 700, color: '#064B3B', marginBottom: '0.75rem', fontSize: '0.96rem' }}>
                  Additional Amenity Category Photos (Sports, Banquets, Infrastructure & Wellness)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  <ImageFieldEditor
                    label="Executive Mini Golf Turf"
                    value={settings.curatedAmenities?.golfImage || '/amenities/clubhouse_resort.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, golfImage: url } })}
                    defaultUrl="/amenities/clubhouse_resort.jpg"
                  />
                  <ImageFieldEditor
                    label="Multi-Sport Courts (Badminton, Basketball)"
                    value={settings.curatedAmenities?.sportsCourtImage || '/amenities/pool_card.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, sportsCourtImage: url } })}
                    defaultUrl="/amenities/pool_card.jpg"
                  />
                  <ImageFieldEditor
                    label="Forest Jogging & Cycling Track"
                    value={settings.curatedAmenities?.joggingTrackImage || '/amenities/dining_card.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, joggingTrackImage: url } })}
                    defaultUrl="/amenities/dining_card.jpg"
                  />
                  <ImageFieldEditor
                    label="Grand Wedding & Celebration Lawn"
                    value={settings.curatedAmenities?.weddingLawnImage || '/amenities/clubhouse_resort.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, weddingLawnImage: url } })}
                    defaultUrl="/amenities/clubhouse_resort.jpg"
                  />
                  <ImageFieldEditor
                    label="Air-Conditioned Banquet Hall"
                    value={settings.curatedAmenities?.banquetHallImage || '/amenities/dining_card.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, banquetHallImage: url } })}
                    defaultUrl="/amenities/dining_card.jpg"
                  />
                  <ImageFieldEditor
                    label="Forest Amphitheatre"
                    value={settings.curatedAmenities?.amphitheatreImage || '/amenities/spa_card.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, amphitheatreImage: url } })}
                    defaultUrl="/amenities/spa_card.jpg"
                  />
                  <ImageFieldEditor
                    label="Wide Concrete Roads & Boulevards"
                    value={settings.curatedAmenities?.roadsImage || '/amenities/clubhouse_resort.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, roadsImage: url } })}
                    defaultUrl="/amenities/clubhouse_resort.jpg"
                  />
                  <ImageFieldEditor
                    label="Underground Drainage & Eco Utilities"
                    value={settings.curatedAmenities?.drainageImage || '/amenities/pool_card.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, drainageImage: url } })}
                    defaultUrl="/amenities/pool_card.jpg"
                  />
                  <ImageFieldEditor
                    label="Multi-Tier Gated Security Gatehouse"
                    value={settings.curatedAmenities?.securityImage || '/amenities/dining_card.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, securityImage: url } })}
                    defaultUrl="/amenities/dining_card.jpg"
                  />
                  <ImageFieldEditor
                    label="Yoga & Peace Pavilion Deck"
                    value={settings.curatedAmenities?.yogaImage || '/amenities_card3_spa_hd.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, yogaImage: url } })}
                    defaultUrl="/amenities_card3_spa_hd.jpg"
                  />
                  <ImageFieldEditor
                    label="Sunset Timber Lounge Deck"
                    value={settings.curatedAmenities?.clubLoungeImage || '/amenities/clubhouse_resort.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, clubLoungeImage: url } })}
                    defaultUrl="/amenities/clubhouse_resort.jpg"
                  />
                  <ImageFieldEditor
                    label="Private Dining Suites"
                    value={settings.curatedAmenities?.clubPrivateDiningImage || '/amenities/dining_card.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, clubPrivateDiningImage: url } })}
                    defaultUrl="/amenities/dining_card.jpg"
                  />
                </div>
              </div>
            </div>

            {/* Section 6: About Us Page & Grand Entrance Heritage */}
            <div style={{ ...cardContainerStyle, marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 1rem', color: '#064B3B', fontSize: '1.1rem', fontWeight: 700, borderBottom: '1px solid #E2DDD3', paddingBottom: '0.5rem' }}>
                🏛️ About Us Page & Grand Entrance Gate
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <ImageFieldEditor
                  label="Philosophy: Grand Entrance Gate Photo"
                  value={settings.about?.entranceImage || '/about_gate_exact.jpg'}
                  onChange={(url) =>
                    setSettings({
                      ...settings,
                      about: { ...settings.about, entranceImage: url },
                    })
                  }
                  defaultUrl="/about_gate_exact.jpg"
                  hint="Framed gold photo of the stone pillar & entrance gate in About Us"
                />
                <ImageFieldEditor
                  label="About Hero: Duplex Villa Sunset Landscape"
                  value={settings.about?.heroImage || '/about_hero_villa.jpg'}
                  onChange={(url) =>
                    setSettings({
                      ...settings,
                      about: { ...settings.about, heroImage: url },
                    })
                  }
                  defaultUrl="/about_hero_villa.jpg"
                  hint="Panoramic duplex villa with mountain sunset shown in About Us hero"
                />
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 1: HERO BANNER
            ================================================================= */}
        {activeTab === 'hero' && (
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', color: '#064B3B', marginBottom: '1.5rem', fontWeight: 700 }}>
              Hero Section Headline, Subtitle & Visuals
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Main Hero Headline</label>
                <input
                  type="text"
                  value={settings.hero.title}
                  onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, title: e.target.value } })}
                  style={inputStyle}
                  placeholder="e.g. Luxury Forest Living in Balaghat"
                />
              </div>

              <div>
                <label style={labelStyle}>Subtitle Paragraph</label>
                <textarea
                  rows={3}
                  value={settings.hero.subtitle}
                  onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, subtitle: e.target.value } })}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  placeholder="Supporting subtitle text..."
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Primary CTA Button Text</label>
                <input
                  type="text"
                  value={settings.hero.ctaPrimary?.text || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      hero: {
                        ...settings.hero,
                        ctaPrimary: { ...settings.hero.ctaPrimary, text: e.target.value, link: settings.hero.ctaPrimary?.link || '/properties' },
                      },
                    })
                  }
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Secondary CTA Button Text</label>
                <input
                  type="text"
                  value={settings.hero.ctaSecondary?.text || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      hero: {
                        ...settings.hero,
                        ctaSecondary: { ...settings.hero.ctaSecondary, text: e.target.value, link: settings.hero.ctaSecondary?.link || '/contact' },
                      },
                    })
                  }
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={cardContainerStyle}>
              <label style={labelStyle}>Primary Hero Background / Gate Image URL</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input
                  type="text"
                  value={settings.hero.images?.[0]?.url || ''}
                  onChange={(e) => {
                    const imgs = [...(settings.hero.images || [])];
                    imgs[0] = { url: e.target.value, alt: 'Vanam Valley Grand Entrance' };
                    setSettings({ ...settings, hero: { ...settings.hero, images: imgs } });
                  }}
                  style={inputStyle}
                  placeholder="/vanam-grand-entrance.jpg or https://..."
                />
                {settings.hero.images?.[0]?.url && (
                  <img
                    src={settings.hero.images[0].url}
                    alt="Preview"
                    style={{ width: '90px', height: '55px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #C99A43' }}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 2: PROPERTY OPTIONS SECTION
            ================================================================= */}
        {activeTab === 'properties' && (
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', color: '#064B3B', marginBottom: '0.5rem', fontWeight: 700 }}>
              Property Options Section Content & 3 Property Cards
            </h3>
            <p style={{ color: '#6A665E', fontSize: '0.88rem', marginBottom: '1.75rem' }}>
              Edit the section eyebrow, main titles, supporting paragraph, and the images/details of the 3 luxury property cards.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Section Eyebrow</label>
                <input
                  type="text"
                  value={settings.propertyOptions?.eyebrow || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      propertyOptions: { ...settings.propertyOptions, eyebrow: e.target.value },
                    })
                  }
                  style={inputStyle}
                  placeholder="EXCLUSIVE TOWNSHIP PROPERTIES"
                />
              </div>

              <div>
                <label style={labelStyle}>Heading Part 1 (Green)</label>
                <input
                  type="text"
                  value={settings.propertyOptions?.headingFirst || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      propertyOptions: { ...settings.propertyOptions, headingFirst: e.target.value },
                    })
                  }
                  style={inputStyle}
                  placeholder="Explore Our"
                />
              </div>

              <div>
                <label style={labelStyle}>Heading Part 2 (Champagne Gold)</label>
                <input
                  type="text"
                  value={settings.propertyOptions?.headingSecond || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      propertyOptions: { ...settings.propertyOptions, headingSecond: e.target.value },
                    })
                  }
                  style={inputStyle}
                  placeholder="Property Options"
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={labelStyle}>Section Description Paragraph</label>
              <textarea
                rows={3}
                value={settings.propertyOptions?.description || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    propertyOptions: { ...settings.propertyOptions, description: e.target.value },
                  })
                }
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <h4 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.15rem', color: '#064B3B', marginBottom: '1rem', fontWeight: 600 }}>
              The 3 Featured Property Cards:
            </h4>

            {/* CARD 1: DUPLEX VILLAS */}
            <div style={cardContainerStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span style={{ fontWeight: 700, color: '#064B3B', fontSize: '0.95rem' }}>Card 1: Duplex Villas</span>
                <span style={{ fontSize: '0.78rem', color: '#B98938', fontWeight: 600 }}>LEFT RECTANGULAR CARD</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.85rem' }}>
                <div>
                  <label style={labelStyle}>Title</label>
                  <input
                    type="text"
                    value={settings.propertyOptions?.card1?.title || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        propertyOptions: {
                          ...settings.propertyOptions,
                          card1: { ...settings.propertyOptions?.card1, title: e.target.value },
                        },
                      })
                    }
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Specification</label>
                  <input
                    type="text"
                    value={settings.propertyOptions?.card1?.spec || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        propertyOptions: {
                          ...settings.propertyOptions,
                          card1: { ...settings.propertyOptions?.card1, spec: e.target.value },
                        },
                      })
                    }
                    style={inputStyle}
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Image URL</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={settings.propertyOptions?.card1?.image || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        propertyOptions: {
                          ...settings.propertyOptions,
                          card1: { ...settings.propertyOptions?.card1, image: e.target.value },
                        },
                      })
                    }
                    style={inputStyle}
                  />
                  {settings.propertyOptions?.card1?.image && (
                    <img
                      src={settings.propertyOptions.card1.image}
                      alt="Card 1"
                      style={{ width: '85px', height: '55px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #C99A43' }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* CARD 2: VANAM VALLEY TOWNSHIP */}
            <div style={{ ...cardContainerStyle, borderColor: '#C99A43', backgroundColor: '#FDFCF9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span style={{ fontWeight: 700, color: '#064B3B', fontSize: '0.95rem' }}>Card 2: Vanam Valley Township</span>
                <span style={{ fontSize: '0.78rem', color: '#064B3B', fontWeight: 700, backgroundColor: '#E2F0EC', padding: '2px 8px', borderRadius: '4px' }}>
                  FEATURED CENTER CARD
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.85rem' }}>
                <div>
                  <label style={labelStyle}>Title</label>
                  <input
                    type="text"
                    value={settings.propertyOptions?.card2?.title || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        propertyOptions: {
                          ...settings.propertyOptions,
                          card2: { ...settings.propertyOptions?.card2, title: e.target.value },
                        },
                      })
                    }
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Subtitle</label>
                  <input
                    type="text"
                    value={settings.propertyOptions?.card2?.subtitle || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        propertyOptions: {
                          ...settings.propertyOptions,
                          card2: { ...settings.propertyOptions?.card2, subtitle: e.target.value },
                        },
                      })
                    }
                    style={inputStyle}
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Image URL</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={settings.propertyOptions?.card2?.image || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        propertyOptions: {
                          ...settings.propertyOptions,
                          card2: { ...settings.propertyOptions?.card2, image: e.target.value },
                        },
                      })
                    }
                    style={inputStyle}
                  />
                  {settings.propertyOptions?.card2?.image && (
                    <img
                      src={settings.propertyOptions.card2.image}
                      alt="Card 2"
                      style={{ width: '85px', height: '55px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #C99A43' }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* CARD 3: RESIDENTIAL PLOTS */}
            <div style={cardContainerStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span style={{ fontWeight: 700, color: '#064B3B', fontSize: '0.95rem' }}>Card 3: Residential Plots</span>
                <span style={{ fontSize: '0.78rem', color: '#B98938', fontWeight: 600 }}>RIGHT RECTANGULAR CARD</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.85rem' }}>
                <div>
                  <label style={labelStyle}>Title</label>
                  <input
                    type="text"
                    value={settings.propertyOptions?.card3?.title || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        propertyOptions: {
                          ...settings.propertyOptions,
                          card3: { ...settings.propertyOptions?.card3, title: e.target.value },
                        },
                      })
                    }
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Specification</label>
                  <input
                    type="text"
                    value={settings.propertyOptions?.card3?.spec || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        propertyOptions: {
                          ...settings.propertyOptions,
                          card3: { ...settings.propertyOptions?.card3, spec: e.target.value },
                        },
                      })
                    }
                    style={inputStyle}
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Image URL</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={settings.propertyOptions?.card3?.image || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        propertyOptions: {
                          ...settings.propertyOptions,
                          card3: { ...settings.propertyOptions?.card3, image: e.target.value },
                        },
                      })
                    }
                    style={inputStyle}
                  />
                  {settings.propertyOptions?.card3?.image && (
                    <img
                      src={settings.propertyOptions.card3.image}
                      alt="Card 3"
                      style={{ width: '85px', height: '55px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #C99A43' }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 3: SIGNATURE PROJECTS & 3D ISLAND
            ================================================================= */}
        {activeTab === 'signature' && (
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', color: '#064B3B', marginBottom: '0.5rem', fontWeight: 700 }}>
              Signature Projects & Phases (Viewport 3D Township Section)
            </h3>
            <p style={{ color: '#6A665E', fontSize: '0.88rem', marginBottom: '1.75rem' }}>
              Control the central 3D miniature island masterplan, Phase 1, Phase 2, Phase 3 information cards, and the 4 floating leaf metric cards.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Section Eyebrow</label>
                <input
                  type="text"
                  value={settings.signatureProjects?.eyebrow || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      signatureProjects: { ...settings.signatureProjects, eyebrow: e.target.value },
                    })
                  }
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Section Main Heading</label>
                <input
                  type="text"
                  value={settings.signatureProjects?.heading || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      signatureProjects: { ...settings.signatureProjects, heading: e.target.value },
                    })
                  }
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Section Subtitle</label>
              <textarea
                rows={2}
                value={settings.signatureProjects?.subtitle || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    signatureProjects: { ...settings.signatureProjects, subtitle: e.target.value },
                  })
                }
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <div style={{ ...cardContainerStyle, borderColor: '#C99A43' }}>
              <label style={labelStyle}>Center 3D Miniature Township Island Image URL</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input
                  type="text"
                  value={settings.signatureProjects?.islandImage || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      signatureProjects: { ...settings.signatureProjects, islandImage: e.target.value },
                    })
                  }
                  style={inputStyle}
                />
                {settings.signatureProjects?.islandImage && (
                  <img
                    src={settings.signatureProjects.islandImage}
                    alt="3D Island"
                    style={{ width: '90px', height: '60px', objectFit: 'contain', backgroundColor: '#00261E', borderRadius: '6px', border: '1px solid #C99A43' }}
                  />
                )}
              </div>
            </div>

            <h4 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.15rem', color: '#064B3B', margin: '1.75rem 0 1rem', fontWeight: 600 }}>
              The 3 Interactive Timeline Phases:
            </h4>

            {/* PHASE 1 */}
            <div style={cardContainerStyle}>
              <span style={{ fontWeight: 700, color: '#064B3B', display: 'block', marginBottom: '0.75rem' }}>
                Phase 01 – Plotted Enclave
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.85rem' }}>
                <div>
                  <label style={labelStyle}>Title</label>
                  <input
                    type="text"
                    value={settings.signatureProjects?.phase1?.title || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        signatureProjects: {
                          ...settings.signatureProjects,
                          phase1: { ...settings.signatureProjects?.phase1, title: e.target.value },
                        },
                      })
                    }
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Spec Tag</label>
                  <input
                    type="text"
                    value={settings.signatureProjects?.phase1?.spec || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        signatureProjects: {
                          ...settings.signatureProjects,
                          phase1: { ...settings.signatureProjects?.phase1, spec: e.target.value },
                        },
                      })
                    }
                    style={inputStyle}
                  />
                </div>
              </div>
              <div style={{ marginBottom: '0.85rem' }}>
                <label style={labelStyle}>Description</label>
                <textarea
                  rows={2}
                  value={settings.signatureProjects?.phase1?.description || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      signatureProjects: {
                        ...settings.signatureProjects,
                        phase1: { ...settings.signatureProjects?.phase1, description: e.target.value },
                      },
                    })
                  }
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
              <div>
                <label style={labelStyle}>Phase 1 Photo URL</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={settings.signatureProjects?.phase1?.image || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        signatureProjects: {
                          ...settings.signatureProjects,
                          phase1: { ...settings.signatureProjects?.phase1, image: e.target.value },
                        },
                      })
                    }
                    style={inputStyle}
                  />
                  {settings.signatureProjects?.phase1?.image && (
                    <img
                      src={settings.signatureProjects.phase1.image}
                      alt="Phase 1"
                      style={{ width: '85px', height: '55px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #C99A43' }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* PHASE 2 */}
            <div style={cardContainerStyle}>
              <span style={{ fontWeight: 700, color: '#064B3B', display: 'block', marginBottom: '0.75rem' }}>
                Phase 02 – Forest Villas
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.85rem' }}>
                <div>
                  <label style={labelStyle}>Title</label>
                  <input
                    type="text"
                    value={settings.signatureProjects?.phase2?.title || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        signatureProjects: {
                          ...settings.signatureProjects,
                          phase2: { ...settings.signatureProjects?.phase2, title: e.target.value },
                        },
                      })
                    }
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Spec Tag</label>
                  <input
                    type="text"
                    value={settings.signatureProjects?.phase2?.spec || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        signatureProjects: {
                          ...settings.signatureProjects,
                          phase2: { ...settings.signatureProjects?.phase2, spec: e.target.value },
                        },
                      })
                    }
                    style={inputStyle}
                  />
                </div>
              </div>
              <div style={{ marginBottom: '0.85rem' }}>
                <label style={labelStyle}>Description</label>
                <textarea
                  rows={2}
                  value={settings.signatureProjects?.phase2?.description || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      signatureProjects: {
                        ...settings.signatureProjects,
                        phase2: { ...settings.signatureProjects?.phase2, description: e.target.value },
                      },
                    })
                  }
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
              <div>
                <label style={labelStyle}>Phase 2 Photo URL</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={settings.signatureProjects?.phase2?.image || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        signatureProjects: {
                          ...settings.signatureProjects,
                          phase2: { ...settings.signatureProjects?.phase2, image: e.target.value },
                        },
                      })
                    }
                    style={inputStyle}
                  />
                  {settings.signatureProjects?.phase2?.image && (
                    <img
                      src={settings.signatureProjects.phase2.image}
                      alt="Phase 2"
                      style={{ width: '85px', height: '55px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #C99A43' }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* PHASE 3 */}
            <div style={cardContainerStyle}>
              <span style={{ fontWeight: 700, color: '#064B3B', display: 'block', marginBottom: '0.75rem' }}>
                Phase 03 – Resort Clubhouse
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.85rem' }}>
                <div>
                  <label style={labelStyle}>Title</label>
                  <input
                    type="text"
                    value={settings.signatureProjects?.phase3?.title || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        signatureProjects: {
                          ...settings.signatureProjects,
                          phase3: { ...settings.signatureProjects?.phase3, title: e.target.value },
                        },
                      })
                    }
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Spec Tag</label>
                  <input
                    type="text"
                    value={settings.signatureProjects?.phase3?.spec || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        signatureProjects: {
                          ...settings.signatureProjects,
                          phase3: { ...settings.signatureProjects?.phase3, spec: e.target.value },
                        },
                      })
                    }
                    style={inputStyle}
                  />
                </div>
              </div>
              <div style={{ marginBottom: '0.85rem' }}>
                <label style={labelStyle}>Description</label>
                <textarea
                  rows={2}
                  value={settings.signatureProjects?.phase3?.description || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      signatureProjects: {
                        ...settings.signatureProjects,
                        phase3: { ...settings.signatureProjects?.phase3, description: e.target.value },
                      },
                    })
                  }
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
              <div>
                <label style={labelStyle}>Phase 3 Photo URL</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={settings.signatureProjects?.phase3?.image || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        signatureProjects: {
                          ...settings.signatureProjects,
                          phase3: { ...settings.signatureProjects?.phase3, image: e.target.value },
                        },
                      })
                    }
                    style={inputStyle}
                  />
                  {settings.signatureProjects?.phase3?.image && (
                    <img
                      src={settings.signatureProjects.phase3.image}
                      alt="Phase 3"
                      style={{ width: '85px', height: '55px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #C99A43' }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* 4 FLOATING LEAF METRICS */}
            <h4 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.15rem', color: '#064B3B', margin: '1.75rem 0 1rem', fontWeight: 600 }}>
              The 4 Unique Floating Leaf Metrics:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
              {/* Leaf 1 */}
              <div style={cardContainerStyle}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#C99A43', display: 'block', marginBottom: '0.5rem' }}>
                  Leaf 1 (Acres)
                </span>
                <input
                  type="text"
                  placeholder="27 Acres"
                  value={settings.signatureProjects?.leaf1?.value || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      signatureProjects: {
                        ...settings.signatureProjects,
                        leaf1: { ...settings.signatureProjects?.leaf1, value: e.target.value },
                      },
                    })
                  }
                  style={{ ...inputStyle, marginBottom: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="Master Forest Territory"
                  value={settings.signatureProjects?.leaf1?.label || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      signatureProjects: {
                        ...settings.signatureProjects,
                        leaf1: { ...settings.signatureProjects?.leaf1, label: e.target.value },
                      },
                    })
                  }
                  style={inputStyle}
                />
              </div>

              {/* Leaf 2 */}
              <div style={cardContainerStyle}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#C99A43', display: 'block', marginBottom: '0.5rem' }}>
                  Leaf 2 (Units)
                </span>
                <input
                  type="text"
                  placeholder="129 Units"
                  value={settings.signatureProjects?.leaf2?.value || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      signatureProjects: {
                        ...settings.signatureProjects,
                        leaf2: { ...settings.signatureProjects?.leaf2, value: e.target.value },
                      },
                    })
                  }
                  style={{ ...inputStyle, marginBottom: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="3 BHK Duplex Residences"
                  value={settings.signatureProjects?.leaf2?.label || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      signatureProjects: {
                        ...settings.signatureProjects,
                        leaf2: { ...settings.signatureProjects?.leaf2, label: e.target.value },
                      },
                    })
                  }
                  style={inputStyle}
                />
              </div>

              {/* Leaf 3 */}
              <div style={cardContainerStyle}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#C99A43', display: 'block', marginBottom: '0.5rem' }}>
                  Leaf 3 (Clubhouse)
                </span>
                <input
                  type="text"
                  placeholder="15,000 Sq.Ft."
                  value={settings.signatureProjects?.leaf3?.value || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      signatureProjects: {
                        ...settings.signatureProjects,
                        leaf3: { ...settings.signatureProjects?.leaf3, value: e.target.value },
                      },
                    })
                  }
                  style={{ ...inputStyle, marginBottom: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="Canopy Resort Clubhouse"
                  value={settings.signatureProjects?.leaf3?.label || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      signatureProjects: {
                        ...settings.signatureProjects,
                        leaf3: { ...settings.signatureProjects?.leaf3, label: e.target.value },
                      },
                    })
                  }
                  style={inputStyle}
                />
              </div>

              {/* Leaf 4 */}
              <div style={cardContainerStyle}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#C99A43', display: 'block', marginBottom: '0.5rem' }}>
                  Leaf 4 (Registry)
                </span>
                <input
                  type="text"
                  placeholder="100% Freehold"
                  value={settings.signatureProjects?.leaf4?.value || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      signatureProjects: {
                        ...settings.signatureProjects,
                        leaf4: { ...settings.signatureProjects?.leaf4, value: e.target.value },
                      },
                    })
                  }
                  style={{ ...inputStyle, marginBottom: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="Registry-Ready Clear Titles"
                  value={settings.signatureProjects?.leaf4?.label || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      signatureProjects: {
                        ...settings.signatureProjects,
                        leaf4: { ...settings.signatureProjects?.leaf4, label: e.target.value },
                      },
                    })
                  }
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 4: CURATED AMENITIES & CLUB
            ================================================================= */}
        {activeTab === 'amenities' && (
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', color: '#064B3B', marginBottom: '0.5rem', fontWeight: 700 }}>
              Curated Amenities & Clubhouse Showcase
            </h3>
            <p style={{ color: '#6A665E', fontSize: '0.88rem', marginBottom: '1.75rem' }}>
              Manage the luxury Clubhouse banner photograph, section headlines, and the 3 signature preview cards.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Section Eyebrow</label>
                <input
                  type="text"
                  value={settings.curatedAmenities?.eyebrow || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      curatedAmenities: { ...settings.curatedAmenities, eyebrow: e.target.value },
                    })
                  }
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Section Heading</label>
                <input
                  type="text"
                  value={settings.curatedAmenities?.heading || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      curatedAmenities: { ...settings.curatedAmenities, heading: e.target.value },
                    })
                  }
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Section Subtitle</label>
              <textarea
                rows={2}
                value={settings.curatedAmenities?.subtitle || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    curatedAmenities: { ...settings.curatedAmenities, subtitle: e.target.value },
                  })
                }
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            {/* Clubhouse Resort Image */}
            <div style={{ ...cardContainerStyle, borderColor: '#C99A43', marginBottom: '2rem' }}>
              <ImageFieldEditor
                label="Grand Canopy Clubhouse & Infinity Pool Banner Image"
                value={settings.curatedAmenities?.clubhouseImage || '/amenities_clubhouse_hero_hd.jpg'}
                onChange={(url) =>
                  setSettings({
                    ...settings,
                    curatedAmenities: { ...settings.curatedAmenities, clubhouseImage: url },
                  })
                }
                defaultUrl="/amenities_clubhouse_hero_hd.jpg"
                hint="Large oval landscape photo shown in the hero split of the Curated Amenities section"
              />
            </div>

            {/* 3 Featured Amenity Cards */}
            <h4 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.15rem', color: '#064B3B', margin: '1.75rem 0 1rem', fontWeight: 600 }}>
              The 3 Featured Amenity Cards:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              {/* Card 1 */}
              <div style={cardContainerStyle}>
                <span style={{ fontWeight: 700, color: '#064B3B', display: 'block', marginBottom: '0.6rem' }}>Card 1: Dining</span>
                <div style={{ marginBottom: '0.8rem' }}>
                  <label style={labelStyle}>Title</label>
                  <input
                    type="text"
                    value={settings.curatedAmenities?.card1?.title || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        curatedAmenities: {
                          ...settings.curatedAmenities,
                          card1: { ...settings.curatedAmenities?.card1, title: e.target.value },
                        },
                      })
                    }
                    style={inputStyle}
                  />
                </div>
                <ImageFieldEditor
                  label="Card 1 Photo"
                  value={settings.curatedAmenities?.card1?.image || '/amenities_card1_dining_hd.jpg'}
                  onChange={(url) =>
                    setSettings({
                      ...settings,
                      curatedAmenities: {
                        ...settings.curatedAmenities,
                        card1: { ...settings.curatedAmenities?.card1, image: url },
                      },
                    })
                  }
                  defaultUrl="/amenities_card1_dining_hd.jpg"
                />
              </div>

              {/* Card 2 */}
              <div style={cardContainerStyle}>
                <span style={{ fontWeight: 700, color: '#064B3B', display: 'block', marginBottom: '0.6rem' }}>Card 2: Pool</span>
                <div style={{ marginBottom: '0.8rem' }}>
                  <label style={labelStyle}>Title</label>
                  <input
                    type="text"
                    value={settings.curatedAmenities?.card2?.title || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        curatedAmenities: {
                          ...settings.curatedAmenities,
                          card2: { ...settings.curatedAmenities?.card2, title: e.target.value },
                        },
                      })
                    }
                    style={inputStyle}
                  />
                </div>
                <ImageFieldEditor
                  label="Card 2 Photo"
                  value={settings.curatedAmenities?.card2?.image || '/amenities_card2_pool_hd.jpg'}
                  onChange={(url) =>
                    setSettings({
                      ...settings,
                      curatedAmenities: {
                        ...settings.curatedAmenities,
                        card2: { ...settings.curatedAmenities?.card2, image: url },
                      },
                    })
                  }
                  defaultUrl="/amenities_card2_pool_hd.jpg"
                />
              </div>

              {/* Card 3 */}
              <div style={cardContainerStyle}>
                <span style={{ fontWeight: 700, color: '#064B3B', display: 'block', marginBottom: '0.6rem' }}>Card 3: Spa</span>
                <div style={{ marginBottom: '0.8rem' }}>
                  <label style={labelStyle}>Title</label>
                  <input
                    type="text"
                    value={settings.curatedAmenities?.card3?.title || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        curatedAmenities: {
                          ...settings.curatedAmenities,
                          card3: { ...settings.curatedAmenities?.card3, title: e.target.value },
                        },
                      })
                    }
                    style={inputStyle}
                  />
                </div>
                <ImageFieldEditor
                  label="Card 3 Photo"
                  value={settings.curatedAmenities?.card3?.image || '/amenities_card3_spa_hd.jpg'}
                  onChange={(url) =>
                    setSettings({
                      ...settings,
                      curatedAmenities: {
                        ...settings.curatedAmenities,
                        card3: { ...settings.curatedAmenities?.card3, image: url },
                      },
                    })
                  }
                  defaultUrl="/amenities_card3_spa_hd.jpg"
                />
              </div>

              {/* Sports, Events, Infra & Yoga Additional Images */}
              <div style={{ marginTop: '1.5rem', borderTop: '1px dashed #D8AE61', paddingTop: '1.25rem' }}>
                <div style={{ fontWeight: 700, color: '#064B3B', marginBottom: '0.75rem', fontSize: '0.96rem' }}>
                  Additional Amenity Category Photos (Sports, Banquets, Infrastructure & Wellness)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  <ImageFieldEditor
                    label="Executive Mini Golf Turf"
                    value={settings.curatedAmenities?.golfImage || '/amenities/clubhouse_resort.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, golfImage: url } })}
                    defaultUrl="/amenities/clubhouse_resort.jpg"
                  />
                  <ImageFieldEditor
                    label="Multi-Sport Courts (Badminton, Basketball)"
                    value={settings.curatedAmenities?.sportsCourtImage || '/amenities/pool_card.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, sportsCourtImage: url } })}
                    defaultUrl="/amenities/pool_card.jpg"
                  />
                  <ImageFieldEditor
                    label="Forest Jogging & Cycling Track"
                    value={settings.curatedAmenities?.joggingTrackImage || '/amenities/dining_card.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, joggingTrackImage: url } })}
                    defaultUrl="/amenities/dining_card.jpg"
                  />
                  <ImageFieldEditor
                    label="Grand Wedding & Celebration Lawn"
                    value={settings.curatedAmenities?.weddingLawnImage || '/amenities/clubhouse_resort.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, weddingLawnImage: url } })}
                    defaultUrl="/amenities/clubhouse_resort.jpg"
                  />
                  <ImageFieldEditor
                    label="Air-Conditioned Banquet Hall"
                    value={settings.curatedAmenities?.banquetHallImage || '/amenities/dining_card.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, banquetHallImage: url } })}
                    defaultUrl="/amenities/dining_card.jpg"
                  />
                  <ImageFieldEditor
                    label="Forest Amphitheatre"
                    value={settings.curatedAmenities?.amphitheatreImage || '/amenities/spa_card.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, amphitheatreImage: url } })}
                    defaultUrl="/amenities/spa_card.jpg"
                  />
                  <ImageFieldEditor
                    label="Wide Concrete Roads & Boulevards"
                    value={settings.curatedAmenities?.roadsImage || '/amenities/clubhouse_resort.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, roadsImage: url } })}
                    defaultUrl="/amenities/clubhouse_resort.jpg"
                  />
                  <ImageFieldEditor
                    label="Underground Drainage & Eco Utilities"
                    value={settings.curatedAmenities?.drainageImage || '/amenities/pool_card.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, drainageImage: url } })}
                    defaultUrl="/amenities/pool_card.jpg"
                  />
                  <ImageFieldEditor
                    label="Multi-Tier Gated Security Gatehouse"
                    value={settings.curatedAmenities?.securityImage || '/amenities/dining_card.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, securityImage: url } })}
                    defaultUrl="/amenities/dining_card.jpg"
                  />
                  <ImageFieldEditor
                    label="Yoga & Peace Pavilion Deck"
                    value={settings.curatedAmenities?.yogaImage || '/amenities_card3_spa_hd.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, yogaImage: url } })}
                    defaultUrl="/amenities_card3_spa_hd.jpg"
                  />
                  <ImageFieldEditor
                    label="Sunset Timber Lounge Deck"
                    value={settings.curatedAmenities?.clubLoungeImage || '/amenities/clubhouse_resort.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, clubLoungeImage: url } })}
                    defaultUrl="/amenities/clubhouse_resort.jpg"
                  />
                  <ImageFieldEditor
                    label="Private Dining Suites"
                    value={settings.curatedAmenities?.clubPrivateDiningImage || '/amenities/dining_card.jpg'}
                    onChange={(url) => setSettings({ ...settings, curatedAmenities: { ...settings.curatedAmenities, clubPrivateDiningImage: url } })}
                    defaultUrl="/amenities/dining_card.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 5: LOCATIONS & CONNECTIVITY
            ================================================================= */}
        {activeTab === 'locations' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', color: '#064B3B', margin: 0, fontWeight: 700 }}>
                  Strategic Locations & Regional Connectivity ({settings.locationHighlights.length})
                </h3>
                <p style={{ color: '#6A665E', fontSize: '0.88rem', margin: '0.25rem 0 0' }}>
                  Add or edit destination landmarks, drive times, and scenic excursions.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const updated = [
                    ...settings.locationHighlights,
                    { name: 'New Destination', distance: '10 Km / 15 Mins', description: 'Scenic connectivity' },
                  ];
                  setSettings({ ...settings, locationHighlights: updated });
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  backgroundColor: '#064B3B',
                  color: '#FFFFFF',
                  borderRadius: '6px',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                <Plus size={16} />
                <span>Add Destination</span>
              </button>
            </div>

            {/* Central Highway Arch Portal Image Editor */}
            <div style={{ ...cardContainerStyle, marginBottom: '2rem', border: '1.5px solid #C99A43' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '1.2rem' }}>🛣️</span>
                <h4 style={{ margin: 0, color: '#064B3B', fontSize: '1.05rem', fontWeight: 700 }}>
                  Central Highway Image (Strategic Connectivity & Highways Section)
                </h4>
              </div>
              <p style={{ color: '#6A665E', fontSize: '0.84rem', margin: '0 0 1rem' }}>
                This is the central highway photograph displayed inside the golden circular portal in the Strategic Connectivity section.
              </p>
              <ImageFieldEditor
                label="Central Highway Portal Image"
                value={settings.connectivityHighwayImage || '/connectivity_highway_pristine.jpg'}
                onChange={(url) => setSettings({ ...settings, connectivityHighwayImage: url })}
                defaultUrl="/connectivity_highway_pristine.jpg"
                hint="Raw pristine landscape road without any overlaid cards"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {settings.locationHighlights.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr 2fr auto',
                    gap: '12px',
                    alignItems: 'center',
                    padding: '14px',
                    backgroundColor: '#F8F6F0',
                    borderRadius: '8px',
                    border: '1px solid #E8E5DE',
                  }}
                >
                  <div>
                    <label style={{ ...labelStyle, fontSize: '0.72rem' }}>Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Wainganga Bypass"
                      value={item.name}
                      onChange={(e) => {
                        const updated = [...settings.locationHighlights];
                        updated[idx].name = e.target.value;
                        setSettings({ ...settings, locationHighlights: updated });
                      }}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ ...labelStyle, fontSize: '0.72rem' }}>Distance / Time</label>
                    <input
                      type="text"
                      placeholder="07 Km / 10 Mins"
                      value={item.distance}
                      onChange={(e) => {
                        const updated = [...settings.locationHighlights];
                        updated[idx].distance = e.target.value;
                        setSettings({ ...settings, locationHighlights: updated });
                      }}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ ...labelStyle, fontSize: '0.72rem' }}>Description</label>
                    <input
                      type="text"
                      placeholder="High-speed regional connectivity"
                      value={item.description}
                      onChange={(e) => {
                        const updated = [...settings.locationHighlights];
                        updated[idx].description = e.target.value;
                        setSettings({ ...settings, locationHighlights: updated });
                      }}
                      style={inputStyle}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const updated = settings.locationHighlights.filter((_, i) => i !== idx);
                      setSettings({ ...settings, locationHighlights: updated });
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#C4392F',
                      cursor: 'pointer',
                      padding: '8px',
                    }}
                    title="Remove Destination"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 6: ABOUT PROJECT & VISION
            ================================================================= */}
        {activeTab === 'about' && (
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', color: '#064B3B', marginBottom: '1.5rem', fontWeight: 700 }}>
              About Vanam Valley & Developer Heritage
            </h3>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Section Title</label>
              <input
                type="text"
                value={settings.about.title}
                onChange={(e) => setSettings({ ...settings, about: { ...settings.about, title: e.target.value } })}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Detailed Project Description</label>
              <textarea
                rows={5}
                value={settings.about.description}
                onChange={(e) => setSettings({ ...settings, about: { ...settings.about, description: e.target.value } })}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Master Plan Vision Statement</label>
              <textarea
                rows={3}
                value={settings.about.vision || ''}
                onChange={(e) => setSettings({ ...settings, about: { ...settings.about, vision: e.target.value } })}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <div style={{ marginTop: '2rem', borderTop: '1px solid #E2DDD3', paddingTop: '1.5rem' }}>
              <h4 style={{ margin: '0 0 1rem', color: '#064B3B', fontSize: '1.15rem', fontWeight: 700 }}>
                🖼️ About Us Imagery
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <ImageFieldEditor
                  label="Grand Entrance Gate Photo"
                  value={settings.about?.entranceImage || '/about_gate_exact.jpg'}
                  onChange={(url) =>
                    setSettings({
                      ...settings,
                      about: { ...settings.about, entranceImage: url },
                    })
                  }
                  defaultUrl="/about_gate_exact.jpg"
                  hint="Framed gold photo of the stone pillar & entrance gate in About Us"
                />
                <ImageFieldEditor
                  label="About Hero Villa Sunset Photo"
                  value={settings.about?.heroImage || '/about_hero_villa.jpg'}
                  onChange={(url) =>
                    setSettings({
                      ...settings,
                      about: { ...settings.about, heroImage: url },
                    })
                  }
                  defaultUrl="/about_hero_villa.jpg"
                  hint="Panoramic duplex villa with mountain sunset shown in About Us hero"
                />
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 7: NAVBAR, CONTACT & SOCIAL
            ================================================================= */}
        {activeTab === 'contact' && (
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', color: '#064B3B', marginBottom: '1.5rem', fontWeight: 700 }}>
              Navbar Phone, Official Contact & Social Handles
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Navbar Calling Phone Number</label>
                <input
                  type="text"
                  value={settings.navbar.phone || settings.contact.phone}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      navbar: { ...settings.navbar, phone: e.target.value },
                      contact: { ...settings.contact, phone: e.target.value },
                    })
                  }
                  style={inputStyle}
                  placeholder="+91 93716 91365"
                />
              </div>

              <div>
                <label style={labelStyle}>Official Email Address</label>
                <input
                  type="email"
                  value={settings.contact.email}
                  onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, email: e.target.value } })}
                  style={inputStyle}
                  placeholder="info@vanamvalley.com"
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Physical Experience Center Address</label>
              <textarea
                rows={2}
                value={settings.contact.address}
                onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, address: e.target.value } })}
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="Vanam Valley, Garra-Lalburra Road, Balaghat, Madhya Pradesh"
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Google Maps Embed URL</label>
              <input
                type="text"
                value={settings.contact.mapEmbedUrl || ''}
                onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, mapEmbedUrl: e.target.value } })}
                style={inputStyle}
                placeholder="https://www.google.com/maps/embed?..."
              />
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 8: SEO & BRAND LOGO
            ================================================================= */}
        {activeTab === 'seo' && (
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', color: '#064B3B', marginBottom: '1.5rem', fontWeight: 700 }}>
              Brand Identity Logo & Search Engine Optimization (SEO)
            </h3>

            <div style={cardContainerStyle}>
              <label style={labelStyle}>Official Site Logo Image URL</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input
                  type="text"
                  value={settings.logo?.url || ''}
                  onChange={(e) => setSettings({ ...settings, logo: { ...settings.logo, url: e.target.value } })}
                  style={inputStyle}
                  placeholder="/logo.png or https://..."
                />
                {settings.logo?.url && (
                  <img
                    src={settings.logo.url}
                    alt="Logo"
                    style={{ width: '80px', height: '40px', objectFit: 'contain', borderRadius: '4px', border: '1px solid #C99A43', backgroundColor: '#F8F6F0' }}
                  />
                )}
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Browser Tab & SEO Meta Title</label>
              <input
                type="text"
                value={settings.seo?.siteTitle || ''}
                onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, siteTitle: e.target.value } })}
                style={inputStyle}
                placeholder="Vanam Valley — Luxury Forest Villas in Balaghat, MP"
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>SEO Meta Description</label>
              <textarea
                rows={3}
                value={settings.seo?.siteDescription || ''}
                onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, siteDescription: e.target.value } })}
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="Discover luxury forest villas and residential plots in Balaghat, Madhya Pradesh..."
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Footer Copyright Statement</label>
              <input
                type="text"
                value={settings.footer.copyright}
                onChange={(e) => setSettings({ ...settings, footer: { ...settings.footer, copyright: e.target.value } })}
                style={inputStyle}
                placeholder="© 2026 Vanam Valley. All rights reserved."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
