uniform vec2 uMouse;
uniform float uTime;
varying vec2 vUv;

float sdCircle(vec2 st, vec2 center) {
  return length(st - center) * 2.0;
}

float sdRoundRect(vec2 p, vec2 b, float r) {
  vec2 d = abs(p - 0.5) * 4.2 - b + vec2(r);
  return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}

void main() {
  // translate uv to center
  vec2 uv = vUv - vec2(.5, .5);
  
  // make mouse into +.5 to -.5 instead of +1 to -1
  vec2 mouse = uMouse/2.0;
  float mouseCircle = 1.0 - smoothstep(0.1, 0.8, sdCircle(uv*1.4, mouse)); 

  float baseShape = 1.0 - smoothstep(.4, .6, sdRoundRect(uv + 0.5, vec2(0.5, 0.5), .05));

  float color = smoothstep(0.5,.6, baseShape + mouseCircle);
  // float color = mouseCircle;
  // float color = baseShape;
  gl_FragColor = vec4(vec3(color), 1.0);

  // Output UV square
  // gl_FragColor = vec4(vUv, 0.0, 1.0);
}