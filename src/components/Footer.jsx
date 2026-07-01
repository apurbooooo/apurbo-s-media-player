import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer style={{
      marginTop: 'auto',
      padding: '32px 24px',
      textAlign: 'center',
      borderTop: '1px solid var(--surface-border)',
      background: 'var(--surface-glow)',
      backdropFilter: 'blur(8px)',
      width: '100%'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px'
      }}>
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          fontWeight: 400
        }}>
          &copy; {currentYear} <strong>Apurbo Media Player</strong>. All rights reserved.
        </p>
        <p style={{
          fontSize: '0.75rem',
          color: 'var(--text-tertiary)',
          fontWeight: 500
        }}>
          Built with React &bull; Vite &bull; HLS.js &bull; Vanilla CSS
        </p>
      </div>
    </footer>
  );
}
