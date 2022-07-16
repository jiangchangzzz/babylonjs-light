precision highp float;

uniform mat4 worldViewProjection;
uniform vec2 offset;
uniform vec2 scale;

attribute vec3 position;
attribute vec2 uv;

varying vec2 worldUv;

void main() {
  gl_Position = worldViewProjection * vec4(position, 1.0);

  worldUv = uv * scale + offset;
}
