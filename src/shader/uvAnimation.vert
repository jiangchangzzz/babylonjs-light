precision highp float;

uniform mat4 worldViewProjection;

attribute vec3 position;
attribute vec2 uv;

varying vec2 worldUv;
varying vec3 worldPosition;

void main() {
  gl_Position = worldViewProjection * vec4(position, 1.0);

  worldUv = uv;
}
