import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/DMSans";
import { loadFont as loadLora } from "@remotion/google-fonts/Lora";
import { COLORS, FONT_BODY, FONT_SERIF } from "../styles";

const { fontFamily: dmSans } = loadFont("normal", { weights: ["400", "700", "800"], subsets: ["latin"] });
const { fontFamily: lora } = loadLora("normal", { weights: ["400", "700"], subsets: ["latin"] });

export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo scale
  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const logoOpacity = interpolate(logoScale, [0, 1], [0, 1]);

  // Title
  const titleS = spring({ frame: frame - 20, fps, config: { damping: 15 } });
  const titleY = interpolate(titleS, [0, 1], [60, 0]);
  const titleOp = interpolate(titleS, [0, 1], [0, 1]);

  // Subtitle
  const subS = spring({ frame: frame - 40, fps, config: { damping: 15 } });
  const subY = interpolate(subS, [0, 1], [40, 0]);
  const subOp = interpolate(subS, [0, 1], [0, 1]);

  // "Tutorial" badge
  const badgeS = spring({ frame: frame - 55, fps, config: { damping: 10, stiffness: 200 } });
  const badgeScale = interpolate(badgeS, [0, 1], [0.3, 1]);

  // Decorative circle
  const circleScale = interpolate(frame, [0, 120], [0.5, 1.2], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
      }}
    >
      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.primary}20, transparent 70%)`,
          transform: `scale(${circleScale})`,
        }}
      />

      {/* Nuju logo text */}
      <div
        style={{
          fontFamily: lora,
          fontSize: 120,
          fontWeight: 700,
          color: COLORS.primary,
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          letterSpacing: -3,
        }}
      >
        nuju
      </div>

      {/* Tagline */}
      <div
        style={{
          fontFamily: dmSans,
          fontSize: 32,
          fontWeight: 400,
          color: COLORS.muted,
          opacity: titleOp,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          maxWidth: 700,
          lineHeight: 1.4,
        }}
      >
        AI journal yang memahami hidupmu
      </div>

      {/* Tutorial badge */}
      <div
        style={{
          marginTop: 20,
          padding: "16px 48px",
          borderRadius: 40,
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
          opacity: subOp,
          transform: `translateY(${subY}px) scale(${badgeScale})`,
          boxShadow: `0 12px 40px ${COLORS.primary}50`,
        }}
      >
        <span
          style={{
            fontFamily: dmSans,
            fontSize: 28,
            fontWeight: 800,
            color: COLORS.white,
            letterSpacing: 2,
          }}
        >
          📖  TUTORIAL
        </span>
      </div>
    </AbsoluteFill>
  );
};
