varying float vDistance;
varying float vDepth;


void main() {
  float distanceToCenter =
    distance(gl_PointCoord, vec2(0.5));

  float strength =
    0.05 / distanceToCenter - 0.1;

  vec3 color =
    vec3(0.91, 0.74, 0.78);

float alpha =
  strength *
  (1.0 - abs(vDepth) * 0.15);

gl_FragColor =
  vec4(color, alpha);
}