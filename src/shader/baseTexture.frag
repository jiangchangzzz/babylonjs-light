precision highp float;

uniform vec3 ambientColor;
uniform vec3 lightColor;
uniform vec3 lightPosition;
uniform vec4 diffuseColor;
uniform vec3 cameraPosition;
uniform vec3 specularColor;
uniform float gloss;
uniform sampler2D baseTexture;

varying vec3 worldPosition;
varying vec3 worldNormal;
varying vec2 worldUv;

void main() {
  vec3 lightDir = normalize(lightPosition - worldPosition);
  vec3 albedo = diffuseColor.rgb * texture2D(baseTexture, worldUv).rgb;
  vec3 diffuse = lightColor * albedo * max(0.0, dot(worldNormal, lightDir));

  vec3 viewDir = normalize(cameraPosition - worldPosition);
  vec3 halfDir = normalize(viewDir + lightDir);
  vec3 specular = lightColor * specularColor * pow(max(0.0, dot(worldNormal, halfDir)), gloss);

  gl_FragColor = vec4(ambientColor + diffuse + specular, diffuseColor.a);
}
