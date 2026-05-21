// APP - orchestrates landing sections + theme.

const TWEAK_DEFAULTS = {
  dark: false,
  accent: 'purple',
  animations: 'normal',
  blur: 20,
  showStickyCta: true,
};

const ACCENTS = {
  purple: { '--purple': '#7C6EDB', '--purple-deep': '#5B4FBE', label: 'Purple' },
  teal:   { '--purple': '#4ECDC4', '--purple-deep': '#2FA39B', label: 'Teal' },
  rose:   { '--purple': '#E8878C', '--purple-deep': '#C45F65', label: 'Rose' },
  amber:  { '--purple': '#FFB347', '--purple-deep': '#D88F23', label: 'Amber' },
};

const App = () => {
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const setTweak = React.useCallback((key, value) => {
    setTweaks((current) => ({ ...current, [key]: value }));
  }, []);

  React.useEffect(() => {
    document.body.classList.toggle('dark-mode', !!tweaks.dark);
  }, [tweaks.dark]);

  React.useEffect(() => {
    const accent = ACCENTS[tweaks.accent] || ACCENTS.purple;
    Object.entries(accent).forEach(([k, v]) => {
      if (k.startsWith('--')) document.documentElement.style.setProperty(k, v);
    });
  }, [tweaks.accent]);

  React.useEffect(() => {
    document.documentElement.dataset.anim = tweaks.animations || 'normal';
  }, [tweaks.animations]);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--blur', (tweaks.blur || 20) + 'px');
  }, [tweaks.blur]);

  const start = (plan) => {
    const selectedPlan = typeof plan === 'string' ? plan : '';
    const params = new URLSearchParams({ source: 'landing' });
    if (selectedPlan) params.set('plan', selectedPlan);
    window.top.location.href = `/onboarding?${params.toString()}`;
  };

  return (
    <React.Fragment>
      <Nav onStart={start} onTheme={() => setTweak('dark', !tweaks.dark)} dark={tweaks.dark} />
      <Hero onStart={start} />
      <Painkiller />
      <RevealDemo />
      <Moods />
      <HowItWorks />
      <Pattern />
      <Personas />
      <Testimonials />
      <Pricing onStart={start} />
      <Faq />
      <Footer onStart={start} />
      {tweaks.showStickyCta && <StickyCta onStart={start} />}
    </React.Fragment>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
