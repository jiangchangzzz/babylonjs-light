precision highp float;

uniform mat4 worldViewProjection;
uniform mat4 world;
uniform mat3 normalMatrix;

attribute vec3 position;
attribute vec3 normal;

varying vec3 worldPosition;
varying vec3 worldNormal;

void main() {
  gl_Position = worldViewProjection * vec4(position, 1.0);
  worldPosition = mat3(world) * position;

  worldNormal = normalize(normalMatrix * normal);
}