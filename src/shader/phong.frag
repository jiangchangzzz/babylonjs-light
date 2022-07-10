precision highp float;

uniform vec3 ambientColor;
uniform vec3 lightColor;
uniform vec3 lightPosition;
uniform vec4 diffuseColor;
uniform vec3 cameraPosition;
uniform vec3 specularColor;
uniform float gloss;

varying vec3 worldPosition;
varying vec3 worldNormal;

void main() {
  vec3 lightDir = normalize(lightPosition - worldPosition);
  vec3 diffuse = lightColor * diffuseColor.rgb * max(0.0, dot(worldNormal, lightDir));

  vec3 viewDir = normalize(cameraPosition - worldPosition);
  vec3 reflectDir = -lightDir - 2.0 * dot(worldNormal, -lightDir) * worldNormal;
  vec3 specular = lightColor * specularColor * pow(max(0.0, dot(viewDir, reflectDir)), gloss);

  gl_FragColor = vec4(ambientColor + diffuse + specular, diffuseColor.a);
}
