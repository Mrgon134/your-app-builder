// Real use cases in the same soft card layout.

const REAL_MOMENTS = [
  {
    title: "Late-night thoughts",
    label: "When your brain will not slow down",
    body: "Write one honest sentence and let Ju turn it into a warmer read, not another blank page.",
    color: '#7C6EDB',
    icon: 'Moon',
  },
  {
    title: "Mood check-ins",
    label: "When you only have ten seconds",
    body: "Pick how you feel, add what shaped it, and keep the signal for your future patterns.",
    color: '#4ECDC4',
    icon: 'Heart',
  },
  {
    title: "Voice journaling",
    label: "When typing feels like too much",
    body: "Speak what is on your mind and keep the transcript with the rest of your private journal.",
    color: '#FFB347',
    icon: 'Mic',
  },
  {
    title: "Pattern insights",
    label: "When the same feeling keeps returning",
    body: "Nuju helps surface repeated moods, habits, and moments so your entries become context.",
    color: '#E8878C',
    icon: 'Trend',
  },
  {
    title: "Coach styles",
    label: "When you need a different kind of tone",
    body: "Choose a softer, clearer, wiser, or more playful response based on what the moment needs.",
    color: '#6C9BCF',
    icon: 'Sparkles',
  },
  {
    title: "Web and iOS",
    label: "When you want Nuju close",
    body: "Use Nuju from the browser or download the iOS app from the App Store.",
    color: '#95E1D3',
    icon: 'Phone',
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials-section section">
      <Aurora />
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>
          <Reveal>
            <Eyebrow color="#FFB347">Built around real moments</Eyebrow>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.02, margin: '16px 0 16px' }}>
              It feels personal fast.<br/>
              <span style={{ color: 'var(--ink-soft)' }}>That's the whole point.</span>
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 24 }}>
              <Icon.Lock size={16} />
              <span style={{ fontSize: 14, color: 'var(--ink-soft)' }}>
                Private journal entries, mood context, and AI reflections in one place.
              </span>
            </div>
          </Reveal>
        </div>

        <div className="testimonials-grid">
          {REAL_MOMENTS.map((t, i) => {
            const IconC = Icon[t.icon];
            return (
              <Reveal key={t.title} delay={i * 60}>
                <div className="testimonial glass">
                  <div style={{ padding: 24 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 999, background: `${t.color}22`, display: 'grid', placeItems: 'center', color: t.color }}>
                      <IconC size={18} />
                    </div>
                    <p style={{ fontFamily: 'var(--display)', fontSize: 17, lineHeight: 1.45, fontWeight: 500, letterSpacing: '-0.012em', color: 'var(--ink)', margin: '14px 0 0' }}>
                      {t.body}
                    </p>
                    <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 999, background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`, display: 'grid', placeItems: 'center', color: 'white', fontWeight: 700, fontSize: 14 }}>
                        {t.title.slice(0, 1)}
                      </div>
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>{t.title}</div>
                        <div style={{ fontSize: 12, color: 'var(--ink-mute)' }}>{t.label}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

window.Testimonials = Testimonials;
