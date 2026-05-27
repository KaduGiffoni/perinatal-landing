import { Canvas } from "@react-three/fiber";
import Particles from "./Particles";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import CameraRig from "./CameraRig";

export default function ParticleScene() {
  return (
    // CORREÇÃO: Certifique-se de que a div é full-screen com 'fixed inset-0'.
    // Adicionamos 'z-index: 50' e 'pointer-events-none' para ela não bloquear o site.
    // O 'bg-red-500' é apenas para o teste. Depois que funcionar, remova-o.
    <div className="fixed inset-0 z-50 pointer-events-none bg-red-500">
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 75,
        }}
      >
        <fog attach="fog" args={["#f7efea", 8, 20]} />
        <CameraRig />

        {/* CORREÇÃO SECUNDÁRIA: Certifique-se de que a tag <points> no Particles.tsx
           não tem escala pequena como 'scale={0.02}'. Ela deve ser '<points ref={pointsRef}>'. */}
        <Particles />

        <EffectComposer>
          {/* CORREÇÃO OPCIONAL: Reduza a intensidade do Bloom para um design mais elegante.
             Tente 'intensity={0.5}'. O valor atual '1' é muito forte. */}
          <Bloom intensity={0.5} luminanceThreshold={0.2} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
