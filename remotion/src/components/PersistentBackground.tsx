import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../styles";

export const PersistentBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const hue1 = interpolate(frame, [0, 900], [250, 290]);
  const hue2 = interpolate(frame, [0, 900], [270, 320]);
  const y = interpolate(frame, [0, 900], [0, -200]);

  return (
    <AbsoluteFill>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: `linear-gradient(160deg, ${COLORS.bg} 0%, hsl(${hue1}, 60%, 92%) 40%, hsl(${hue2}, 50%, 88%) 70%, ${COLORS.bg} 100%)`,
        }}
      />
      {/* Floating orbs */}
      {[0, 1, 2].map((i) => {
        const orbY = interpolate(
          frame,
          [0, 900],
          [300 + i * 500, 100 + i * 500],
        );
        const orbX = 200 + i * 300;
        const scale = interpolate(
          frame,
          [0, 450, 900],
          [0.8, 1.2, 0.8],
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: orbX,
              top: orbY + y,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${COLORS.primary}15, transparent 70%)`,
              transform: `scale(${scale})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
