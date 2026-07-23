// HERO — full-bleed cinematic with cursor-following aurora,
// shimmering display headline, live "type how you feel" input,
// and a glass card stack orbiting around Ju.

const HERO_CHIPS = [
  "tired but wired",
  "everything's too loud",
  "can't shut my brain off",
  "fine but not fine",
];

const Hero = ({ onStart }) => {
  const [feeling, setFeeling] = React.useState("");
  const [phase, setPhase] = React.useState("idle"); // idle | thinking | revealed
  const [revealed, setRevealed] = React.useState(null);

  const submit = (text) => {
    const value = (text ?? feeling).trim();
    if (!value) return;
    setFeeling(value);
    setPhase("thinking");
    setTimeout(() => {
      setRevealed(generateRead(value));
      setPhase("revealed");
    }, 1400);
  };

  return (
    <section className="hero-section">
      <Aurora withCursor />

      <div className="container hero-wrap">
        <div className="hero-grid">
          <div className="hero-left">
            <Reveal delay={0}>
              <div className="hero-tag glass-pill hero-eyebrow" style={{ padding: '8px 16px 8px 12px', display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 500, color: 'var(--ink-soft)' }}>
                <span style={{ width: 18, height: 18, borderRadius: 999, background: 'linear-gradient(135deg, #FFB347, #E8878C)', display: 'grid', placeItems: 'center' }}>
                  <Icon.Moon size={10} />
                </span>
                For the 3 AM thoughts you can't explain
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="hero-headline display display-tight">
                Stop <span className="text-shimmer">spiraling.</span><br />
                Feel <em className="underline-swoop">understood</em>—<br />
                <span className="hero-line-thin">in 60 seconds.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="hero-sub">
                Nuju is the AI journal for the messy version of how you feel. Type one honest sentence, and Ju turns it into one warm read, one clear pattern, and one small next step. Free—no card.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="hero-input-wrap glass">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 10px 2px', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--purple)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: '#4ECDC4' }} />
                  Mini demo
                </div>
                <div className="hero-input-row">
                  <span className="hero-input-icon">
                    <Icon.Sparkles size={18} />
                  </span>
                  <input
                    className="hero-input"
                    placeholder="Type how it actually feels…"
                    value={feeling}
                    onChange={(e) => setFeeling(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && submit()}
                  />
                  <button className="btn-primary btn-md" onClick={() => submit()} aria-label="Reveal">
                    Reveal
                    <Icon.Arrow size={14} />
                  </button>
                </div>
                <div className="hero-chips">
                  {HERO_CHIPS.map((c) => (
                    <button
                      key={c}
                      className="hero-chip"
                      onClick={() => { setFeeling(c); submit(c); }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="hero-ctas">
                <button className="btn-primary" onClick={onStart}>
                  Start the Ju Gets You reveal
                  <Icon.Arrow size={16} />
                </button>
                <button className="btn-glass" onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Icon.Play size={12} /> Watch how it works
                </button>
                <AppStoreButton />
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="hero-trust">
                <div className="hero-trust-item">
                  <Icon.Sparkles size={14} />
                  <span>One sentence is enough</span>
                </div>
                <div className="hero-trust-dot" />
                <div className="hero-trust-item">
                  <Icon.Lock size={14} />
                  <span>Private by default</span>
                </div>
                <div className="hero-trust-dot" />
                <div className="hero-trust-item">
                  <Icon.Bolt size={14} />
                  <span>No card, no setup</span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="hero-right">
            <HeroOrbit phase={phase} revealed={revealed} onStart={onStart} />
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  );
};

// ---- HERO ORBIT: Ju mascot center, floating glass cards around ----
const HeroOrbit = ({ phase, revealed, onStart }) => {
  return (
    <div className="orbit-stage">
      {/* Big breathing halo behind Ju */}
      <div className="orbit-halo">
        <div className="orbit-halo-inner" />
        <div className="orbit-halo-ring" />
        <div className="orbit-halo-ring r2" />
      </div>

      {/* Ju mascot */}
      <div className="orbit-ju float">
        <img src="/landing-exact/src/assets/ju-main.png" alt="Ju" />
        <div className="orbit-ju-glow" />
      </div>

      {/* Card 1 — top left: mood reading */}
      <div className="orbit-card orbit-card-1 float-slow">
        <div className="glass">
          <div className="oc-pad">
            <div className="oc-row">
              <span className="oc-dot" style={{ background: '#6C9BCF' }} />
              <span className="eyebrow">Ju noticed</span>
            </div>
            <p className="oc-text">
              "Your body has been carrying<br />
              too much noise for a while."
            </p>
          </div>
        </div>
      </div>

      {/* Card 2 — right: mini mood ring */}
      <div className="orbit-card orbit-card-2 float">
        <div className="glass">
          <div className="oc-pad" style={{ width: 168 }}>
            <div className="oc-row" style={{ marginBottom: 10 }}>
              <Icon.Heart size={13} />
              <span className="eyebrow">Mood signal</span>
            </div>
            <MoodRing />
            <p className="oc-text-sm">Tender · Low energy</p>
          </div>
        </div>
      </div>

      {/* Card 3 — bottom left: pattern */}
      <div className="orbit-card orbit-card-3 float-slow">
        <div className="glass">
          <div className="oc-pad" style={{ width: 200 }}>
            <div className="oc-row" style={{ marginBottom: 12 }}>
              <Icon.Trend size={13} style={{ color: '#4ECDC4' }} />
              <span className="eyebrow">Pattern · 7 days</span>
            </div>
            <MiniChart />
            <p className="oc-text-sm" style={{ marginTop: 8 }}>Tuesdays you say yes too much.</p>
          </div>
        </div>
      </div>

      {/* Card 4 — bottom right: voice note */}
      <div className="orbit-card orbit-card-4 float">
        <div className="glass">
          <div className="oc-pad" style={{ width: 184 }}>
            <div className="oc-row" style={{ marginBottom: 10 }}>
              <span className="oc-dot pulse" style={{ background: '#E8878C' }} />
              <span className="eyebrow">Voice 0:47</span>
            </div>
            <VoiceWave color="#7C6EDB" count={20} />
            <p className="oc-text-sm" style={{ marginTop: 8 }}>"…I just need things quieter."</p>
          </div>
        </div>
      </div>

      {/* When user submits hero input, this overlay slides up */}
      {phase !== 'idle' && (
        <div className="orbit-reveal glass-strong">
          <div style={{ padding: 24 }}>
            {phase === 'thinking' ? (
              <div className="flex items-center gap-3">
                <ThinkingDots />
                <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>Ju is reading between the lines…</span>
              </div>
            ) : (
              <div>
                <div className="eyebrow" style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: revealed.color }} />
                  Reveal · {revealed.signal}
                </div>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, fontFamily: 'var(--display)', fontWeight: 500, letterSpacing: '-0.01em' }}>
                  {revealed.read}
                </p>
                <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                  {revealed.tags.map((t) => (
                    <span key={t} style={{ fontSize: 11, padding: '5px 10px', borderRadius: 999, background: 'rgba(124,110,219,0.1)', color: 'var(--purple)', fontWeight: 600 }}>
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  className="btn-primary"
                  onClick={onStart}
                  style={{ marginTop: 16, height: 40, padding: '0 16px', fontSize: 13 }}
                >
                  Continue in Nuju
                  <Icon.Arrow size={13} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Tiny mood ring viz
const MoodRing = () => (
  <svg width="100" height="100" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7C6EDB" />
        <stop offset="60%" stopColor="#6C9BCF" />
        <stop offset="100%" stopColor="#4ECDC4" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(124,110,219,0.12)" strokeWidth="7" />
    <circle cx="50" cy="50" r="38" fill="none" stroke="url(#ring-grad)" strokeWidth="7" strokeLinecap="round" strokeDasharray="180 280" strokeDashoffset="0" transform="rotate(-90 50 50)" style={{ animation: 'spin 30s linear infinite' }} />
    <text x="50" y="48" textAnchor="middle" fill="currentColor" style={{ fontFamily: 'var(--display)', fontSize: 22, fontWeight: 700 }}>5.2</text>
    <text x="50" y="64" textAnchor="middle" fill="var(--ink-mute)" style={{ fontSize: 8, letterSpacing: 1, textTransform: 'uppercase' }}>today</text>
  </svg>
);

// Mini sparkline
const MiniChart = () => (
  <svg width="100%" height="64" viewBox="0 0 200 64" preserveAspectRatio="none">
    <defs>
      <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M0,46 C20,42 35,30 60,32 C85,34 100,18 125,22 C150,26 165,14 200,8 L200,64 L0,64 Z" fill="url(#chart-fill)" />
    <path d="M0,46 C20,42 35,30 60,32 C85,34 100,18 125,22 C150,26 165,14 200,8" stroke="#4ECDC4" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    {[
      [0, 46], [60, 32], [125, 22], [200, 8],
    ].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="3" fill="white" stroke="#4ECDC4" strokeWidth="2" />
    ))}
  </svg>
);

// Animated typing dots
const ThinkingDots = () => (
  <div style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        style={{
          width: 8, height: 8, borderRadius: 999,
          background: 'var(--purple)',
          animation: `pulse 1.2s ease-in-out infinite`,
          animationDelay: `${i * 0.2}s`,
        }}
      />
    ))}
  </div>
);

// Generate the landing-page mini demo read from the user's input.
function generateRead(input) {
  const lower = input.toLowerCase();
  const presets = [
    {
      match: /(tired|wired|cant.*sleep|3 ?am|insomnia|brain.*won)/,
      signal: "Overactivated",
      color: "#6C9BCF",
      read: "Sounds like your nervous system is trying to finish today after the day already ended. The thoughts aren't the enemy — the unfinished feeling is.",
      tags: ["Overactivated", "Low rest", "Tuesday spike"],
    },
    {
      match: /(loud|overwhelm|too much|stim|chaos)/,
      signal: "Overstimulated",
      color: "#E8878C",
      read: "This isn't a 'figure it out' moment. Your input dial is past the green zone. Lower the noise first — the story comes back when the room gets quiet.",
      tags: ["Overstimulated", "Sensory load"],
    },
    {
      match: /(sad|low|blue|empty|numb|down|hollow)/,
      signal: "Tender",
      color: "#7C6EDB",
      read: "There's something underneath the low that wants to be named, not solved. You don't owe today a productive face. Soft is still moving.",
      tags: ["Tender", "Low energy"],
    },
    {
      match: /(angry|mad|furious|frustrat|annoyed)/,
      signal: "Boundaried",
      color: "#FFB347",
      read: "This anger has a shape — it's pointing at a line that got crossed. Before you act on it, let it tell you what mattered to you.",
      tags: ["Boundaried", "Protective"],
    },
    {
      match: /(anxi|nerv|scared|panic|worry)/,
      signal: "Anticipatory",
      color: "#6C9BCF",
      read: "Your body is rehearsing a future that hasn't happened. That's not weakness — it's a system trying to keep you safe with the wrong tool.",
      tags: ["Anticipatory", "Future-loop"],
    },
    {
      match: /(fine|okay|nothing)/,
      signal: "Numb-fine",
      color: "#95E1D3",
      read: "'Fine' is the mask of someone who learned that easier feelings get the room. There's a softer feeling underneath the polite one.",
      tags: ["Masked", "Polite-fine"],
    },
  ];
  for (const p of presets) if (p.match.test(lower)) return p;
  return {
    signal: "Tangled",
    color: "#7C6EDB",
    read: "You don't need the perfect word for this. The feeling is real before the language is. Start with the shape of it, and Ju can do the rest.",
    tags: ["Tangled", "No words"],
  };
}

// --- Trust marquee under hero ---
const Marquee = () => {
  const items = [
    "AI journal",
    "Mood check-ins",
    "Voice journaling",
    "Private entries",
    "Personal Ju reads",
    "Pattern insights",
    "Available on iOS",
    "Use Nuju on web",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="marquee-wrap">
      <div className="marquee-inner">
        {doubled.map((t, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

window.Hero = Hero;
