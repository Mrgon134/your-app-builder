import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/DMSans";
import { COLORS } from "../styles";
import { PhoneMockup } from "../components/PhoneMockup";
import { StepIndicator } from "../components/StepIndicator";

const { fontFamily: dmSans } = loadFont("normal", { weights: ["400", "700", "800"], subsets: ["latin"] });

const weekDays = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const moodData = [3, 2, 4, 3, 5, 4, 4];
const moodColors = [COLORS.mood3, COLORS.mood2, COLORS.mood4, COLORS.mood3, COLORS.mood5, COLORS.mood4, COLORS.mood4];

export const SceneInsights: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneS = spring({ frame: frame - 10, fps, config: { damping: 15 } });
  const phoneOp = interpolate(phoneS, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}
    >
      <Sequence from={0}>
        <StepIndicator step={4} label="Lihat Insights" delay={0} />
      </Sequence>

      <div style={{ opacity: phoneOp }}>
        <PhoneMockup>
          <div
            style={{
              padding: "60px 20px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              height: "100%",
              background: COLORS.bg,
              overflow: "hidden",
            }}
          >
            <div style={{ fontFamily: dmSans, fontSize: 24, fontWeight: 800, color: COLORS.text }}>
              Galeri Pikiranmu ✨
            </div>

            {/* Weekly mood bars */}
            <div
              style={{
                padding: 16,
                borderRadius: 20,
                background: COLORS.white,
                border: `1px solid ${COLORS.primary}10`,
              }}
            >
              <div style={{ fontFamily: dmSans, fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 12 }}>
                Mood minggu ini
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: 100 }}>
                {weekDays.map((day, i) => {
                  const barS = spring({ frame: frame - (30 + i * 8), fps, config: { damping: 12 } });
                  const barH = interpolate(barS, [0, 1], [0, moodData[i] * 18]);
                  return (
                    <div key={day} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div
                        style={{
                          width: 32,
                          height: barH,
                          borderRadius: 10,
                          background: `linear-gradient(180deg, ${moodColors[i]}, ${moodColors[i]}80)`,
                        }}
                      />
                      <span style={{ fontFamily: dmSans, fontSize: 10, color: COLORS.muted }}>{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { label: "Rata-rata", value: "3.6", icon: "📊" },
                { label: "Streak", value: "7🔥", icon: "" },
                { label: "Entri", value: "23", icon: "📝" },
              ].map((stat, i) => {
                const statS = spring({ frame: frame - (50 + i * 10), fps, config: { damping: 12 } });
                const statScale = interpolate(statS, [0, 1], [0.5, 1]);
                return (
                  <div
                    key={stat.label}
                    style={{
                      flex: 1,
                      padding: "14px 10px",
                      borderRadius: 16,
                      background: COLORS.white,
                      textAlign: "center",
                      transform: `scale(${statScale})`,
                      border: `1px solid ${COLORS.primary}10`,
                    }}
                  >
                    <div style={{ fontFamily: dmSans, fontSize: 22, fontWeight: 800, color: COLORS.primary }}>
                      {stat.value}
                    </div>
                    <div style={{ fontFamily: dmSans, fontSize: 10, color: COLORS.muted }}>{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Ju remembers card */}
            <div
              style={{
                padding: 16,
                borderRadius: 20,
                background: `linear-gradient(135deg, ${COLORS.primary}08, ${COLORS.primaryLight}08)`,
                border: `1px solid ${COLORS.primary}15`,
              }}
            >
              <div style={{ fontFamily: dmSans, fontSize: 13, fontWeight: 700, color: COLORS.primary, marginBottom: 8 }}>
                🧠 Ju ingat...
              </div>
              <div style={{ fontFamily: dmSans, fontSize: 13, color: COLORS.text, lineHeight: 1.5 }}>
                Kamu cenderung merasa lebih baik di akhir pekan. Menulis di malam hari memperbaiki mood pagi berikutnya.
              </div>
            </div>

            {/* Month grid preview */}
            <div
              style={{
                padding: 16,
                borderRadius: 20,
                background: COLORS.white,
                border: `1px solid ${COLORS.primary}10`,
              }}
            >
              <div style={{ fontFamily: dmSans, fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 10 }}>
                Sebulan sekilas
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {Array.from({ length: 30 }, (_, i) => {
                  const c = [COLORS.mood3, COLORS.mood4, COLORS.mood5, COLORS.mood2, COLORS.mood4, COLORS.mood1][i % 6];
                  const pixelS = spring({ frame: frame - (60 + i * 1.5), fps, config: { damping: 15 } });
                  const pixelOp = interpolate(pixelS, [0, 1], [0, 1]);
                  return (
                    <div
                      key={i}
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 5,
                        background: i < 23 ? c : `${COLORS.primary}10`,
                        opacity: pixelOp,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </PhoneMockup>
      </div>
    </AbsoluteFill>
  );
};
