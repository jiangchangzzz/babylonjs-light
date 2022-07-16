precision highp float;

uniform sampler2D baseTexture;
uniform vec2 offset;
uniform vec2 scale;

varying vec2 worldUv;

void main() {
  vec2 uv = worldUv * scale + offset;
  gl_FragColor = texture2D(baseTexture, uv);
}
