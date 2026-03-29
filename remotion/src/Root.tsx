import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";

// 6 scenes: 75+120+130+120+120+120 = 685
// 5 transitions × 15 frames = 75 overlap
// Total: 685 - 75 = 610 frames ≈ 20.3 seconds
export const RemotionRoot = () => (
  <Composition
    id="main"
    component={MainVideo}
    durationInFrames={610}
    fps={30}
    width={1080}
    height={1920}
  />
);
