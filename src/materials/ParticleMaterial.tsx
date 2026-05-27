import * as THREE from "three";

export function createParticleMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending, 

    vertexShader: `
      varying float vDepth;
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vDepth = position.z;

        // Variação orgânica de tamanho das poeiras
        float size = 8.0 + sin(position.x * 10.0) * 6.0;

        gl_PointSize = size * (1.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,

    fragmentShader: `
      varying float vDepth;
      void main() {
        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
        
        // Círculos suaves e legíveis
        float strength = 1.0 - smoothstep(0.3, 0.5, distanceToCenter);
        
        // --- COR DE LUZ DO SOL (Golden/Dust) ---
        vec3 color = vec3(1.0, 0.9, 0.75); 

        // Garante que o alpha seja forte o suficiente para dar contraste
        float alpha = strength * (1.2 - abs(vDepth) * 0.1);
        if(alpha < 0.1) discard;

        gl_FragColor = vec4(color, alpha);
      }
    `,
  });
}