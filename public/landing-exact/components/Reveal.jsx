// REVEAL — the interactive "Ju Gets You" demo
// User can type or pick a prompt, watch the typing animation,
// see Ju "think", then see the AI-generated warm read.

const RevealThinkingDots = () => (
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

const PROMPT_PRESETS = [
  {
    label: "Late night",
    text: "I can't sleep and I don't know why. Everything's fine but I feel hollow.",
    read: {
      signal: "Tender · Unfinished",
      color: "#7C6EDB",
      headline: "Your day didn't get to land.",
      body: "Fine isn't the same as okay. There's a softer feeling underneath the polite version — and it's been carrying the day for you while you kept performing it.",
      tags: ["Masked-fine", "Low rest", "Pattern: Tuesdays"],
      next: "Tonight: put on the calmest song you know and let it play once, fully.",
    },
  },
  {
    label: "Burnt out",
    text: "I'm doing everything right and I still feel like I'm falling behind.",
    read: {
      signal: "Overextended",
      color: "#E8878C",
      headline: "You're meeting the bar — and the bar is too high.",
      body: "This isn't a productivity problem. Your capacity has been spending itself on things that look fine on paper. The gap you feel is between your output and your nervous system, not your effort.",
      tags: ["Overextended", "Output > Input", "Boundary signal"],
      next: "Pick one thing to drop this week. Just one. Tell Ju which.",
    },
  },
  {
    label: "Anxious",
    text: "My chest feels tight and I don't know what I'm scared of.",
    read: {
      signal: "Free-floating anxiety",
      color: "#6C9BCF",
      headline: "Your body found the alarm before your brain found the word.",
      body: "The tightness isn't the problem to solve — it's the messenger. Something in the last 48 hours asked too much, and you didn't get to name it as it happened.",
      tags: ["Anticipatory", "Body-first", "Backlog feeling"],
      next: "Two slow exhales. Then ask: what did I not get to say yesterday?",
    },
  },
  {
    label: "Stuck",
    text: "I keep starting things and not finishing them. I feel like a fraud.",
    read: {
      signal: "Pattern fatigue",
      color: "#FFB347",
      headline: "You're not unfinished — you're under-rested between starts.",
      body: "Fraud is the cheap word for what's actually going on. You're a person who keeps showing up to new beginnings without ever getting the closing scene. That gap leaves residue.",
      tags: ["Closure deficit", "Identity loop"],
      next: "Pick one thing you started and write the ending — even imperfectly.",
    },
  },
];

const Reveal2 = () => {
  const [activePreset, setActivePreset] = React.useState(0);
  const [typed, setTyped] = React.useState("");
  const [phase, setPhase] = React.useState("typing"); // typing | thinking | read
  const [auto, setAuto] = React.useState(true);
  const tickRef = React.useRef(null);
  const cycleRef = React.useRef(null);

  const preset = PROMPT_PRESETS[activePreset];

  // Typing animation for the prompt
  React.useEffect(() => {
    setTyped("");
    setPhase("typing");
    let i = 0;
    clearInterval(tickRef.current);
    tickRef.current = setInterval(() => {
      i++;
      setTyped(preset.text.slice(0, i));
      if (i >= preset.text.length) {
        clearInterval(tickRef.current);
        setTimeout(() => setPhase("thinking"), 400);
        setTimeout(() => setPhase("read"), 1900);
      }
    }, 28);
    return () => clearInterval(tickRef.current);
  }, [activePreset]);

  // Auto-cycle presets
  React.useEffect(() => {
    if (!auto) return;
    clearTimeout(cycleRef.current);
    if (phase === "read") {
      cycleRef.current = setTimeout(() => {
        setActivePreset((p) => (p + 1) % PROMPT_PRESETS.length);
      }, 5800);
    }
    return () => clearTimeout(cycleRef.current);
  }, [phase, auto]);

  return (
    <section className="reveal-section section" id="reveal">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <Reveal>
            <Eyebrow color="#7C6EDB">The Ju Gets You reveal</Eyebrow>
            <h2>One messy sentence. One warm read.</h2>
            <p className="lead" style={{ margin: '0 auto' }}>
              Type the version you'd normally keep inside. Ju reads what's actually underneath — and gives it back to you in language you didn't have to find.
            </p>
          </Reveal>
        </div>

        <div className="reveal-shell">
          <Reveal>
            <div>
              <div className="eyebrow" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: '#7C6EDB' }} />
                Pick a feeling
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {PROMPT_PRESETS.map((p, i) => (
                  <button
                    key={p.label}
                    onClick={() => { setActivePreset(i); setAuto(false); }}
                    style={{
                      textAlign: 'left',
                      padding: '14px 18px',
                      borderRadius: 18,
                      border: '1px solid ' + (i === activePreset ? 'rgba(124,110,219,0.4)' : 'var(--line)'),
                      background: i === activePreset ? 'rgba(124,110,219,0.08)' : 'rgba(255,255,255,0.6)',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: i === activePreset ? 'translateX(6px)' : 'translateX(0)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: i === activePreset ? 'var(--purple)' : 'var(--ink-mute)' }}>
                        {p.label}
                      </span>
                      {i === activePreset && (
                        <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 999, background: 'var(--purple)', color: 'white', fontWeight: 600 }}>now playing</span>
                      )}
                    </div>
                    <div style={{ fontSize: 13.5, lineHeight: 1.45, color: 'var(--ink-soft)' }}>"{p.text}"</div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => { setAuto(true); setActivePreset((activePreset + 1) % PROMPT_PRESETS.length); }}
                className="demo-replay"
                style={{ marginTop: 20 }}
              >
                <Icon.Sparkles size={13} /> Replay with another feeling
              </button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="demo-screen">
              <div className="demo-titlebar">
                <span className="demo-titlebar-dot" />
                <span className="demo-titlebar-dot" />
                <span className="demo-titlebar-dot" />
                <span className="demo-titlebar-label">Nuju · Ju Gets You</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--ink-mute)', fontFamily: 'var(--mono)' }}>
                  {phase === "typing" && "typing…"}
                  {phase === "thinking" && "reading…"}
                  {phase === "read" && "complete"}
                </span>
              </div>

              <div className="demo-prompt">You wrote</div>
              <div className="demo-input-area">
                <div className="demo-input-text">
                  {typed}
                  {phase === "typing" && <span className="demo-cursor" />}
                </div>
              </div>

              {phase === "thinking" && (
                <div style={{ marginTop: 16, padding: 20, borderRadius: 22, background: 'rgba(124,110,219,0.06)', border: '1px solid rgba(124,110,219,0.12)', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <RevealThinkingDots />
                  <div>
                    <div className="eyebrow" style={{ marginBottom: 2 }}>Ju is reading</div>
                    <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>Picking up the shape underneath the words…</div>
                  </div>
                </div>
              )}

              {phase === "read" && (
                <div className="demo-output" style={{ animation: 'revealUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                  <div className="demo-output-label">
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: preset.read.color }} />
                    Ju reads · {preset.read.signal}
                  </div>
                  <h3 style={{ margin: '12px 0 10px', fontFamily: 'var(--display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                    {preset.read.headline}
                  </h3>
                  <div className="demo-output-text">{preset.read.body}</div>
                  <div className="demo-output-meta">
                    {preset.read.tags.map((t) => (
                      <span key={t} className="demo-output-chip">{t}</span>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, padding: 14, borderRadius: 16, background: 'rgba(255,255,255,0.6)', border: '1px solid var(--line)' }}>
                    <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <Icon.Sparkles size={12} /> One gentle next step
                    </div>
                    <div style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink)' }}>{preset.read.next}</div>
                  </div>
                </div>
              )}

              <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
                <div style={{ fontSize: 11.5, color: 'var(--ink-mute)' }}>
                  Read takes ~9 seconds · 100% private
                </div>
                <button
                  className="demo-replay"
                  style={{ marginTop: 0 }}
                  onClick={() => setAuto((a) => !a)}
                >
                  {auto ? <Icon.Pause size={11} /> : <Icon.Play size={11} />}
                  {auto ? "Pause demo" : "Auto-play"}
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

window.RevealDemo = Reveal2;
