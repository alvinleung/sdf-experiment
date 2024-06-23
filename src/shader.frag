uniform vec2 uMouse;
varying vec2 vUv;

float sdCircle( vec2 p, float r ) {
  return length(p) - r;
}

void main() {
  // translate uv to center
  vec2 uv = vUv- vec2(.5, .5);
  
  // make mouse into +.5 to -.5 instead of +1 to -1
  vec2 mouse = uMouse/2.0;
  float mouseCircle = 1.0 - sdCircle(uv-mouse, .1) * 4.0; 

  // 1.0 to invert the colour
  float baseCircle = 1.0 - sdCircle(uv, 0.25) * 4.0; 

  float combinedCircle = mouseCircle + baseCircle;

  gl_FragColor = vec4(vec3(combinedCircle), 1.0);

  // Output UV square
  // gl_FragColor = vec4(vUv, 0.0, 1.0);
}