import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/DMSans";
import { COLORS } from "../styles";
import { PhoneMockup } from "../components/PhoneMockup";
import { StepIndicator } from "../components/StepIndicator";

const { fontFamily: dmSans } = loadFont("normal", { weights: ["400", "700", "800"], subsets: ["latin"] });

const moods = [
  { label: "Rough", color: COLORS.mood1, emoji: "😢", value: 1 },
  { label: "Low", color: COLORS.mood2, emoji: "😔", value: 2 },
  { label: "Okay", color: COLORS.mood3, emoji: "😐", value: 3 },
  { label: "Good", color: COLORS.mood4, emoji: "😊", value: 4 },
  { label: "Great", color: COLORS.mood5, emoji: "😄", value: 5 },
];

export const SceneMood: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneS = spring({ frame: frame - 10, fps, config: { damping: 15 } });
  const phoneScale = interpolate(phoneS, [0, 1], [0.8, 1]);
  const phoneOp = interpolate(phoneS, [0, 1], [0, 1]);

  const selectedMood = frame > 70 ? 4 : -1;
  const selectionPop = selectedMood === 4 ? spring({ frame: frame - 70, fps, config: { damping: 10 } }) : 0;

  const energyValue = interpolate(frame, [85, 110], [20, 72], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}
    >
      <Sequence from={0}>
        <StepIndicator step={2} label="Pick Your Mood" delay={0} />
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
            <div style={{ fontFamily: dmSans, fontSize: 14, color: COLORS.muted }}>Good afternoon 👋</div>
            <div style={{ fontFamily: dmSans, fontSize: 26, fontWeight: 800, color: COLORS.text }}>
              How are you feeling?
            </div>

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

            <div style={{ marginTop: 16 }}>
              <div style={{ fontFamily: dmSans, fontSize: 14, fontWeight: 600, color: COLORS.text, marginBottom: 8 }}>
                Energy Level
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
                <span style={{ fontFamily: dmSans, fontSize: 11, color: COLORS.muted }}>Drained</span>
                <span style={{ fontFamily: dmSans, fontSize: 11, color: COLORS.muted }}>Energized</span>
              </div>
            </div>

            <div
              style={{
                marginTop: 16,
                padding: 20,
                borderRadius: 20,
                background: COLORS.white,
                border: `1px solid ${COLORS.primary}15`,
                boxShadow: `0 4px 16px rgba(0,0,0,0.04)`,
              }}
            >
              <div style={{ fontFamily: dmSans, fontSize: 12, color: COLORS.primary, fontWeight: 700, marginBottom: 8 }}>
                Today's prompt ✨
              </div>
              <div style={{ fontFamily: dmSans, fontSize: 15, color: COLORS.text, lineHeight: 1.5 }}>
                What made you smile today, even just a little?
              </div>
            </div>

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
                ✍️ Write
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
                💬 Talk
              </div>
            </div>
          </div>
        </PhoneMockup>
      </div>
    </AbsoluteFill>
  );
};
