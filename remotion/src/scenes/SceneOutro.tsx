import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/DMSans";
import { loadFont as loadLora } from "@remotion/google-fonts/Lora";
import { COLORS } from "../styles";

const { fontFamily: dmSans } = loadFont("normal", { weights: ["400", "700", "800"], subsets: ["latin"] });
const { fontFamily: lora } = loadLora("normal", { weights: ["400", "700"], subsets: ["latin"] });

const features = [
  "📝 30-second daily journal",
  "🧠 AI-powered insights",
  "💬 Personal coaching chat",
  "📊 Mood trends & analytics",
  "🔥 Streaks & daily motivation",
];

export const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoS = spring({ frame, fps, config: { damping: 12 } });
  const logoScale = interpolate(logoS, [0, 1], [0.5, 1]);

  const floatY = Math.sin(frame / 20) * 5;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 36,
      }}
    >
      <div
        style={{
          fontFamily: lora,
          fontSize: 100,
          fontWeight: 700,
          color: COLORS.primary,
          transform: `scale(${logoScale}) translateY(${floatY}px)`,
          letterSpacing: -2,
        }}
      >
        nuju
      </div>

      <div
        style={{
          fontFamily: dmSans,
          fontSize: 30,
          fontWeight: 700,
          color: COLORS.text,
          textAlign: "center",
          maxWidth: 700,
          lineHeight: 1.4,
          opacity: interpolate(spring({ frame: frame - 15, fps, config: { damping: 15 } }), [0, 1], [0, 1]),
        }}
      >
        Start your journaling journey
        <br />
        today 💜
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 10 }}>
        {features.map((f, i) => {
          const fS = spring({ frame: frame - (30 + i * 10), fps, config: { damping: 15 } });
          const fOp = interpolate(fS, [0, 1], [0, 1]);
          const fX = interpolate(fS, [0, 1], [-40, 0]);
          return (
            <div
              key={i}
              style={{
                fontFamily: dmSans,
                fontSize: 24,
                color: COLORS.text,
                opacity: fOp,
                transform: `translateX(${fX}px)`,
              }}
            >
              {f}
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 20,
          padding: "20px 60px",
          borderRadius: 30,
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
          fontFamily: dmSans,
          fontSize: 26,
          fontWeight: 800,
          color: COLORS.white,
          boxShadow: `0 16px 48px ${COLORS.primary}40`,
          opacity: interpolate(spring({ frame: frame - 80, fps, config: { damping: 12 } }), [0, 1], [0, 1]),
          transform: `scale(${interpolate(spring({ frame: frame - 80, fps, config: { damping: 10 } }), [0, 1], [0.5, 1])})`,
        }}
      >
        nuju.app
      </div>
    </AbsoluteFill>
  );
};
