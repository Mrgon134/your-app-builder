import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/DMSans";
import { COLORS } from "../styles";
import { PhoneMockup } from "../components/PhoneMockup";
import { StepIndicator } from "../components/StepIndicator";

const { fontFamily: dmSans } = loadFont("normal", { weights: ["400", "700", "800"], subsets: ["latin"] });

const moods = [
  { label: "Berat", color: COLORS.mood1, emoji: "😢", value: 1 },
  { label: "Murung", color: COLORS.mood2, emoji: "😔", value: 2 },
  { label: "Biasa", color: COLORS.mood3, emoji: "😐", value: 3 },
  { label: "Baik", color: COLORS.mood4, emoji: "😊", value: 4 },
  { label: "Senang", color: COLORS.mood5, emoji: "😄", value: 5 },
];

export const SceneMood: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneS = spring({ frame: frame - 10, fps, config: { damping: 15 } });
  const phoneScale = interpolate(phoneS, [0, 1], [0.8, 1]);
  const phoneOp = interpolate(phoneS, [0, 1], [0, 1]);

  // Mood selection animation — highlight mood 4 at frame 70
  const selectedMood = frame > 70 ? 4 : -1;
  const selectionPop = selectedMood === 4 ? spring({ frame: frame - 70, fps, config: { damping: 10 } }) : 0;

  // Energy slider
  const energyValue = interpolate(frame, [85, 110], [20, 72], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}
    >
      <Sequence from={0}>
        <StepIndicator step={2} label="Pilih Mood" delay={0} />
      </Sequence>

      <div style={{ opacity: phoneOp, transform: `scale(${phoneScale})` }}>
        <PhoneMockup>
          <div
            style={{
              padding: "70px 24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              height: "100%",
              background: COLORS.bg,
            }}
          >
            {/* Greeting */}
            <div style={{ fontFamily: dmSans, fontSize: 14, color: COLORS.muted }}>Selamat siang 👋</div>
            <div style={{ fontFamily: dmSans, fontSize: 26, fontWeight: 800, color: COLORS.text }}>
              Apa kabar hari ini?
            </div>

            {/* Mood buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
              {moods.map((m, i) => {
                const isSelected = m.value === selectedMood;
                const moodS = spring({ frame: frame - (25 + i * 8), fps, config: { damping: 12 } });
                const moodScale = interpolate(moodS, [0, 1], [0, 1]);
                const popScale = isSelected ? interpolate(selectionPop, [0, 1], [1, 1.15]) : 1;

                return (
                  <div
                    key={m.value}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                      transform: `scale(${moodScale * popScale})`,
                    }}
                  >
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 18,
                        background: isSelected ? m.color : `${m.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 28,
                        border: isSelected ? `3px solid ${m.color}` : "none",
                        boxShadow: isSelected ? `0 6px 20px ${m.color}50` : "none",
                      }}
                    >
                      {m.emoji}
                    </div>
                    <span style={{ fontFamily: dmSans, fontSize: 11, fontWeight: isSelected ? 700 : 400, color: isSelected ? m.color : COLORS.muted }}>
                      {m.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Energy slider */}
            <div style={{ marginTop: 16 }}>
              <div style={{ fontFamily: dmSans, fontSize: 14, fontWeight: 600, color: COLORS.text, marginBottom: 8 }}>
                Level Energi
              </div>
              <div style={{ position: "relative", height: 8, borderRadius: 4, background: `${COLORS.primary}15` }}>
                <div
                  style={{
                    width: `${energyValue}%`,
                    height: "100%",
                    borderRadius: 4,
                    background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: `${energyValue}%`,
                    top: -8,
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    background: COLORS.primary,
                    border: `3px solid ${COLORS.white}`,
                    transform: "translateX(-50%)",
                    boxShadow: `0 2px 8px ${COLORS.primary}40`,
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                <span style={{ fontFamily: dmSans, fontSize: 11, color: COLORS.muted }}>Capek</span>
                <span style={{ fontFamily: dmSans, fontSize: 11, color: COLORS.muted }}>Berenergi</span>
              </div>
            </div>

            {/* Prompt card */}
            <div
              style={{
                marginTop: 16,
                padding: 20,
                borderRadius: 20,
                background: `${COLORS.white}`,
                border: `1px solid ${COLORS.primary}15`,
                boxShadow: `0 4px 16px rgba(0,0,0,0.04)`,
              }}
            >
              <div style={{ fontFamily: dmSans, fontSize: 12, color: COLORS.primary, fontWeight: 700, marginBottom: 8 }}>
                Prompt hari ini ✨
              </div>
              <div style={{ fontFamily: dmSans, fontSize: 15, color: COLORS.text, lineHeight: 1.5 }}>
                Apa yang membuatmu tersenyum hari ini?
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <div
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: 16,
                  background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                  textAlign: "center",
                  fontFamily: dmSans,
                  fontSize: 15,
                  fontWeight: 700,
                  color: COLORS.white,
                }}
              >
                ✍️ Tulis
              </div>
              <div
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: 16,
                  background: COLORS.white,
                  textAlign: "center",
                  fontFamily: dmSans,
                  fontSize: 15,
                  fontWeight: 700,
                  color: COLORS.primary,
                  border: `1px solid ${COLORS.primary}30`,
                }}
              >
                💬 Bicara
              </div>
            </div>
          </div>
        </PhoneMockup>
      </div>
    </AbsoluteFill>
  );
};
