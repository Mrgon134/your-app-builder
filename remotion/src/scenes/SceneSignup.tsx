import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/DMSans";
import { COLORS } from "../styles";
import { PhoneMockup } from "../components/PhoneMockup";
import { StepIndicator } from "../components/StepIndicator";

const { fontFamily: dmSans } = loadFont("normal", { weights: ["400", "700", "800"], subsets: ["latin"] });

export const SceneSignup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneS = spring({ frame: frame - 10, fps, config: { damping: 15 } });
  const phoneY = interpolate(phoneS, [0, 1], [200, 0]);
  const phoneOp = interpolate(phoneS, [0, 1], [0, 1]);

  const email = "user@email.com";
  const charsShown = Math.min(email.length, Math.max(0, Math.floor((frame - 50) / 3)));
  const typedEmail = email.slice(0, charsShown);

  const btnPress = frame > 90 ? spring({ frame: frame - 90, fps, config: { damping: 20 } }) : 0;
  const btnScale = interpolate(btnPress, [0, 0.5, 1], [1, 0.95, 1]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
      }}
    >
      <Sequence from={0}>
        <StepIndicator step={1} label="Create Account" delay={0} />
      </Sequence>

      <div style={{ opacity: phoneOp, transform: `translateY(${phoneY}px)` }}>
        <PhoneMockup>
          <div
            style={{
              padding: "80px 30px 30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
              height: "100%",
              background: COLORS.bg,
            }}
          >
            <div style={{ fontFamily: dmSans, fontSize: 48, fontWeight: 800, color: COLORS.primary }}>
              nuju
            </div>
            <div style={{ fontFamily: dmSans, fontSize: 18, color: COLORS.muted, textAlign: "center" }}>
              Start your journaling journey
            </div>

            <div
              style={{
                width: "100%",
                padding: "16px 20px",
                borderRadius: 16,
                border: `2px solid ${COLORS.primary}40`,
                background: COLORS.white,
                fontFamily: dmSans,
                fontSize: 16,
                color: COLORS.text,
                marginTop: 20,
              }}
            >
              {typedEmail}
              {frame % 30 < 15 && <span style={{ color: COLORS.primary }}>|</span>}
            </div>

            <div
              style={{
                width: "100%",
                padding: "16px 20px",
                borderRadius: 16,
                border: `2px solid ${COLORS.primary}20`,
                background: COLORS.white,
                fontFamily: dmSans,
                fontSize: 16,
                color: COLORS.muted,
              }}
            >
              ••••••••
            </div>

            <div
              style={{
                width: "100%",
                padding: "18px",
                borderRadius: 20,
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                textAlign: "center",
                fontFamily: dmSans,
                fontSize: 18,
                fontWeight: 700,
                color: COLORS.white,
                transform: `scale(${btnScale})`,
                boxShadow: `0 8px 24px ${COLORS.primary}40`,
                marginTop: 10,
              }}
            >
              Sign Up Now ✨
            </div>

            <div style={{ fontFamily: dmSans, fontSize: 14, color: COLORS.muted }}>
              or continue with Google
            </div>

            <div
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 16,
                border: `1px solid ${COLORS.primary}20`,
                textAlign: "center",
                fontFamily: dmSans,
                fontSize: 16,
                color: COLORS.text,
                background: COLORS.white,
              }}
            >
              🔵 Continue with Google
            </div>
          </div>
        </PhoneMockup>
      </div>
    </AbsoluteFill>
  );
};
