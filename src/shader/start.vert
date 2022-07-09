uniform mat4 worldViewProjection;

attribute vec3 position;

void main() {
  gl_Position = worldViewProjection * vec4(position, 1.0);
}
