import { Canvas } from "@react-three/fiber";
import Particles from "./Particles";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import CameraRig from "./CameraRig";

export default function ParticleScene() {
  return (
    // Forçando o layout diretamente no React para ignorar bugs de CSS/Tailwind
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 75,
        }}
      >
        {/* Atualizei a cor da "névoa" do cenário para bater com a sua nova cor premium do fundo */}
        <fog attach="fog" args={["#F5EBE9", 8, 20]} />

        <CameraRig />
        <Particles />

        <EffectComposer>
          {/* Intensidade do Bloom reduzida (0.5) para manter a elegância cristalina */}
          <Bloom intensity={0.5} luminanceThreshold={0.2} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
