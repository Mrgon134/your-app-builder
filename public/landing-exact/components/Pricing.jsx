// PRICING — 4 plans (Free, Weekly, 3 Month, Lifetime).
// Sleek glass cards with one highlighted.

const PLANS = [
  {
    name: "Free",
    price: "$0",
    unit: "forever",
    badge: "Start here",
    desc: "Get your first Ju Gets You reveal. No card. No timer.",
    features: ["One personal reveal", "Mood check-in (10 sec)", "Save 3 entries"],
    cta: "Try Nuju free",
    accent: '#6C9BCF',
  },
  {
    name: "Weekly",
    plan: "weekly",
    price: "$2.99",
    unit: "/ week",
    badge: "Try lightly",
    desc: "Low-commitment way to keep Ju close. Cancel anytime.",
    features: ["Unlimited reveals", "Voice journaling", "Full history + search", "Cancel anytime"],
    cta: "Start weekly",
    accent: '#FFB347',
  },
  {
    name: "3 Month",
    plan: "three_month",
    price: "$15.99",
    unit: "/ 3 months",
    badge: "Best value · 7-day free trial",
    highlight: true,
    desc: "The sweet spot. Long enough for Ju to learn your patterns.",
    features: ["Everything in Weekly", "Pattern detection across 30/90 days", "All 4 coach personas", "Priority new features"],
    cta: "Start 7-day trial",
    accent: '#7C6EDB',
  },
  {
    name: "Lifetime",
    plan: "lifetime_one_time",
    price: "$12.99",
    unit: "one time",
    badge: "One payment, done",
    desc: "Pay once. Keep Ju close for as long as the app exists.",
    features: ["Everything in paid plans", "One-time purchase", "No renewals", "Restore access anytime"],
    cta: "Get lifetime",
    accent: '#4ECDC4',
  },
];

const Pricing = ({ onStart }) => {
  return (
    <section className="pricing-section section" id="pricing">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>
          <Reveal>
            <Eyebrow color="#7C6EDB">Pricing</Eyebrow>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.02, margin: '16px 0 16px' }}>
              See the reveal first.<br/>
              <span style={{ color: 'var(--ink-soft)' }}>Decide if it stays.</span>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: 560, margin: '0 auto' }}>
              Every plan is the same calm app. Pick what fits the kind of company you want Ju to keep.
            </p>
          </Reveal>
        </div>

        <div className="pricing-grid">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 60}>
              <div className={`pricing-card glass ${p.highlight ? 'highlight' : ''}`} style={{ '--accent': p.accent }}>
                {p.highlight && <div className="pricing-glow" />}
                <div style={{ padding: 28, position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div className="pricing-badge" style={{ color: p.accent, background: `${p.accent}18`, border: `1px solid ${p.accent}33` }}>
                    {p.badge}
                  </div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 20 }}>
                    {p.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
                    <div style={{ fontFamily: 'var(--display)', fontSize: 44, fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1, color: 'var(--ink)' }}>
                      {p.price}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--ink-mute)' }}>{p.unit}</div>
                  </div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink-soft)', marginTop: 12, minHeight: 60 }}>
                    {p.desc}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 22px', flex: 1 }}>
                    {p.features.map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, lineHeight: 1.45, color: 'var(--ink)', padding: '7px 0' }}>
                        <span style={{ width: 16, height: 16, borderRadius: 999, background: `${p.accent}22`, display: 'grid', placeItems: 'center', color: p.accent, flexShrink: 0, marginTop: 2 }}>
                          <Icon.Check size={11} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => onStart(p.plan)}
                    className={p.highlight ? 'btn-primary' : 'btn-glass'}
                    style={{ width: '100%', height: 48 }}
                  >
                    {p.cta}
                    <Icon.Arrow size={14} />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="pricing-guarantee">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 38, height: 38, borderRadius: 999, background: 'rgba(78, 205, 196, 0.14)', color: '#4ECDC4', display: 'grid', placeItems: 'center' }}>
                <Icon.Heart size={18} />
              </span>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--ink)' }}>Manage your plan anytime.</div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 2 }}>Subscriptions can be managed from the account or App Store settings, depending on where you subscribed.</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 38, height: 38, borderRadius: 999, background: 'rgba(124, 110, 219, 0.14)', color: 'var(--purple)', display: 'grid', placeItems: 'center' }}>
                <Icon.Lock size={18} />
              </span>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--ink)' }}>Your words are not training data.</div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 2 }}>Encrypted at rest. End-to-end account isolation. Never sold, never indexed by ad networks.</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

window.Pricing = Pricing;
