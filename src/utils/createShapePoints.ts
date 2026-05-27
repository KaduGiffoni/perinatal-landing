export function createShapePoints(count: number) {
  const points = []

  for (let i = 0; i < count; i++) {
    const angle =
      (i / count) * Math.PI * 2

    const radius =
      2 + Math.sin(angle * 2) * 0.3

    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius

    points.push({
      x,
      y,
      z: 0,
    })
  }

  return points
}