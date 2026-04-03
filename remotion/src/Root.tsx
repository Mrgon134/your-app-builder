import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";

// 7 scenes: 75+120+120+130+120+120+120 = 805
// 6 transitions × 15 frames = 90 overlap
// Total: 805 - 90 = 715 frames ≈ 23.8 seconds
export const RemotionRoot = () => (
  <Composition
    id="main"
    component={MainVideo}
    durationInFrames={715}
    fps={30}
    width={1080}
    height={1920}
  />
);
