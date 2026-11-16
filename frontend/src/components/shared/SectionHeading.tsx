import React from 'react';

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  subtitle,
  centered = true,
  light = false,
  className = '',
}) => {
  return (
    <div
      className={`section-heading ${centered ? 'text-center' : ''} ${className}`}
      style={{ marginBottom: '2.5rem' }}
    >
      {label && (
        <span
          style={{
            display: 'inline-block',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: light ? '#F7D6B0' : '#B68B45',
            marginBottom: '0.5rem',
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {label}
        </span>
      )}
      <h2
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          fontWeight: 500,
          lineHeight: 1.18,
          color: light ? '#F8F6F0' : '#004B3C',
          letterSpacing: '-0.01em',
          margin: 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            maxWidth: '680px',
            margin: centered ? '0.75rem auto 0' : '0.75rem 0 0',
            fontSize: '1.05rem',
            lineHeight: 1.65,
            color: light ? 'rgba(248, 246, 240, 0.85)' : '#5C574F',
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {subtitle}
        </p>
      )}
      <div
        style={{
          width: '54px',
          height: '2px',
          background: light ? '#F7D6B0' : '#B68B45',
          margin: centered ? '1rem auto 0' : '1rem 0 0',
          borderRadius: '2px',
        }}
      />
    </div>
  );
};

