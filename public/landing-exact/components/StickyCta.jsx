// STICKY CTA — appears after scrolling past hero.

const StickyCta = ({ onStart }) => {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800 && window.scrollY < (document.documentElement.scrollHeight - window.innerHeight - 600));
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={`sticky-cta ${show ? 'show' : ''}`}>
      <div className="sticky-cta-inner">
        <span style={{ width: 28, height: 28, borderRadius: 999, background: 'linear-gradient(135deg, #C8B8FF, #7C6EDB)', display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
          <img src="src/assets/ju-main.png" style={{ width: 22, height: 22 }} />
        </span>
        <span>
          <strong>Ju is waiting.</strong> One sentence, free.
        </span>
        <button className="btn-primary" onClick={onStart}>
          Try Nuju free
          <Icon.Arrow size={13} />
        </button>
      </div>
    </div>
  );
};

window.StickyCta = StickyCta;
