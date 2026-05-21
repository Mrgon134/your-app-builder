// Real-feeling "3 AM" scene for the moments Nuju is built around.

const PAIN_CARDS = [
  {
    color: '#E8878C',
    icon: 'Moon',
    title: "It's 3 AM and your brain won't shut up.",
    sub: "The thoughts keep refreshing like a feed you can't close.",
  },
  {
    color: '#6C9BCF',
    icon: 'Brain',
    title: "You feel something, but can't name it.",
    sub: "Tired? Sad? Overwhelmed? It's all of them at once.",
  },
  {
    color: '#FFB347',
    icon: 'Pen',
    title: "Blank journals feel like another chore.",
    sub: "You don't need a writing exercise. You need a read.",
  },
];

const Painkiller = () => {
  return (
    <section className="painkiller section">
      <div className="container">
        <div className="painkiller-grid">
          <div>
            <Reveal>
              <Eyebrow color="#E8878C">Built for the moments words get hard</Eyebrow>
              <h2 className="painkiller-headline">
                For the feeling you <em>can't</em> explain.<br/>
                For the night you <em>can't</em> end.
              </h2>
              <p className="painkiller-body">
                Most journaling apps ask you to write more. Nuju asks one honest sentence, then gives you back something that finally sounds like what you meant.
              </p>
            </Reveal>

            <div className="painkiller-cards">
              {PAIN_CARDS.map((c, i) => {
                const IconC = Icon[c.icon];
                return (
                  <Reveal key={c.title} delay={i * 80}>
                    <div className="painkiller-card">
                      <div className="painkiller-card-icon" style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}cc)` }}>
                        <IconC size={18} />
                      </div>
                      <div className="painkiller-card-text">
                        {c.title}
                        <small>{c.sub}</small>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={120}>
            <NightScene />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const NightScene = () => {
  const [showResponse, setShowResponse] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => setShowResponse(true), 1200);
        }
      });
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div className="scene" ref={ref}>
      <div className="scene-stars" />
      <div className="scene-moon" />

      <div className="scene-clock">
        <div className="scene-clock-time">3:14</div>
        <div className="scene-clock-label">tuesday - still awake</div>
      </div>

      <div className="thought-bubble tb-1">"Did I sound weird in that meeting?"</div>
      <div className="thought-bubble tb-2">"Why do I feel this empty when nothing's wrong?"</div>
      <div className="thought-bubble tb-3">"I'll sleep after one more scroll..."</div>

      {showResponse && (
        <div className="scene-response">
          <div className="scene-response-row">
            <span style={{ width: 8, height: 8, borderRadius: 999, background: '#4ECDC4' }} />
            Ju gets it
          </div>
          <div className="scene-response-text">
            You're not bad at sleeping. You're a person whose day didn't get to finish.
          </div>
        </div>
      )}
    </div>
  );
};

window.Painkiller = Painkiller;
