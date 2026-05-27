import { svgPathProperties } from "svg-path-properties";

export function svgToPoints(path: string, pointCount: number) {
  const properties = new svgPathProperties(path);

  const length = properties.getTotalLength();

  const rawPoints = [];

  let minX = Infinity;
  let maxX = -Infinity;

  let minY = Infinity;
  let maxY = -Infinity;

  for (let i = 0; i < pointCount; i++) {
    const point = properties.getPointAtLength((i / pointCount) * length);

    rawPoints.push(point);

    minX = Math.min(minX, point.x);
    maxX = Math.max(maxX, point.x);

    minY = Math.min(minY, point.y);
    maxY = Math.max(maxY, point.y);
  }

  const centerX = (minX + maxX) / 2;

  const centerY = (minY + maxY) / 2;

  const width = maxX - minX;

  const height = maxY - minY;

  const biggestSide = Math.max(width, height);

  const scale = 3.5 / biggestSide;

  return rawPoints.map((point) => ({
    x: (point.x - centerX) * scale,

    y: -(point.y - centerY) * scale,

    z: 0,
  }));
}
