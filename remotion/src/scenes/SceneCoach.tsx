import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/DMSans";
import { COLORS } from "../styles";
import { PhoneMockup } from "../components/PhoneMockup";
import { StepIndicator } from "../components/StepIndicator";

const { fontFamily: dmSans } = loadFont("normal", { weights: ["400", "700", "800"], subsets: ["latin"] });

const chatMessages = [
  { role: "user", text: "I'm feeling anxious about my deadline next week..." },
  { role: "ai", text: "I hear you, and that feeling is completely valid. Let's break it down — what's the one smallest thing you can finish today? 💜" },
];

export const SceneCoach: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneS = spring({ frame: frame - 10, fps, config: { damping: 15 } });
  const phoneOp = interpolate(phoneS, [0, 1], [0, 1]);

  const msg1S = spring({ frame: frame - 30, fps, config: { damping: 15 } });
  const msg1Op = interpolate(msg1S, [0, 1], [0, 1]);
  const msg1Y = interpolate(msg1S, [0, 1], [20, 0]);

  const showDots = frame > 55 && frame < 80;

  const msg2S = spring({ frame: frame - 80, fps, config: { damping: 15 } });
  const msg2Op = interpolate(msg2S, [0, 1], [0, 1]);
  const msg2Y = interpolate(msg2S, [0, 1], [20, 0]);

  const aiText = chatMessages[1].text;
  const aiChars = Math.min(aiText.length, Math.max(0, Math.floor((frame - 80) * 1.2)));
  const typedAi = aiText.slice(0, aiChars);

  return (
    <AbsoluteFill
      style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}
    >
      <Sequence from={0}>
        <StepIndicator step={5} label="Chat with Ju" delay={0} />
      </Sequence>

      <div style={{ opacity: phoneOp }}>
        <PhoneMockup>
          <div
            style={{
              padding: "60px 20px 20px",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              background: COLORS.bg,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
                paddingBottom: 16,
                borderBottom: `1px solid ${COLORS.primary}10`,
              }}
            >
              <span style={{ fontFamily: dmSans, fontSize: 16, color: COLORS.muted }}>←</span>
              <div style={{ fontFamily: dmSans, fontSize: 20, fontWeight: 800, color: COLORS.text }}>
                AI Coach
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              {[
                { name: "Gentle", color: "#B8C4F0", active: true },
                { name: "Tough", color: "#D4A0D0", active: false },
                { name: "Wise", color: "#E8D5A3", active: false },
                { name: "Fun", color: "#A8E6CF", active: false },
              ].map((p) => (
                <div
                  key={p.name}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 20,
                    background: p.active ? p.color : `${p.color}30`,
                    fontFamily: dmSans,
                    fontSize: 12,
                    fontWeight: p.active ? 700 : 400,
                    color: p.active ? COLORS.text : COLORS.muted,
                    border: p.active ? `2px solid ${p.color}` : "none",
                  }}
                >
                  {p.name}
                </div>
              ))}
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                style={{
                  alignSelf: "flex-end",
                  maxWidth: "80%",
                  padding: "14px 18px",
                  borderRadius: "20px 20px 4px 20px",
                  background: COLORS.primary,
                  color: COLORS.white,
                  fontFamily: dmSans,
                  fontSize: 14,
                  lineHeight: 1.5,
                  opacity: msg1Op,
                  transform: `translateY(${msg1Y}px)`,
                }}
              >
                {chatMessages[0].text}
              </div>

              {showDots && (
                <div
                  style={{
                    alignSelf: "flex-start",
                    padding: "14px 20px",
                    borderRadius: "20px 20px 20px 4px",
                    background: COLORS.white,
                    border: `1px solid ${COLORS.primary}15`,
                    display: "flex",
                    gap: 6,
                  }}
                >
                  {[0, 1, 2].map((d) => {
                    const dotOp = interpolate((frame + d * 8) % 24, [0, 12, 24], [0.3, 1, 0.3]);
                    return (
                      <div
                        key={d}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          background: COLORS.primary,
                          opacity: dotOp,
                        }}
                      />
                    );
                  })}
                </div>
              )}

              {frame > 78 && (
                <div
                  style={{
                    alignSelf: "flex-start",
                    maxWidth: "85%",
                    padding: "14px 18px",
                    borderRadius: "20px 20px 20px 4px",
                    background: COLORS.white,
                    border: `1px solid #B8C4F040`,
                    fontFamily: dmSans,
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: COLORS.text,
                    opacity: msg2Op,
                    transform: `translateY(${msg2Y}px)`,
                  }}
                >
                  {typedAi}
                  {aiChars < aiText.length && frame % 16 < 8 && (
                    <span style={{ color: COLORS.primary }}>|</span>
                  )}
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                padding: "12px 0",
                borderTop: `1px solid ${COLORS.primary}10`,
                marginTop: 12,
              }}
            >
              <div
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  borderRadius: 20,
                  background: COLORS.white,
                  border: `1px solid ${COLORS.primary}15`,
                  fontFamily: dmSans,
                  fontSize: 14,
                  color: COLORS.muted,
                }}
              >
                Talk to Ju...
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  background: COLORS.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                ➤
              </div>
            </div>
          </div>
        </PhoneMockup>
      </div>
    </AbsoluteFill>
  );
};
