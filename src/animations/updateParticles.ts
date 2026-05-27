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

    const targetIndex = i % activeTargets.length;
    const target = activeTargets[targetIndex];

    // 1. O Vento (Noise) espalhando a poeira
    const noise = noise3D(
      positionsArray[i3] * 0.3,
      positionsArray[i3 + 1] * 0.3,
      time * 0.15,
    );

    // Movimento caótico suave da poeira flutuando
    positionsArray[i3] += noise * (intensity * 1.5);
    positionsArray[i3 + 1] += noise * (intensity * 1.5);

    // 2. A Atração (Gravidade do Desenho)
    // Reduzida de 0.03 para 0.015. Elas vão flutuar preguiçosamente em direção à forma,
    // mas nunca formarão uma linha dura, parecendo apenas uma coincidência mágica.
    const pullStrength = 0.015 * scrollProgress;

    positionsArray[i3] += (target.x - positionsArray[i3]) * pullStrength;
    positionsArray[i3 + 1] +=
      (target.y - positionsArray[i3 + 1]) * pullStrength;
    positionsArray[i3 + 2] +=
      (target.z - positionsArray[i3 + 2]) * pullStrength;

    // 3. Flutuação de "Partícula no ar"
    positionsArray[i3 + 1] += Math.sin(time * 0.5 + velocity * 10) * 0.005;
  }
}
