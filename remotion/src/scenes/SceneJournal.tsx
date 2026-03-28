import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/DMSans";
import { loadFont as loadNewsreader } from "@remotion/google-fonts/Newsreader";
import { COLORS } from "../styles";
import { PhoneMockup } from "../components/PhoneMockup";
import { StepIndicator } from "../components/StepIndicator";

const { fontFamily: dmSans } = loadFont("normal", { weights: ["400", "700", "800"], subsets: ["latin"] });
const { fontFamily: newsreader } = loadNewsreader("normal", { weights: ["400"], subsets: ["latin"] });

const journalText = "Hari ini aku merasa sangat bersyukur. Pagi tadi dapat kabar baik dari kantor, dan sore ini jalan-jalan santai di taman. Rasanya tenang dan damai sekali.";

export const SceneJournal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneS = spring({ frame: frame - 10, fps, config: { damping: 15 } });
  const phoneOp = interpolate(phoneS, [0, 1], [0, 1]);
  const phoneY = interpolate(phoneS, [0, 1], [100, 0]);

  // Typing animation
  const charsShown = Math.min(journalText.length, Math.max(0, Math.floor((frame - 30) * 1.5)));
  const typedText = journalText.slice(0, charsShown);

  // AI insight card
  const insightDelay = 100;
  const insightS = spring({ frame: frame - insightDelay, fps, config: { damping: 12 } });
  const insightOp = interpolate(insightS, [0, 1], [0, 1]);
  const insightY = interpolate(insightS, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}
    >
      <Sequence from={0}>
        <StepIndicator step={3} label="Tulis Jurnal" delay={0} />
      </Sequence>

      <div style={{ opacity: phoneOp, transform: `translateY(${phoneY}px)` }}>
        <PhoneMockup>
          <div
            style={{
              padding: "60px 24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              height: "100%",
              background: COLORS.bg,
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: dmSans, fontSize: 16, color: COLORS.muted }}>← Kembali</span>
              <span
                style={{
                  fontFamily: dmSans,
                  fontSize: 14,
                  fontWeight: 700,
                  color: COLORS.white,
                  background: COLORS.primary,
                  padding: "8px 20px",
                  borderRadius: 12,
                }}
              >
                Simpan
              </span>
            </div>

            {/* Mood indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <span style={{ fontSize: 24 }}>😊</span>
              <span style={{ fontFamily: dmSans, fontSize: 14, fontWeight: 600, color: COLORS.mood4 }}>Baik</span>
            </div>

            {/* Prompt */}
            <div
              style={{
                padding: "12px 16px",
                borderRadius: 12,
                background: `${COLORS.primary}08`,
                fontFamily: dmSans,
                fontSize: 13,
                color: COLORS.primary,
                fontStyle: "italic",
              }}
            >
              Apa yang membuatmu tersenyum hari ini?
            </div>

            {/* Textarea */}
            <div
              style={{
                flex: 1,
                padding: 16,
                borderRadius: 20,
                background: COLORS.white,
                border: `1px solid ${COLORS.primary}15`,
                fontFamily: newsreader,
                fontSize: 17,
                lineHeight: 1.7,
                color: COLORS.text,
                minHeight: 180,
              }}
            >
              {typedText}
              {charsShown < journalText.length && frame % 20 < 10 && (
                <span style={{ color: COLORS.primary, fontWeight: 700 }}>|</span>
              )}
            </div>

            {/* AI Insight */}
            {frame > insightDelay && (
              <div
                style={{
                  padding: 20,
                  borderRadius: 20,
                  background: `linear-gradient(135deg, ${COLORS.primary}10, ${COLORS.primaryLight}10)`,
                  border: `1px solid ${COLORS.primary}20`,
                  opacity: insightOp,
                  transform: `translateY(${insightY}px)`,
                }}
              >
                <div style={{ fontFamily: dmSans, fontSize: 13, fontWeight: 700, color: COLORS.primary, marginBottom: 8 }}>
                  ✨ Insight dari Ju
                </div>
                <div style={{ fontFamily: dmSans, fontSize: 14, color: COLORS.text, lineHeight: 1.5 }}>
                  Kamu punya kemampuan luar biasa untuk menghargai momen kecil. Rasa syukurmu itu kekuatan besar!
                </div>
              </div>
            )}
          </div>
        </PhoneMockup>
      </div>
    </AbsoluteFill>
  );
};
