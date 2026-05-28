varying float vDistance;
varying float vDepth;


varying float vAlpha;

void main() {

    float dist = distance(gl_PointCoord, vec2(0.5));

    float strength = 0.05 / dist - 0.1;

    strength = smoothstep(0.0, 1.0, strength);

    vec3 warmColor = vec3(
        1.0,
        0.94,
        0.88
    );

    gl_FragColor = vec4(
        warmColor,
        strength * vAlpha * 2.2
    );
}