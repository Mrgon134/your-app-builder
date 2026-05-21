// HOW IT WORKS — pinned section with sticky phone mockup
// that changes screen as the user scrolls through 4 steps.

const STEPS = [
  {
    n: '01',
    title: "Open Nuju.",
    sub: "No login screen. No 'how are you' guilt-trip. Just one open page.",
    color: '#6C9BCF',
    icon: 'Phone',
  },
  {
    n: '02',
    title: "Say the messy version.",
    sub: "Type it. Speak it. Cry-type it. Half-sentences are fine. Ju doesn't grade.",
    color: '#7C6EDB',
    icon: 'Mic',
  },
  {
    n: '03',
    title: "Get the read.",
    sub: "Nine seconds later, your feeling comes back as language — gentle, specific, and yours.",
    color: '#E8878C',
    icon: 'Sparkles',
  },
  {
    n: '04',
    title: "See the pattern.",
    sub: "Across days, Ju shows the throughline. You learn what your hard days have in common.",
    color: '#4ECDC4',
    icon: 'Trend',
  },
];

const HowItWorks = () => {
  const [step, setStep] = React.useState(0);
  const sectionRef = React.useRef(null);
  const stepRefs = React.useRef([]);

  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      // pick the one most visible
      const sorted = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (sorted.length) {
        const idx = stepRefs.current.indexOf(sorted[0].target);
        if (idx >= 0) setStep(idx);
      }
    }, { threshold: [0.4, 0.6, 0.8], rootMargin: '-30% 0px -30% 0px' });
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="how-section" id="how" ref={sectionRef}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 64px' }}>
          <Reveal>
            <Eyebrow color="#4ECDC4">How it works</Eyebrow>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.02, margin: '16px 0 16px' }}>
              Four steps. About a minute.<br/>
              <span style={{ color: 'var(--ink-soft)' }}>A read that feels like you.</span>
            </h2>
          </Reveal>
        </div>

        <div className="how-grid">
          <div className="how-steps">
            {STEPS.map((s, i) => {
              const IconC = Icon[s.icon];
              const active = i === step;
              return (
                <div
                  key={s.n}
                  ref={(el) => (stepRefs.current[i] = el)}
                  className={`how-step ${active ? 'active' : ''}`}
                  onClick={() => {
                    stepRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                >
                  <div className="how-step-num" style={{ background: active ? s.color : 'transparent', color: active ? 'white' : s.color, borderColor: s.color }}>
                    {s.n}
                  </div>
                  <div className="how-step-content">
                    <div className="how-step-row">
                      <IconC size={16} />
                      <h3>{s.title}</h3>
                    </div>
                    <p>{s.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="how-phone-wrap">
            <PhoneMockup step={step} />
          </div>
        </div>
      </div>
    </section>
  );
};

const PhoneMockup = ({ step }) => {
  return (
    <div className="phone">
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen">
          {step === 0 && <ScreenOpen />}
          {step === 1 && <ScreenWrite />}
          {step === 2 && <ScreenRead />}
          {step === 3 && <ScreenPattern />}
        </div>
      </div>
      <div className="phone-glow" />
    </div>
  );
};

// --- Phone screens ---
const ScreenOpen = () => (
  <div className="screen screen-open">
    <div className="screen-status">
      <span>9:41</span>
      <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ width: 14, height: 8, borderRadius: 2, border: '1px solid currentColor' }} />
      </span>
    </div>
    <div style={{ textAlign: 'center', paddingTop: 30 }}>
      <img src="/landing-exact/src/assets/ju-main.png" style={{ width: 110, height: 110, margin: '0 auto', filter: 'drop-shadow(0 12px 24px rgba(124,110,219,0.3))' }} />
      <div style={{ fontFamily: 'var(--display)', fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 18, color: 'var(--ink)' }}>
        Hi. How's now?
      </div>
      <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 8 }}>
        No streaks. No pressure. Just one sentence.
      </div>
    </div>
    <div style={{ position: 'absolute', left: 18, right: 18, bottom: 38, padding: 14, borderRadius: 20, background: 'rgba(124, 110, 219, 0.08)', border: '1px solid rgba(124,110,219,0.18)' }}>
      <div style={{ fontSize: 13.5, color: 'var(--ink-mute)' }}>Type or tap to talk…</div>
    </div>
  </div>
);

const ScreenWrite = () => (
  <div className="screen screen-write">
    <div className="screen-status"><span>9:42</span></div>
    <div style={{ paddingTop: 18 }}>
      <div className="eyebrow" style={{ marginBottom: 8 }}>Writing now</div>
      <div style={{ fontFamily: 'var(--display)', fontSize: 19, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.4, letterSpacing: '-0.01em' }}>
        I'm tired in a way that sleep doesn't fix. Everyone's fine and I'm the<span className="demo-cursor" />
      </div>
    </div>
    <div style={{ position: 'absolute', left: 18, right: 18, bottom: 90, display: 'flex', gap: 8, alignItems: 'center' }}>
      <button style={{ width: 42, height: 42, borderRadius: 999, background: 'rgba(124,110,219,0.12)', border: 0, color: 'var(--purple)', display: 'grid', placeItems: 'center' }}>
        <Icon.Mic size={16} />
      </button>
      <div style={{ flex: 1, height: 18, display: 'inline-flex', alignItems: 'center', gap: 2 }}>
        <VoiceWave color="#7C6EDB" count={28} />
      </div>
    </div>
    <div style={{ position: 'absolute', left: 18, right: 18, bottom: 38, padding: '14px 16px', borderRadius: 999, background: 'linear-gradient(135deg, #9388F0, #7C6EDB, #5B4FBE)', color: 'white', textAlign: 'center', fontWeight: 600, fontSize: 14, boxShadow: '0 12px 30px -10px rgba(91,79,190,0.6)' }}>
      Get my read →
    </div>
  </div>
);

const ScreenRead = () => (
  <div className="screen screen-read">
    <div className="screen-status"><span>9:42</span></div>
    <div style={{ paddingTop: 16 }}>
      <div className="eyebrow" style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: '#7C6EDB' }} />
        Ju reads · Tender
      </div>
      <div style={{ fontFamily: 'var(--display)', fontSize: 20, fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.2, color: 'var(--ink)' }}>
        You're tired of being the steady one.
      </div>
      <p style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--ink-soft)', marginTop: 10 }}>
        This isn't 'low energy.' It's the cost of being everyone's calm. Soft is still moving — and it's still real.
      </p>
    </div>
    <div style={{ position: 'absolute', left: 16, right: 16, bottom: 100, padding: 14, borderRadius: 16, background: 'rgba(78, 205, 196, 0.1)', border: '1px solid rgba(78,205,196,0.3)' }}>
      <div className="eyebrow" style={{ marginBottom: 4, color: '#4ECDC4' }}>Next gentle move</div>
      <div style={{ fontSize: 12.5, color: 'var(--ink)' }}>Tell one person less. Tonight only.</div>
    </div>
    <div style={{ position: 'absolute', left: 16, right: 16, bottom: 36, display: 'flex', gap: 6 }}>
      <button style={{ flex: 1, height: 38, borderRadius: 999, border: '1px solid var(--line)', background: 'white', fontSize: 12, fontWeight: 600 }}>Save</button>
      <button style={{ flex: 1, height: 38, borderRadius: 999, border: 0, background: 'var(--ink)', color: 'white', fontSize: 12, fontWeight: 600 }}>Keep going</button>
    </div>
  </div>
);

const ScreenPattern = () => (
  <div className="screen screen-pattern">
    <div className="screen-status"><span>9:43</span></div>
    <div style={{ paddingTop: 14 }}>
      <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon.Trend size={12} /> 30-day pattern
      </div>
      <div style={{ fontFamily: 'var(--display)', fontSize: 19, fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.2, color: 'var(--ink)', marginTop: 8 }}>
        Tuesdays cost you the most.
      </div>
    </div>

    <svg viewBox="0 0 240 110" style={{ width: '100%', marginTop: 14 }}>
      <defs>
        <linearGradient id="pat-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0,80 C20,76 32,40 60,42 C88,44 95,68 118,62 C140,56 152,30 175,38 C198,46 215,18 240,22 L240,110 L0,110 Z" fill="url(#pat-fill)" />
      <path d="M0,80 C20,76 32,40 60,42 C88,44 95,68 118,62 C140,56 152,30 175,38 C198,46 215,18 240,22" stroke="#4ECDC4" strokeWidth="2.2" fill="none" />
      {[[60,42],[118,62],[175,38],[240,22]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="white" stroke="#4ECDC4" strokeWidth="2" />
      ))}
    </svg>

    <div style={{ position: 'absolute', left: 16, right: 16, bottom: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {[
        { d: 'Tue', t: 'Low energy · Said yes 6x' },
        { d: 'Sun', t: 'Sunday-anxious again' },
      ].map((r) => (
        <div key={r.d} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 14, background: 'rgba(255,255,255,0.7)', border: '1px solid var(--line)' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--purple)', width: 28 }}>{r.d}</span>
          <span style={{ fontSize: 11.5, color: 'var(--ink)' }}>{r.t}</span>
        </div>
      ))}
    </div>
  </div>
);

window.HowItWorks = HowItWorks;
