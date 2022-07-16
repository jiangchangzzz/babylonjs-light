precision highp float;

uniform sampler2D baseTexture;

varying vec2 worldUv;

void main() {
  vec2 uv = worldUv;
  gl_FragColor = texture2D(baseTexture, uv);
}
