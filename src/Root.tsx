import { Composition } from "remotion";
import { RichestList } from "./RichestList";
import "./styles/global.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="RichestList"
        component={RichestList}
        durationInFrames={50*60} // Total 30 detik (30fps * 30 detik)
        fps={50}
        width={1920}
        height={1080}
      />
    </>
  );
};