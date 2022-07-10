uniform mat4 worldViewProjection;
uniform mat4 world;
uniform vec3 ambientColor;
uniform vec3 lightColor;
uniform vec3 lightPosition;
uniform vec4 diffuseColor;
uniform mat3 normalMatrix;

attribute vec3 position;
attribute vec3 normal;

varying vec4 color;

void main() {
  gl_Position = worldViewProjection * vec4(position, 1.0);
  vec3 worldPosition = mat3(world) * position;

  vec3 worldNormal = normalize(normalMatrix * normal);
  vec3 lightDir = normalize(lightPosition - worldPosition);
  vec3 diffuse = lightColor * diffuseColor.rgb * max(0.0, dot(worldNormal, lightDir));
  color = vec4(ambientColor + diffuse, diffuseColor.a);
}