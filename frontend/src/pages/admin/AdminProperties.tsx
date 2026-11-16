import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  X,
  Search,
  ExternalLink,
} from 'lucide-react';
import { api } from '../../services/api';
import type { Property } from '../../types';
import { LoadingSpinner, EmptyState } from '../../components/shared/StateStates';

export const AdminProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Delete State
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    title: '',
    propertyType: 'villa' as 'villa' | 'plot' | 'apartment',
    configuration: '',
    plotAreaValue: 2400,
    plotAreaUnit: 'sq ft',
    builtUpAreaValue: 1800,
    builtUpAreaUnit: 'sq ft',
    price: 0,
    priceDisplay: 'Price on Request',
    locationArea: 'Balaghat Woodlands',
    locationCity: 'Balaghat',
    locationState: 'Madhya Pradesh',
    status: 'available' as 'available' | 'sold' | 'upcoming' | 'unavailable',
    isPublished: true,
    featured: false,
    imageUrl: '',
    description: '',
    amenities: '',
    highlights: '',
  });

  const fetchProperties = async () => {
    setLoading(true);
    const res = await api.adminGetProperties({ limit: 100 });
    setProperties(res.properties);
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const openCreateModal = () => {
    setEditingProperty(null);
    setFormData({
      title: '',
      propertyType: 'villa',
      configuration: '3 BHK Luxury Villa',
      plotAreaValue: 2400,
      plotAreaUnit: 'sq ft',
      builtUpAreaValue: 1800,
      builtUpAreaUnit: 'sq ft',
      price: 0,
      priceDisplay: 'Price on Request',
      locationArea: 'Woodland Enclave',
      locationCity: 'Balaghat',
      locationState: 'Madhya Pradesh',
      status: 'available',
      isPublished: true,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      description: 'Exclusive luxury forest residence designed in harmony with native woodlands.',
      amenities: 'Private Sundeck, Infinity Pool Access, Forest Views, Covered Parking',
      highlights: '129 Master Villas Community, Vastu Compliant, Clear Freehold Title',
    });
    setFormError('');
    setFormSuccess('');
    setModalOpen(true);
  };

  const openEditModal = (prop: Property) => {
    setEditingProperty(prop);
    setFormData({
      title: prop.title,
      propertyType: prop.propertyType,
      configuration: prop.configuration || '',
      plotAreaValue: prop.plotArea?.value || 0,
      plotAreaUnit: prop.plotArea?.unit || 'sq ft',
      builtUpAreaValue: prop.builtUpArea?.value || 0,
      builtUpAreaUnit: prop.builtUpArea?.unit || 'sq ft',
      price: prop.price || 0,
      priceDisplay: prop.priceDisplay || 'Price on Request',
      locationArea: prop.location?.area || '',
      locationCity: prop.location?.city || 'Balaghat',
      locationState: prop.location?.state || 'Madhya Pradesh',
      status: prop.status,
      isPublished: prop.isPublished,
      featured: prop.featured || false,
      imageUrl: prop.images?.[0]?.url || '',
      description: prop.description || '',
      amenities: prop.amenities?.join(', ') || '',
      highlights: prop.highlights?.join(', ') || '',
    });
    setFormError('');
    setFormSuccess('');
    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!formData.title.trim()) {
      setFormError('Property title is required');
      return;
    }

    setFormLoading(true);

    const payload: Partial<Property> = {
      title: formData.title,
      propertyType: formData.propertyType,
      configuration: formData.configuration,
      plotArea: { value: Number(formData.plotAreaValue), unit: formData.plotAreaUnit },
      builtUpArea: { value: Number(formData.builtUpAreaValue), unit: formData.builtUpAreaUnit },
      price: Number(formData.price),
      priceDisplay: formData.priceDisplay,
      location: {
        area: formData.locationArea,
        city: formData.locationCity,
        state: formData.locationState,
      },
      status: formData.status,
      isPublished: formData.isPublished,
      featured: formData.featured,
      description: formData.description,
      images: formData.imageUrl
        ? [{ url: formData.imageUrl.trim(), isPrimary: true, alt: formData.title }]
        : [],
      amenities: formData.amenities
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      highlights: formData.highlights
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    let result;
    if (editingProperty) {
      result = await api.adminUpdateProperty(editingProperty._id, payload);
    } else {
      result = await api.adminCreateProperty(payload);
    }

    setFormLoading(false);

    if (result.success) {
      setFormSuccess(editingProperty ? 'Residence updated successfully' : 'Residence added successfully');
      fetchProperties();
      setTimeout(() => {
        setModalOpen(false);
      }, 1000);
    } else {
      setFormError(result.message || 'Error saving property');
    }
  };

  const handleTogglePublish = async (prop: Property) => {
    const updated = !prop.isPublished;
    const res = await api.adminUpdateProperty(prop._id, { isPublished: updated });
    if (res.success) {
      setProperties(
        properties.map((p) => (p._id === prop._id ? { ...p, isPublished: updated } : p))
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this property? This cannot be undone.')) {
      return;
    }
    setDeletingId(id);
    const res = await api.adminDeleteProperty(id);
    setDeletingId(null);
    if (res.success) {
      setProperties(properties.filter((p) => p._id !== id));
    } else {
      alert(res.message || 'Failed to delete property');
    }
  };

  const filteredProperties = properties.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.configuration?.toLowerCase().includes(q) ||
      p.propertyType.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '2.4rem',
              color: '#004B3C',
              margin: '0 0 0.25rem',
              fontWeight: 600,
            }}
          >
            Property Residences Management
          </h1>
          <p style={{ color: '#7A756C', fontSize: '0.92rem', margin: 0 }}>
            Create, edit, toggle visibility, and update specifications for all Vanam Valley homes.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            backgroundColor: '#004B3C',
            color: '#FFFFFF',
            borderRadius: '6px',
            border: 'none',
            fontSize: '0.88rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 75, 60, 0.2)',
          }}
        >
          <Plus size={18} />
          <span>Add New Residence</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          padding: '1rem 1.5rem',
          border: '1px solid #E8E5DE',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
          <Search
            size={16}
            color="#7A756C"
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            placeholder="Search by title, BHK, type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              border: '1px solid #D1CDC4',
              borderRadius: '6px',
              fontSize: '0.88rem',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ fontSize: '0.86rem', color: '#7A756C' }}>
          Total Units: <strong>{properties.length}</strong>
        </div>
      </div>

      {/* Properties Table */}
      {loading ? (
        <LoadingSpinner message="Loading residences list..." />
      ) : filteredProperties.length === 0 ? (
        <EmptyState
          title="No properties found"
          description="Click 'Add New Residence' to create your first forest villa or plot."
          action={
            <button
              type="button"
              onClick={openCreateModal}
              style={{
                padding: '8px 20px',
                backgroundColor: '#004B3C',
                color: '#FFFFFF',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Add Property Now
            </button>
          }
        />
      ) : (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E8E5DE',
            overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8F6F0', borderBottom: '1.5px solid #E8E5DE', color: '#5C574F', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '14px 16px' }}>Image & Title</th>
                  <th style={{ padding: '14px 16px' }}>Type / Config</th>
                  <th style={{ padding: '14px 16px' }}>Area</th>
                  <th style={{ padding: '14px 16px' }}>Pricing</th>
                  <th style={{ padding: '14px 16px' }}>Status</th>
                  <th style={{ padding: '14px 16px' }}>Visibility</th>
                  <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map((prop) => {
                  const imgUrl =
                    prop.images?.[0]?.url ||
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80';

                  return (
                    <tr key={prop._id} style={{ borderBottom: '1px solid #F0EEE9' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={imgUrl}
                            alt=""
                            style={{
                              width: '54px',
                              height: '40px',
                              borderRadius: '6px',
                              objectFit: 'cover',
                            }}
                          />
                          <div>
                            <strong style={{ color: '#004B3C', fontSize: '0.94rem', display: 'block' }}>
                              {prop.title}
                            </strong>
                            <span style={{ fontSize: '0.78rem', color: '#7A756C' }}>
                              /{prop.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '14px 16px', color: '#3E3A34' }}>
                        <span
                          style={{
                            padding: '2px 8px',
                            backgroundColor: '#F8F6F0',
                            border: '1px solid #E8E5DE',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            color: '#004B3C',
                          }}
                        >
                          {prop.propertyType}
                        </span>
                        <div style={{ fontSize: '0.82rem', color: '#5C574F', marginTop: '4px' }}>
                          {prop.configuration}
                        </div>
                      </td>

                      <td style={{ padding: '14px 16px', color: '#5C574F', fontSize: '0.85rem' }}>
                        {prop.plotArea?.value > 0 ? `${prop.plotArea.value} ${prop.plotArea.unit}` : '—'}
                      </td>

                      <td style={{ padding: '14px 16px', fontWeight: 600, color: '#004B3C' }}>
                        {prop.priceDisplay || 'On Request'}
                      </td>

                      <td style={{ padding: '14px 16px' }}>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            backgroundColor: prop.status === 'available' ? '#D1FAE5' : '#FEF3C7',
                            color: prop.status === 'available' ? '#065F46' : '#92400E',
                          }}
                        >
                          {prop.status}
                        </span>
                      </td>

                      <td style={{ padding: '14px 16px' }}>
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(prop)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '4px 10px',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: prop.isPublished ? '#DEF7EC' : '#FDE8E8',
                            color: prop.isPublished ? '#03543F' : '#9B1C1C',
                          }}
                          title="Click to toggle publish status"
                        >
                          {prop.isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
                          <span>{prop.isPublished ? 'Published' : 'Hidden'}</span>
                        </button>
                      </td>

                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => openEditModal(prop)}
                            style={{
                              padding: '6px',
                              background: '#F8F6F0',
                              border: '1px solid #E8E5DE',
                              borderRadius: '4px',
                              color: '#004B3C',
                              cursor: 'pointer',
                            }}
                            title="Edit"
                          >
                            <Edit size={15} />
                          </button>

                          <a
                            href={`/properties/${prop.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              padding: '6px',
                              background: '#F8F6F0',
                              border: '1px solid #E8E5DE',
                              borderRadius: '4px',
                              color: '#5C574F',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                            title="Preview Public Page"
                          >
                            <ExternalLink size={15} />
                          </a>

                          <button
                            type="button"
                            disabled={deletingId === prop._id}
                            onClick={() => handleDelete(prop._id)}
                            style={{
                              padding: '6px',
                              background: '#FDF2F2',
                              border: '1px solid #F8B4B4',
                              borderRadius: '4px',
                              color: '#C4392F',
                              cursor: 'pointer',
                            }}
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Property Modal */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 30, 24, 0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            zIndex: 9999,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '720px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                backgroundColor: '#004B3C',
                padding: '1.5rem 2rem',
                color: '#F8F6F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.75rem', margin: 0, color: '#F8F6F0' }}>
                {editingProperty ? 'Edit Residence' : 'Add New Forest Residence'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#F8F6F0', cursor: 'pointer' }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleFormSubmit} style={{ padding: '2rem' }}>
              {formError && (
                <div
                  style={{
                    backgroundColor: '#FDF2F2',
                    color: '#9B1C1C',
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <AlertCircle size={16} />
                  <span>{formError}</span>
                </div>
              )}

              {formSuccess && (
                <div
                  style={{
                    backgroundColor: '#DEF7EC',
                    color: '#03543F',
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <CheckCircle size={16} />
                  <span>{formSuccess}</span>
                </div>
              )}

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#3E3A34', marginBottom: '0.35rem' }}>
                  Property Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Banyan 3 BHK Signature Villa"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1CDC4', borderRadius: '6px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#3E3A34', marginBottom: '0.35rem' }}>
                    Property Type
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as any })}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1CDC4', borderRadius: '6px', backgroundColor: '#FFFFFF' }}
                  >
                    <option value="villa">Villa</option>
                    <option value="plot">Plot</option>
                    <option value="apartment">Apartment</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#3E3A34', marginBottom: '0.35rem' }}>
                    Configuration
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3 BHK Luxury Villa"
                    value={formData.configuration}
                    onChange={(e) => setFormData({ ...formData, configuration: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1CDC4', borderRadius: '6px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#3E3A34', marginBottom: '0.35rem' }}>
                    Plot Area (sq ft)
                  </label>
                  <input
                    type="number"
                    value={formData.plotAreaValue}
                    onChange={(e) => setFormData({ ...formData, plotAreaValue: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1CDC4', borderRadius: '6px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#3E3A34', marginBottom: '0.35rem' }}>
                    Pricing Display
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Price on Request"
                    value={formData.priceDisplay}
                    onChange={(e) => setFormData({ ...formData, priceDisplay: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1CDC4', borderRadius: '6px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#3E3A34', marginBottom: '0.35rem' }}>
                  Primary Image URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1CDC4', borderRadius: '6px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#3E3A34', marginBottom: '0.35rem' }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1CDC4', borderRadius: '6px', boxSizing: 'border-box', resize: 'vertical' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#3E3A34', marginBottom: '0.35rem' }}>
                  Amenities (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Sundeck, Forest View, Private Lawn"
                  value={formData.amenities}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1CDC4', borderRadius: '6px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '2rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    style={{ accentColor: '#004B3C', width: '16px', height: '16px' }}
                  />
                  <span>Published on Website</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    style={{ accentColor: '#004B3C', width: '16px', height: '16px' }}
                  />
                  <span>Featured Residence</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#F8F6F0',
                    border: '1px solid #E8E5DE',
                    borderRadius: '6px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  style={{
                    padding: '10px 24px',
                    backgroundColor: '#004B3C',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 600,
                    cursor: formLoading ? 'not-allowed' : 'pointer',
                    opacity: formLoading ? 0.7 : 1,
                  }}
                >
                  {formLoading ? 'Saving...' : editingProperty ? 'Save Updates' : 'Create Residence'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

