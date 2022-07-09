uniform mat4 worldViewProjection;
uniform vec3 ambientColor;
uniform vec3 lightColor;
uniform vec3 lightDir;
uniform vec4 diffuseColor;

attribute vec3 position;
attribute vec3 normal;

varying vec4 color;

void main() {
  gl_Position = worldViewProjection * vec4(position, 1.0);

  vec3 worldNormal = normalize(normal);
  vec3 diffuse = lightColor * vec3(diffuseColor) * max(0.0, dot(normalize(worldNormal), normalize(lightDir)));
  color = vec4(ambientColor + diffuse, diffuseColor.a);
}