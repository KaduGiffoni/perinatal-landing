import * as THREE from "three";

export function createParticleMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,

    // --- FIX DA VISIBILIDADE ---
    // Obrigatório usar NormalBlending para conseguir ver partículas claras (rosa)
    // sobre um fundo claro (bege). Isso garante contraste.
    blending: THREE.NormalBlending,

    vertexShader: `
      varying float vDepth;
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vDepth = position.z;

        // --- DEFINIÇÃO DE ELEGÂNCIA (NÍTIDO E PEQUENO) ---
        // Tamanho base pequeno (15.0) para ter pontos nítidos e distintos, como fragmentos.
        // Adicionamos variação sutil com o seno para ter textura visual tátil.
        float size = 5.0 + sin(position.x * 2.0) * 1.5;

        // Perspectiva: Garante nítidez e tamanho correto baseado na distância da câmera,
        // o que resolve o piscar técnico (aliasing).
        gl_PointSize = size * (1.0 / -mvPosition.z);

        gl_Position = projectionMatrix * mvPosition;
      }
    `,

    fragmentShader: `
      varying float vDepth;
      void main() {
        // --- NITEZ EXTREMA (ANTI-NÉVOA) ---
        // distanceToCenter vai de 0.0 (centro) a 0.5 (borda).
        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
        
        // Criamos um fragmento perfeitamente nítido (disco).
        // Tudo que está a menos de 0.49 de distância do centro fica 100% visível,
        // e o smoothstep suave entre 0.49 e 0.5 apenas suaviza a borda externa
        // para não parecer pixelado, mantendo a "elegância".
        float strength = 1.0 - smoothstep(0.40, 0.5, distanceToCenter);
        
        // --- SUA COR ROSA ORIGINAL ---
        // Restauramos a cor rosa claro exata que você queria: vec3(0.91, 0.74, 0.78)
        vec3 color = vec3(0.91, 0.74, 0.78);

        // Se o alpha calculado pela nítidez ou profundidade for nulo, descartamos o pixel.
        if(strength < 0.1 || (1.0 - abs(vDepth) * 0.15) < 0.1) discard;

        // Definimos o alpha final baseado na nitidez e profundidade
        gl_FragColor = vec4(color, strength * (1.0 - abs(vDepth) * 0.15));
      }
    `,
  });
}
