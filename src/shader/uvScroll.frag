precision highp float;

uniform sampler2D scrollTexture1;
uniform sampler2D scrollTexture2;

varying vec4 worldUv;

void main() {
  vec4 color1 = texture2D(scrollTexture1, worldUv.xy);
  vec4 color2 = texture2D(scrollTexture2, worldUv.zw);
  gl_FragColor = vec4(color1.rgb * (1.0 - color2.a) + color2.rgb * color2.a, 1.0);
}
