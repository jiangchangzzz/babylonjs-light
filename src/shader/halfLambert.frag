precision highp float;

uniform vec3 ambientColor;
uniform vec3 lightColor;
uniform vec3 lightPosition;
uniform vec4 diffuseColor;

varying vec3 worldPosition;
varying vec3 worldNormal;

void main() {
  vec3 lightDir = normalize(lightPosition - worldPosition);
  vec3 diffuse = lightColor * diffuseColor.rgb * (dot(worldNormal, lightDir) * 0.5 + 0.5);
  gl_FragColor = vec4(ambientColor + diffuse, diffuseColor.a);
}
