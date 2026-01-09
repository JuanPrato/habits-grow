import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { View } from "react-native";

type SpriteAnimationProps = {
  source: any;
  frameWidth: number;
  frameHeight: number;
  frames: number;
  fps?: number;
  scale?: number;
};

export function SpriteAnimation({
  source,
  frameWidth,
  frameHeight,
  frames,
  fps = 6,
  scale = 1,
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

  // Establece aspectRatio y height/width por flexibilidad de escalado
  return (
    <View
      style={{
        overflow: "hidden",
        aspectRatio: frameWidth / frameHeight, // Mantener la proporción original
        maxHeight: frameHeight * scale,
      }}
    >
      <Image
        source={source}
        style={{
          width: frameWidth * frames * scale,
          height: frameHeight * scale,
          transform: [
            {
              translateX: -frame * (frameWidth * scale),
            },
          ],
        }}
        contentFit={"contain"}
      />
    </View>
  );
}
