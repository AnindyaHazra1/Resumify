import React from 'react';

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>Designed & Built by <a href="https://github.com/AnindyaHazra1" target="_blank" rel="noopener noreferrer" className="creator-link">Anindya Hazra</a></p>

      <style jsx="true">{`
        .app-footer {
          text-align: center;
          padding: 0.75rem;
          background: hsl(var(--color-background));
          border-top: 1px solid hsl(var(--color-border));
          font-size: 0.8rem;
          color: hsl(var(--color-text-muted));
          flex-shrink: 0; /* Prevent collapsing */
        }
        
        .creator-link {
          font-weight: 600;
          color: hsl(var(--color-text-main));
          text-decoration: none;
          transition: color 0.2s;
        }

        .creator-link:hover {
          color: hsl(var(--color-primary));
          text-decoration: underline;
        }

        @media (max-width: 768px) {
            .app-footer {
                padding: 0.5rem;
                font-size: 0.75rem;
                /* Add extra padding at bottom for mobile browsers if needed, 
                   but standard padding usually works fine with modern viewports */
            }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
