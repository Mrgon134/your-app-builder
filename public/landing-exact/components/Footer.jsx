// FOOTER - final CTA card + footer columns.

const footerColumns = [
  {
    h: 'Product',
    items: [
      ['AI journal', '/ai-journal'],
      ['Mood tracker', '/mood-tracker'],
      ['Voice journaling', '/voice-journaling'],
      ['iOS app', 'https://apps.apple.com/us/app/nuju/id6763682187'],
      ['Install Nuju', '/install'],
    ],
  },
  {
    h: 'Company',
    items: [
      ['About', '/about'],
      ['Blog', '/blog'],
      ['Support', '/support'],
      ['Contact', '/contact'],
      ['App Store', 'https://apps.apple.com/us/app/nuju/id6763682187'],
    ],
  },
  {
    h: 'Resources',
    items: [
      ['Privacy', '/privacy'],
      ['Terms', '/terms'],
      ['Medical disclaimer', '/medical-disclaimer'],
      ['Support center', '/support'],
      ['Contact', '/contact'],
    ],
  },
];

const isExternalLink = (href) => href.startsWith('http');

const Footer = ({ onStart }) => {
  return (
    <footer className="footer-section">
      <div className="container">
        <Reveal>
          <div className="final-cta">
            <div className="final-cta-bg" />
            <div className="final-cta-inner">
              <div style={{ flex: 1 }}>
                <Eyebrow color="#FFE6C8">Free in 60 seconds</Eyebrow>
                <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1, margin: '14px 0 16px', color: 'white' }}>
                  Stop carrying it<br/>
                  alone tonight.
                </h2>
                <p style={{ fontSize: 17, lineHeight: 1.55, color: 'rgba(255,255,255,0.78)', maxWidth: 540, margin: 0 }}>
                  One sentence. One read. One small next step. No card. No timer. Just Ju, waiting.
                </p>
                <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                  <button className="btn-primary" onClick={onStart} style={{ background: 'white', color: '#1A1726', boxShadow: '0 1px 0 rgba(255,255,255,0.4) inset, 0 16px 40px -16px rgba(0,0,0,0.4)' }}>
                    Start the Ju Gets You reveal
                    <Icon.Arrow size={16} />
                  </button>
                  <AppStoreButton />
                </div>
              </div>
              <div className="final-cta-ju">
                <img src="/landing-exact/src/assets/ju-good.png" alt="Ju" className="float-slow" />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="footer-cols">
          <div>
            <a className="nav-logo" href="/" aria-label="Nuju home" style={{ marginBottom: 18 }}>
              <div className="nav-logo-orb"><img src="/landing-exact/src/assets/ju-main.png" alt="" /></div>
              <span>Nuju</span>
            </a>
            <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink-soft)', maxWidth: 280, margin: 0 }}>
              The AI journal for the messy version of how you feel. Built quietly, in public.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              {[
                ['Blog', '/blog'],
                ['Support', '/support'],
                ['Contact', '/contact'],
              ].map(([label, href]) => (
                <a key={label} href={href} aria-label={label} style={{ width: 36, height: 36, borderRadius: 999, background: 'rgba(124,110,219,0.08)', color: 'var(--ink-soft)', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 600 }}>
                  {label.slice(0, 1)}
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.h}>
              <div className="eyebrow" style={{ marginBottom: 16 }}>{col.h}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.items.map(([it, href]) => (
                  <li key={it}>
                    <a
                      href={href}
                      target={isExternalLink(href) ? '_blank' : undefined}
                      rel={isExternalLink(href) ? 'noopener noreferrer' : undefined}
                      style={{ fontSize: 13.5, color: 'var(--ink-soft)', transition: 'color 0.2s' }}
                    >
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div>Copyright 2026 Nuju. Built for quieter minds and more understood moments.</div>
          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: '#4ECDC4' }} />
              All systems calm
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

window.Footer = Footer;
