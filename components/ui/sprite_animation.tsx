import { useEffect, useState } from "react";
import { Image, View } from "react-native";

type SpriteAnimationProps = {
  source: any;
  frameWidth: number;
  frameHeight: number;
  frames: number;
  fps?: number;
};

export function SpriteAnimation({
  source,
  frameWidth,
  frameHeight,
  frames,
  fps = 6,
}: SpriteAnimationProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    setFrame(0);
  }, [source, frames]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames);
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [frames, fps, source]);

  return (
    <View
      style={{
        width: frameWidth,
        height: frameHeight,
        overflow: "hidden",
      }}
    >
      <Image
        source={source}
        style={{
          width: frameWidth * frames,
          height: frameHeight,
          transform: [{ translateX: -frame * frameWidth }],
        }}
        resizeMode="contain"
      />
    </View>
  );
}
