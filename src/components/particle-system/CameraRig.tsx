import { useFrame } from "@react-three/fiber";

import { useMousePosition } from "../../hooks/useMousePosition";

export default function CameraRig() {
  const mouse = useMousePosition();

  useFrame(({ camera }) => {
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;

    camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.02;
  });

  return null;
}
