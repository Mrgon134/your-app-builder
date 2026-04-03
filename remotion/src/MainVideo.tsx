import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { SceneIntro } from "./scenes/SceneIntro";
import { SceneSignup } from "./scenes/SceneSignup";
import { SceneMood } from "./scenes/SceneMood";
import { SceneJournal } from "./scenes/SceneJournal";
import { SceneInsights } from "./scenes/SceneInsights";
import { SceneCoach } from "./scenes/SceneCoach";
import { SceneOutro } from "./scenes/SceneOutro";
import { PersistentBackground } from "./components/PersistentBackground";

export const MainVideo: React.FC = () => {
  const timing = springTiming({ config: { damping: 200 }, durationInFrames: 15 });

  return (
    <AbsoluteFill>
      <PersistentBackground />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={75}>
          <SceneIntro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={120}>
          <SceneSignup />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-left" })} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={120}>
          <SceneMood />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={130}>
          <SceneJournal />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={120}>
          <SceneInsights />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={120}>
          <SceneCoach />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-left" })} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={120}>
          <SceneOutro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
