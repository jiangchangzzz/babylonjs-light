precision highp float;

uniform mat4 worldViewProjection;
uniform vec4 offset;

attribute vec3 position;
attribute vec2 uv;

varying vec4 worldUv;

void main() {
  gl_Position = worldViewProjection * vec4(position, 1.0);

  worldUv.xy = uv + offset.xy;
  worldUv.zw = uv + offset.zw;
}
