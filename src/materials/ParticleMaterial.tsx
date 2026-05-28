import * as THREE from "three";

export function createParticleMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,

    depthWrite: false,

    blending: THREE.AdditiveBlending,

    vertexShader: `
      varying float vDepth;

      void main() {

        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

        vDepth = position.z;

        float size =
          10.0 +
          sin(position.x * 8.0) * 4.0;

        gl_PointSize =
          size * (1.0 / -mvPosition.z);

        gl_Position =
          projectionMatrix * mvPosition;
      }
    `,

    fragmentShader: `
      varying float vDepth;

      void main() {

        float distanceToCenter =
          distance(gl_PointCoord, vec2(0.5));

        float strength =
          1.0 - smoothstep(
            0.2,
            0.5,
            distanceToCenter
          );

        vec3 warmColor = vec3(
          1.0,
          0.94,
          0.88
        );

        float alpha =
          strength *
          (1.4 - abs(vDepth) * 0.08);

        if(alpha < 0.02) discard;

        gl_FragColor = vec4(
          warmColor,
          alpha
        );
      }
    `,
  });
}
