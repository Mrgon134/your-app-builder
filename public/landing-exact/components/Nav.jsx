const Nav = ({ onStart, onTheme, dark }) => {
  return (
    <div className="nav-shell">
      <div className="nav">
        <a className="nav-logo" href="/" aria-label="Nuju home">
          <div className="nav-logo-orb">
            <img src="/landing-exact/src/assets/ju-main.png" alt="" />
          </div>
          <span>Nuju</span>
        </a>
        <div className="nav-links">
          <button className="nav-link" onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}>How it works</button>
          <button className="nav-link" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>Pricing</button>
          <button className="nav-link" onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}>FAQ</button>
          <button className="nav-link" onClick={onTheme} aria-label="Toggle theme" style={{ width: 36, padding: 0, justifyContent: 'center' }}>
            {dark ? <Icon.Sun size={15} /> : <Icon.Moon size={15} />}
          </button>
          <button className="btn-primary btn-sm nav-cta" onClick={onStart}>
            Try Nuju free
            <Icon.Arrow size={14} />
          </button>
          <AppStoreButton label="App Store" compact className="nav-appstore" />
        </div>
      </div>
    </div>
  );
};

window.Nav = Nav;
