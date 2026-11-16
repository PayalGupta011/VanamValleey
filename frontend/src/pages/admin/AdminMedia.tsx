import React, { useState, useEffect } from 'react';
import {
  Upload,
  Copy,
  Check,
  Trash2,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { api } from '../../services/api';
import type { MediaItem } from '../../types';
import { LoadingSpinner, EmptyState } from '../../components/shared/StateStates';

export const AdminMedia: React.FC = () => {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Upload state
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState('villas');
  const [altText, setAltText] = useState('');
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Copy URL state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchMedia = async () => {
    setLoading(true);
    const params: any = { limit: 100 };
    if (categoryFilter !== 'all') params.category = categoryFilter;
    const res = await api.adminGetMedia(params);
    setMediaList(res.media);
    setLoading(false);
  };

  useEffect(() => {
    fetchMedia();
  }, [categoryFilter]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setFeedback({ type: 'error', message: 'Please select an image file to upload.' });
      return;
    }

    setUploading(true);
    setFeedback(null);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', category);
    formData.append('alt', altText);

    const res = await api.adminUploadMedia(formData);
    setUploading(false);

    if (res.success && res.media) {
      setFeedback({ type: 'success', message: 'Image successfully uploaded to Cloudinary!' });
      setFile(null);
      setAltText('');
      fetchMedia();
    } else {
      setFeedback({
        type: 'error',
        message:
          res.message ||
          'Upload failed. Please ensure Cloudinary credentials are configured in backend/.env',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this image from Cloudinary and database?')) return;
    const res = await api.adminDeleteMedia(id);
    if (res.success) {
      setMediaList(mediaList.filter((m) => m._id !== id));
    } else {
      alert(res.message || 'Failed to delete image');
    }
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      {/* Page Title */}
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '2.4rem',
            color: '#004B3C',
            margin: '0 0 0.25rem',
            fontWeight: 600,
          }}
        >
          Cloudinary Media Library
        </h1>
        <p style={{ color: '#7A756C', fontSize: '0.92rem', margin: 0 }}>
          Upload high-resolution photography, organize by category, and copy asset URLs for residences.
        </p>
      </div>

      {feedback && (
        <div
          style={{
            padding: '1rem 1.25rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: feedback.type === 'success' ? '#DEF7EC' : '#FDF2F2',
            color: feedback.type === 'success' ? '#03543F' : '#9B1C1C',
            border: feedback.type === 'success' ? '1px solid #BCF0DA' : '1px solid #F8B4B4',
          }}
        >
          {feedback.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{feedback.message}</span>
        </div>
      )}

      {/* Upload Box */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E8E5DE',
          padding: '1.75rem',
          marginBottom: '2rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        }}
      >
        <h3
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.5rem',
            color: '#004B3C',
            margin: '0 0 1rem',
          }}
        >
          Upload New Image
        </h3>

        <form onSubmit={handleUpload}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              alignItems: 'flex-end',
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#3E3A34', marginBottom: '0.35rem' }}>
                Select File (JPEG, PNG, WebP)
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/svg+xml"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                style={{ fontSize: '0.88rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#3E3A34', marginBottom: '0.35rem' }}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%', padding: '0.65rem', border: '1px solid #D1CDC4', borderRadius: '6px', backgroundColor: '#FFFFFF' }}
              >
                <option value="villas">Villas</option>
                <option value="architecture">Architecture</option>
                <option value="interiors">Interiors</option>
                <option value="landscapes">Landscapes</option>
                <option value="amenities">Amenities</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="hero">Hero Banners</option>
                <option value="gallery">Gallery</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#3E3A34', marginBottom: '0.35rem' }}>
                Alt Description
              </label>
              <input
                type="text"
                placeholder="e.g. Master villa terrace view"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                style={{ width: '100%', padding: '0.65rem', border: '1px solid #D1CDC4', borderRadius: '6px', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={uploading || !file}
                style={{
                  width: '100%',
                  padding: '0.75rem 1.25rem',
                  backgroundColor: '#004B3C',
                  color: '#FFFFFF',
                  borderRadius: '6px',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: uploading || !file ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  opacity: uploading || !file ? 0.6 : 1,
                }}
              >
                <Upload size={16} />
                <span>{uploading ? 'Uploading...' : 'Upload Asset'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Category Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '1.5rem',
        }}
      >
        {[
          { label: 'All Media', val: 'all' },
          { label: 'Villas', val: 'villas' },
          { label: 'Architecture', val: 'architecture' },
          { label: 'Interiors', val: 'interiors' },
          { label: 'Landscapes', val: 'landscapes' },
          { label: 'Amenities', val: 'amenities' },
          { label: 'Lifestyle', val: 'lifestyle' },
        ].map((tab) => (
          <button
            key={tab.val}
            type="button"
            onClick={() => setCategoryFilter(tab.val)}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: categoryFilter === tab.val ? '#004B3C' : '#FFFFFF',
              color: categoryFilter === tab.val ? '#F8F6F0' : '#5C574F',
              boxShadow: categoryFilter === tab.val ? '0 2px 8px rgba(0,75,60,0.2)' : '0 1px 3px rgba(0,0,0,0.05)',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      {loading ? (
        <LoadingSpinner message="Loading image assets..." />
      ) : mediaList.length === 0 ? (
        <EmptyState
          title="No uploaded images in this category"
          description="Upload images above to store them on Cloudinary and obtain high-speed CDN URLs."
        />
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {mediaList.map((item) => (
            <div
              key={item._id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #E8E5DE',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ height: '150px', backgroundColor: '#F8F6F0', overflow: 'hidden' }}>
                <img
                  src={item.url}
                  alt={item.alt || ''}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ padding: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      backgroundColor: '#F8F6F0',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      color: '#004B3C',
                    }}
                  >
                    {item.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(item._id)}
                    style={{ background: 'none', border: 'none', color: '#C4392F', cursor: 'pointer', padding: '2px' }}
                    title="Delete Image"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyUrl(item._id, item.url)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '6px',
                    backgroundColor: copiedId === item._id ? '#DEF7EC' : '#F8F6F0',
                    border: '1px solid #E8E5DE',
                    borderRadius: '4px',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    color: copiedId === item._id ? '#03543F' : '#004B3C',
                    cursor: 'pointer',
                  }}
                >
                  {copiedId === item._id ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedId === item._id ? 'Copied URL!' : 'Copy CDN URL'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
