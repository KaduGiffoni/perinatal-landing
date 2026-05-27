import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useMousePosition } from "../../hooks/useMousePosition";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { pregnantPath } from "../../shapes/pregnantShape";
import { motherPath } from "../../shapes/motherShape";
import { svgToPoints } from "../../utils/svgToPoints";
import { getScrollStage } from "../../utils/getScrollStage";
import { updateParticles } from "../../animations/updateParticles";
import { createParticleMaterial } from "../../materials/ParticleMaterial";
import { useScene } from "../../context/SceneContext";

const PARTICLE_COUNT = 1800;

export default function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  // --- CORREÇÃO: Hooks declarados estritamente no topo do componente ---
  const scrollProgress = useScrollProgress();
  const mouse = useMousePosition();
  const stage = getScrollStage(scrollProgress);
  const { theme } = useScene();

  const pregnantTargets = useMemo(() => {
    return svgToPoints(pregnantPath, PARTICLE_COUNT);
  }, []);

  const motherTargets = useMemo(() => {
    return svgToPoints(motherPath, PARTICLE_COUNT);
  }, []);

  const dissolveTargets = useMemo(() => {
    return Array.from({
      length: PARTICLE_COUNT,
    }).map(() => ({
      x: (Math.random() - 0.5) * 35, // Coordenadas horizontais esticadas
      y: (Math.random() - 0.5) * 5, // Coordenadas verticais achatadas
      z: (Math.random() - 0.5) * 10,
    }));
  }, []);

  const material = useMemo(() => {
    return createParticleMaterial();
  }, []);

  const positions = useMemo(() => {
    const array = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      array[i3] = (Math.random() - 0.5) * 15; // Espalhamento em X
      array[i3 + 1] = (Math.random() - 0.5) * 15; // Espalhamento em Y

      // Z espalhado de forma suave e próxima do centro (sem formar clones)
      array[i3 + 2] = (Math.random() - 0.5) * 2;
    }

    return array;
  }, []);

  const velocities = useMemo(() => {
    const array = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      array[i] = Math.random();
    }

    return array;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Interatividade suave e normalizada com o mouse do próprio R3F
    const normalMouse = state.mouse;
    pointsRef.current.rotation.y = normalMouse.x * 0.02; // De 0.1 para 0.02
    pointsRef.current.rotation.x = normalMouse.y * -0.02;

    // Seleção de alvos usando o escopo correto das variáveis
    let activeTargets = pregnantTargets;
    if (stage === "dissolve") activeTargets = dissolveTargets;
    if (stage === "mother") activeTargets = motherTargets;

    // Determinação elegante da velocidade baseada no tema atual
    let intensity = 0.01;
    if (theme === "intro") intensity = 0.002;
    if (theme === "pregnant") intensity = 0.006;
    if (theme === "transition") intensity = 0.03;
    if (theme === "mother") intensity = 0.004;

    const positionsArray = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    updateParticles({
      positionsArray,
      particleCount: PARTICLE_COUNT,
      velocities,
      scrollProgress,
      time: state.clock.elapsedTime,
      activeTargets,
      intensity,
    });

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>

      <primitive object={material} />
    </points>
  );
}
