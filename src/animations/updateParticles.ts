import { noise3D } from "../utils/noise";

type UpdateParticlesProps = {
  positionsArray: Float32Array;
  particleCount: number;
  velocities: Float32Array;
  scrollProgress: number;
  time: number;
  intensity: number;
  activeTargets: { x: number; y: number; z: number }[];
};

export function updateParticles({
  positionsArray,
  particleCount,
  velocities,
  scrollProgress,
  time,
  activeTargets,
  intensity,
}: UpdateParticlesProps) {
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const velocity = velocities[i];

    // Prevenção de erro caso activeTargets seja menor que particleCount
    const targetIndex = i % activeTargets.length;
    const target = activeTargets[targetIndex];

    // 1. O SEU NOISE ORIGINAL (Mantém o aspecto de poeira orgânica)
    const noise = noise3D(
      positionsArray[i3] * 0.2,
      positionsArray[i3 + 1] * 0.2,
      time * 0.1,
    );

    // Aplica a distorção do noise de forma controlada
    positionsArray[i3] += noise * intensity;
    positionsArray[i3 + 1] += noise * intensity;

    // 2. A SUA FLUTUAÇÃO ORIGINAL (Diminui conforme o scroll avança)
    // Deixei um pouco mais suave (0.001) para não estragar a linha do desenho
    const floatStrength = 1 - scrollProgress;
    positionsArray[i3] +=
      Math.cos(time * 0.15 + velocity * 10) * 0.001 * floatStrength;
    positionsArray[i3 + 1] +=
      Math.sin(time * 0.2 + velocity * 10) * 0.002 * floatStrength;

    // 3. ATRAÇÃO PARA O DESENHO (O FIX ESTÁ AQUI)
    // Aumentei levemente o multiplicador de 0.01 para 0.03 para segurar melhor a forma do SVG
    const pullStrength = 0.015 * scrollProgress;

    positionsArray[i3] += (target.x - positionsArray[i3]) * pullStrength;
    positionsArray[i3 + 1] +=
      (target.y - positionsArray[i3 + 1]) * pullStrength;

    // A LINHA QUE FALTAVA NO SEU ORIGINAL:
    // Sem puxar o Z, as partículas ficavam perdidas na profundidade criando fantasmas!
    positionsArray[i3 + 2] +=
      (target.z - positionsArray[i3 + 2]) * pullStrength;
  }
}
