// FAQ — accordion list with smooth height animation.

const FAQS = [
  {
    q: "Do I need to pay to try Nuju?",
    a: "No. You start with the Ju Gets You reveal — completely free, no card. If the read lands the way you hoped, you can keep Ju close with a weekly, 3-month, or lifetime plan.",
  },
  {
    q: "Is this therapy?",
    a: "No, and we never pretend otherwise. Nuju is a reflective tool for naming what you feel and noticing patterns. If you're in crisis, please reach out to a professional or local helpline.",
  },
  {
    q: "What actually happens in 'the reveal'?",
    a: "You write or speak one honest sentence. Ju reads what's underneath the words, names the emotional shape, gives you one gentle next move, and saves the read to your private timeline. About 60 seconds total.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Entries are encrypted at rest, scoped to your account, and never used to train AI models. We don't sell data and don't run ads. Read the full Privacy page for the receipts.",
  },
  {
    q: "What if I'm bad at journaling?",
    a: "Then this might be the only journal that works for you. Nuju doesn't grade. One sentence is plenty. A half-formed thought is plenty. The whole point is meeting you under the bar most apps set.",
  },
  {
    q: "Can I use Nuju on my phone?",
    a: "Yes - Nuju is available on web and iOS. On Android, you can use the web app from your browser.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Weekly and 3-month plans can be managed or cancelled from your account or App Store settings, depending on where you subscribed. Lifetime is a one-time purchase.",
  },
];

const Faq = () => {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="faq-section section" id="faq">
      <div className="container container-narrow">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Reveal>
            <Eyebrow color="#6C9BCF">Questions</Eyebrow>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(34px, 4.5vw, 54px)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.02, margin: '16px 0 16px' }}>
              Things people actually ask.
            </h2>
          </Reveal>
        </div>

        <div className="faq-list">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 30}>
              <FaqItem item={f} open={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
            </Reveal>
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: 'center', fontSize: 14, color: 'var(--ink-soft)' }}>
          Still wondering something? <a href="/support" style={{ color: 'var(--purple)', fontWeight: 600 }}>Contact support</a> — a human reads them all.
        </div>
      </div>
    </section>
  );
};

const FaqItem = ({ item, open, onClick }) => {
  const ref = React.useRef(null);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-q" onClick={onClick} aria-expanded={open}>
        <span>{item.q}</span>
        <span className="faq-icon">
          <Icon.ChevronDown size={18} />
        </span>
      </button>
      <div
        className="faq-a-wrap"
        style={{
          maxHeight: open ? (ref.current?.scrollHeight ?? 600) + 'px' : 0,
        }}
      >
        <div className="faq-a" ref={ref}>
          {item.a}
        </div>
      </div>
    </div>
  );
};

window.Faq = Faq;
