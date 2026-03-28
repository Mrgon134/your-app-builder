import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONT_BODY } from "../styles";

export const StepIndicator: React.FC<{
  step: number;
  label: string;
  delay?: number;
}> = ({ step, label, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 200 } });
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const scale = interpolate(s, [0, 1], [0.5, 1]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: COLORS.white,
          fontFamily: FONT_BODY,
          fontSize: 24,
          fontWeight: 800,
          boxShadow: `0 8px 24px ${COLORS.primary}40`,
        }}
      >
        {step}
      </div>
      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: 28,
          fontWeight: 700,
          color: COLORS.text,
        }}
      >
        {label}
      </span>
    </div>
  );
};
