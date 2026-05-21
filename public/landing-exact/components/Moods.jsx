// MOODS — auto-playing slideshow of Ju's mood states with
// liquid glass overlay panels and progress dots.

const MOODS = [
  { key: 'rough', img: '/landing-exact/src/assets/ju-rough.png', label: 'Rough', color: '#E8878C', headline: "When everything's too loud.", body: "Ju gets it. You don't need to be productive about this. We start by lowering the volume, not finding the answer." },
  { key: 'low',   img: '/landing-exact/src/assets/ju-low.png',   label: 'Low',   color: '#6C9BCF', headline: "When you're holding it quietly.", body: "Holding it together still counts as holding it. Ju notices the weight you didn't put into words yet." },
  { key: 'okay',  img: '/landing-exact/src/assets/ju-okay.png',  label: 'Okay',  color: '#FFB347', headline: "When the day is just… a day.",   body: "Okay is its own real feeling. Not flat, not failing — just a level surface to walk on for a while." },
  { key: 'good',  img: '/landing-exact/src/assets/ju-good.png',  label: 'Good',  color: '#95E1D3', headline: "When softness is returning.",     body: "The kind of good that doesn't have to be earned. Ju marks the day so future-you remembers this version existed." },
  { key: 'great', img: '/landing-exact/src/assets/ju-great.png', label: 'Great', color: '#4ECDC4', headline: "When you feel like yourself again.", body: "These are the days the harder ones were waiting for. Ju saves the shape so you can find your way back." },
];

const Moods = () => {
  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const tickRef = React.useRef(null);

  React.useEffect(() => {
    if (paused) return;
    tickRef.current = setInterval(() => {
      setI((p) => (p + 1) % MOODS.length);
    }, 4200);
    return () => clearInterval(tickRef.current);
  }, [paused]);

  const cur = MOODS[i];

  return (
    <section className="moods-section section">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '0.75fr 1.25fr', gap: 56, alignItems: 'center' }} className="moods-grid">
          <Reveal>
            <Eyebrow color={cur.color}>Meet Ju</Eyebrow>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.02, margin: '16px 0 20px' }}>
              One companion.<br/>
              <span style={{ color: 'var(--ink-soft)' }}>Five emotional weathers.</span>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: 460 }}>
              Ju doesn't ask you to perform a mood. They shift with you — meeting the room you're actually in, not the one a journal expects.
            </p>

            <div style={{ display: 'flex', gap: 8, marginTop: 32, flexWrap: 'wrap' }}>
              {MOODS.map((m, idx) => (
                <button
                  key={m.key}
                  onClick={() => { setI(idx); setPaused(true); }}
                  style={{
                    padding: '8px 14px',
                    height: 38,
                    borderRadius: 999,
                    border: '1px solid ' + (i === idx ? m.color : 'var(--line)'),
                    background: i === idx ? `${m.color}22` : 'rgba(255,255,255,0.6)',
                    color: i === idx ? 'var(--ink)' : 'var(--ink-soft)',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: m.color }} />
                  {m.label}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mood-stage">
              <div className="mood-stage-glow" style={{ background: `radial-gradient(circle at 50% 60%, ${cur.color}55 0%, transparent 65%)` }} />
              <div className="mood-stage-rings">
                <div className="mood-ring r1" style={{ borderColor: `${cur.color}22` }} />
                <div className="mood-ring r2" style={{ borderColor: `${cur.color}18` }} />
                <div className="mood-ring r3" style={{ borderColor: `${cur.color}14` }} />
              </div>

              <div key={cur.key} className="mood-figure">
                <img src={cur.img} alt={cur.label} />
              </div>

              <div className="mood-overlay glass-strong" key={'overlay-' + cur.key}>
                <div style={{ padding: '20px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 999, background: cur.color, boxShadow: `0 0 14px ${cur.color}` }} />
                    <span className="eyebrow">Feeling {cur.label.toLowerCase()}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--ink)' }}>
                    {cur.headline}
                  </div>
                  <p style={{ margin: '10px 0 0', fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-soft)' }}>{cur.body}</p>
                </div>
              </div>

              {/* progress bar */}
              <div className="mood-progress">
                {MOODS.map((m, idx) => (
                  <div key={m.key} className={`mood-progress-tick ${idx === i ? 'active' : idx < i ? 'done' : ''}`}>
                    <div className="mood-progress-fill" style={{ background: m.color }} />
                  </div>
                ))}
              </div>

              <button
                className="mood-playpause"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? 'Play' : 'Pause'}
              >
                {paused ? <Icon.Play size={12} /> : <Icon.Pause size={12} />}
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

window.Moods = Moods;
