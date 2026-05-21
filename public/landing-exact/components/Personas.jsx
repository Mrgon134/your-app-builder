// PERSONAS — coach picker. User clicks a persona, sees a sample line
// from each. Hover/click animates the card forward.

const PERSONAS = [
  {
    key: 'gentle',
    name: 'Gentle',
    img: '/landing-exact/src/assets/coach-gentle.png',
    color: '#B8C4F0',
    tag: 'Soft + warm',
    line: "You don't have to earn the rest. Today is allowed to be small.",
    voice: "Like the friend who never makes the room about themselves.",
  },
  {
    key: 'wise',
    name: 'Wise',
    img: '/landing-exact/src/assets/coach-wise.png',
    color: '#E8D5A3',
    tag: 'Slow + true',
    line: "What you're calling laziness is your body protecting the part of you that's still trying.",
    voice: "Like the older mentor who doesn't fill silence.",
  },
  {
    key: 'tough',
    name: 'Tough',
    img: '/landing-exact/src/assets/coach-tough.png',
    color: '#D4A0D0',
    tag: 'Direct + honest',
    line: "Stop apologizing for needing what every nervous system needs. Eat. Sleep. Cancel one thing.",
    voice: "Like the friend who won't let you lie to yourself.",
  },
  {
    key: 'fun',
    name: 'Fun',
    img: '/landing-exact/src/assets/coach-fun.png',
    color: '#A8E6CF',
    tag: 'Light + lifting',
    line: "Bestie this is just a Tuesday in a costume. Put on the playlist, we're walking.",
    voice: "Like the friend who makes everything 12% lighter.",
  },
];

const Personas = () => {
  const [active, setActive] = React.useState(0);
  const cur = PERSONAS[active];

  return (
    <section className="personas-section section">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>
          <Reveal>
            <Eyebrow color="#7C6EDB">Pick the voice you can hear</Eyebrow>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.02, margin: '16px 0 16px' }}>
              Four coaches.<br/>
              <span style={{ color: 'var(--ink-soft)' }}>Same read, different room.</span>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: 560, margin: '0 auto' }}>
              Some days you need a hand. Some days a kick. Same insight, the voice you can hear that day — switch anytime.
            </p>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="persona-grid">
            <div className="persona-list">
              {PERSONAS.map((p, i) => (
                <button
                  key={p.key}
                  onClick={() => setActive(i)}
                  className={`persona-card ${i === active ? 'active' : ''}`}
                  style={{ '--persona-color': p.color }}
                >
                  <div className="persona-thumb">
                    <img src={p.img} alt={p.name} />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontFamily: 'var(--display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.015em' }}>{p.name}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 2 }}>{p.tag}</div>
                  </div>
                  <div className="persona-check">
                    <Icon.Check size={14} />
                  </div>
                </button>
              ))}
            </div>

            <div key={cur.key} className="persona-preview">
              <div className="persona-preview-glow" style={{ background: `radial-gradient(circle, ${cur.color}55, transparent 70%)` }} />
              <div className="persona-preview-figure">
                <img src={cur.img} alt={cur.name} />
              </div>
              <div className="persona-preview-card glass">
                <div style={{ padding: 22 }}>
                  <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 999, background: cur.color }} />
                    Ju as {cur.name}
                  </div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.018em', lineHeight: 1.3, color: 'var(--ink)' }}>
                    "{cur.line}"
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line)' }}>
                    {cur.voice}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

window.Personas = Personas;
