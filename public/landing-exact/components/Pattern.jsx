// PATTERN — animated mood pattern viz that shows
// emotional throughlines forming across 30 days.

const Pattern = () => {
  const [active, setActive] = React.useState('week');
  const data = active === 'week'
    ? [3, 2, 4, 5, 2, 1, 3]
    : active === 'month'
      ? [3, 4, 2, 3, 5, 1, 2, 4, 3, 5, 2, 1, 3, 4, 2, 5, 4, 3, 1, 2, 4, 3, 5, 2, 1, 4, 3, 5, 2, 4]
      : [4, 3, 5, 2, 4, 1, 3, 5, 2, 4, 3, 1];
  const labels = active === 'week' ? ['M','T','W','T','F','S','S'] : null;

  const moodColors = ['#E8878C', '#6C9BCF', '#FFB347', '#95E1D3', '#4ECDC4'];

  return (
    <section className="pattern-section section">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 56px' }}>
          <Reveal>
            <Eyebrow color="#FFB347">Pattern detection</Eyebrow>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.02, margin: '16px 0 16px' }}>
              Your hard days have <em style={{ fontStyle: 'normal', color: 'var(--purple)' }}>a shape.</em>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: 560, margin: '0 auto' }}>
              Nuju watches without judging. Across days, it shows you what your low energy keeps having in common — so you stop feeling random.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="pattern-card glass">
            <div className="pattern-header">
              <div>
                <div className="eyebrow">Mood signal · last {active === 'week' ? '7 days' : active === 'month' ? '30 days' : '12 weeks'}</div>
                <div style={{ fontFamily: 'var(--display)', fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 4 }}>
                  Tuesdays cost you the most.
                </div>
              </div>
              <div className="pattern-tabs">
                {['week', 'month', 'quarter'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActive(t)}
                    className={t === active ? 'active' : ''}
                  >
                    {t === 'week' ? '7d' : t === 'month' ? '30d' : '12w'}
                  </button>
                ))}
              </div>
            </div>

            <div className="pattern-chart">
              <svg viewBox="0 0 800 240" preserveAspectRatio="none" style={{ width: '100%', height: 240 }}>
                <defs>
                  <linearGradient id="pat-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C6EDB" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#7C6EDB" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="pat-line" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6C9BCF" />
                    <stop offset="50%" stopColor="#7C6EDB" />
                    <stop offset="100%" stopColor="#4ECDC4" />
                  </linearGradient>
                </defs>

                {/* grid lines */}
                {[0, 1, 2, 3, 4].map((g) => (
                  <line key={g} x1="0" x2="800" y1={40 + g * 40} y2={40 + g * 40} stroke="rgba(26,23,38,0.06)" strokeDasharray="2 4" />
                ))}

                {(() => {
                  const w = 800;
                  const h = 240;
                  const step = w / (data.length - 1);
                  const pts = data.map((v, i) => [i * step, h - 20 - v * 36]);
                  const linePath = pts.reduce((acc, [x, y], i) => {
                    if (i === 0) return `M ${x},${y}`;
                    const [px, py] = pts[i - 1];
                    const cx1 = px + step / 2;
                    const cx2 = x - step / 2;
                    return `${acc} C ${cx1},${py} ${cx2},${y} ${x},${y}`;
                  }, '');
                  const areaPath = `${linePath} L ${w},${h} L 0,${h} Z`;
                  return (
                    <g>
                      <path d={areaPath} fill="url(#pat-area)" />
                      <path
                        d={linePath}
                        stroke="url(#pat-line)"
                        strokeWidth="3.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="2000"
                        strokeDashoffset="0"
                        className="pattern-line-anim"
                      />
                      {pts.map(([x, y], i) => (
                        <g key={i}>
                          <circle cx={x} cy={y} r="6" fill="white" stroke={moodColors[Math.max(0, Math.min(4, data[i] - 1))]} strokeWidth="2.5" />
                        </g>
                      ))}

                      {/* annotation pin on the lowest dip */}
                      {(() => {
                        const minIdx = data.indexOf(Math.min(...data));
                        const [x, y] = pts[minIdx];
                        return (
                          <g>
                            <line x1={x} x2={x} y1={y - 12} y2={y - 38} stroke="rgba(26,23,38,0.3)" strokeDasharray="2 3" />
                            <rect x={x - 60} y={y - 70} width="120" height="30" rx="15" fill="rgba(255,255,255,0.95)" stroke="rgba(124,110,219,0.3)" />
                            <text x={x} y={y - 50} textAnchor="middle" fontSize="11" fontWeight="600" fill="#1A1726" fontFamily="var(--body)">Said yes too much</text>
                          </g>
                        );
                      })()}
                    </g>
                  );
                })()}
              </svg>
              {labels && (
                <div className="pattern-labels">
                  {labels.map((l, i) => (
                    <span key={i} className={i === 1 ? 'highlight' : ''}>{l}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="pattern-insights">
              {[
                { dot: '#E8878C', label: 'Trigger', body: 'Back-to-back meetings without quiet between.' },
                { dot: '#7C6EDB', label: 'Pattern', body: 'Energy drops 6h after the day\u2019s third "yes."' },
                { dot: '#4ECDC4', label: 'Move', body: 'Protect one low-input hour before Tuesday 3pm.' },
              ].map((it) => (
                <div key={it.label} className="pattern-insight">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 999, background: it.dot }} />
                    <span className="eyebrow">{it.label}</span>
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ink)', fontWeight: 500 }}>{it.body}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

window.Pattern = Pattern;
