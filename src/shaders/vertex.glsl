varying float vDistance;
varying float vDepth;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vDepth = position.z;

  // Aumente o "40.0" se quiser partículas maiores, ou diminua se quiser menores
  float size = 40.0 + sin(position.x * 2.0) * 15.0;

  // Multiplicar por (1.0 / -mvPosition.z) faz o tamanho escalar com a distância
  // ou seja, se a partícula vai pra trás, ela encolhe.
  gl_PointSize = size * (1.0 / -mvPosition.z);

  gl_Position = projectionMatrix * mvPosition;
  vDistance = -mvPosition.z;
}