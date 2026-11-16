import { VanamPreloader } from './VanamPreloader';
import React from 'react';
import { AlertCircle, Inbox } from 'lucide-react';

export const LoadingSpinner: React.FC<{
  message?: string;
  subtitle?: string;
  fullScreen?: boolean;
}> = () => {
  return <VanamPreloader isInitialSplash={false} />;
};

export const EmptyState: React.FC<{
  title?: string;
  description?: string;
  action?: React.ReactNode;
}> = ({
  title = 'No items found',
  description = 'There are no items available to display right now.',
  action,
}) => (
  <div
    style={{
      textAlign: 'center',
      padding: '4rem 1.5rem',
      backgroundColor: '#F8F6F0',
      borderRadius: '12px',
      margin: '2rem 0',
      border: '1px dashed #D1CDC4',
    }}
  >
    <Inbox size={48} color="#B68B45" style={{ margin: '0 auto 1rem', opacity: 0.8 }} />
    <h4
      style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: '1.5rem',
        color: '#004B3C',
        margin: '0 0 0.5rem',
      }}
    >
      {title}
    </h4>
    <p style={{ color: '#7A756C', fontSize: '0.95rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
      {description}
    </p>
    {action}
  </div>
);

export const ErrorState: React.FC<{
  message?: string;
  onRetry?: () => void;
}> = ({ message = 'Failed to load content. Please try again.', onRetry }) => (
  <div
    style={{
      textAlign: 'center',
      padding: '3rem 1.5rem',
      backgroundColor: '#FDF2F2',
      borderRadius: '12px',
      border: '1px solid #F8B4B4',
      margin: '2rem 0',
    }}
  >
    <AlertCircle size={42} color="#C4392F" style={{ margin: '0 auto 0.75rem' }} />
    <h4
      style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: '1.4rem',
        color: '#9B1C1C',
        margin: '0 0 0.5rem',
      }}
    >
      Something went wrong
    </h4>
    <p style={{ color: '#7A756C', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
      {message}
    </p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        style={{
          padding: '8px 18px',
          backgroundColor: '#004B3C',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '4px',
          fontSize: '0.82rem',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Retry
      </button>
    )}
  </div>
);

