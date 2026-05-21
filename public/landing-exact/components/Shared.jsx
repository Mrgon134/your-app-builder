// Shared primitives — Aurora bg, Reveal wrapper, signal pills, etc.

const Aurora = ({ withCursor = false }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!withCursor) return;
    const el = ref.current;
    if (!el) return;
    const handler = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--mx', x + '%');
      el.style.setProperty('--my', y + '%');
    };
    el.addEventListener('pointermove', handler);
    return () => el.removeEventListener('pointermove', handler);
  }, [withCursor]);
  return (
    <div className="aurora-stage" ref={ref}>
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />
      <div className="blob b4" />
      <div className="grain" />
      {withCursor && <div className="cursor-glow" />}
    </div>
  );
};

// Scroll-driven reveal wrapper.
const Reveal = ({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add('in'), delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${className}`} {...rest}>{children}</Tag>;
};

// Eyebrow label with dot
const Eyebrow = ({ color = '#7C6EDB', children }) => (
  <div className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
    <span style={{ width: 6, height: 6, borderRadius: 999, background: color, boxShadow: `0 0 12px ${color}` }} />
    {children}
  </div>
);

// Glass card primitive
const Glass = ({ className = '', strong = false, style, children, ...rest }) => (
  <div
    className={`glass ${strong ? 'glass-strong' : ''} ${className}`}
    style={style}
    {...rest}
  >
    {children}
  </div>
);

// Star rating
const Stars = ({ n = 5 }) => (
  <div style={{ display: 'inline-flex', gap: 2, color: '#FFB347' }}>
    {Array.from({ length: n }).map((_, i) => <Icon.Star key={i} size={14} />)}
  </div>
);

// Mini animated wave for voice/audio
const VoiceWave = ({ color = '#7C6EDB', count = 24 }) => (
  <div style={{ display: 'inline-flex', gap: 3, alignItems: 'center', height: 18 }}>
    {Array.from({ length: count }).map((_, i) => {
      const h = 4 + Math.sin(i * 0.7) * 4 + (i % 3) * 3;
      return (
        <span
          key={i}
          style={{
            width: 2,
            height: `${h}px`,
            background: color,
            borderRadius: 4,
            animation: `breathe ${1.2 + (i % 4) * 0.15}s ease-in-out infinite`,
            animationDelay: `${i * 0.05}s`,
            opacity: 0.85,
          }}
        />
      );
    })}
  </div>
);

window.Aurora = Aurora;
window.Reveal = Reveal;
window.Eyebrow = Eyebrow;
window.Glass = Glass;
window.Stars = Stars;
window.VoiceWave = VoiceWave;
