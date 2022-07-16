import {
  MeshBuilder,
  ShaderMaterial,
  Vector4,
  Matrix,
  Texture,
  Scene,
  Vector3
} from '@babylonjs/core';
import baseImage from '../image/Brick_Diffuse.jpg';

import startVert from '../shader/start.vert';
import startFrag from '../shader/start.frag';

import lambertVert from '../shader/lambert.vert';
import lambertFrag from '../shader/lambert.frag';

import lambertFragVert from '../shader/lambertFrag.vert';
import lambertFragFrag from '../shader/lambertFrag.frag';

import halfLambertVert from '../shader/halfLambert.vert';
import halfLambertFrag from '../shader/halfLambert.frag';

import phongVert from '../shader/phong.vert';
import phongFrag from '../shader/phong.frag';

import blinnPhongVert from '../shader/blinnPhong.vert';
import blinnPhongFrag from '../shader/blinnPhong.frag';

import baseTextureVert from '../shader/baseTexture.vert';
import baseTextureFrag from '../shader/baseTexture.frag';

export class LightCapsule {
  scene: Scene;

  constructor(name: string, scene: Scene) {
    this.scene = scene;

    const capsule = MeshBuilder.CreateCapsule(name, undefined, scene);

    // box.material = this.getStart();

    // box.material = this.getLambertVert();

    // box.material = this.getLambertFrag();

    // box.material = this.getHalfLambert();

    // box.material = this.getPhong();

    // box.material = this.getBlinnPhong();

    capsule.material = this.getbaseTexture();
  }

  getStart() {
    const material = new ShaderMaterial('start', this.scene, {
      vertexSource: startVert,
      fragmentSource: startFrag
    }, {
      attributes: ["position"],
      uniforms: ["worldViewProjection"]
    });
    return material;
  }

  getLambertVert() {
    const material = new ShaderMaterial('lambert', this.scene, {
      vertexSource: lambertVert,
      fragmentSource: lambertFrag
    }, {
      attributes: ["position", "normal"],
      uniforms: [
        "worldViewProjection",
        "ambientColor",
        "lightColor",
        "lightDir",
        "diffuseColor",
        "normalMatrix"
      ]
    });
    material.setVector3('ambientColor', new Vector3(0, 0, 0));
    material.setVector3('lightColor', new Vector3(1, 1, 1));
    material.setVector3('lightPosition', new Vector3(5, 5, 5));
    material.setVector4('diffuseColor', new Vector4(0.5, 0.5, 0.5, 1));

    material.onBindObservable.add(mesh => {
      const normalMatrix = new Matrix();
      mesh.getWorldMatrix().toNormalMatrix(normalMatrix);
      material.setMatrix3x3('normalMatrix', Matrix.GetAsMatrix3x3(normalMatrix));
    });

    return material;
  }

  getLambertFrag() {
    const material = new ShaderMaterial('lambertFrag', this.scene, {
      vertexSource: lambertFragVert,
      fragmentSource: lambertFragFrag
    }, {
      attributes: ["position", "normal"],
      uniforms: [
        "worldViewProjection",
        "ambientColor",
        "lightColor",
        "lightDir",
        "diffuseColor",
        "normalMatrix"
      ]
    });
    material.setVector3('ambientColor', new Vector3(0, 0, 0));
    material.setVector3('lightColor', new Vector3(1, 1, 1));
    material.setVector3('lightPosition', new Vector3(5, 5, 5));
    material.setVector4('diffuseColor', new Vector4(1, 1, 1, 1));

    material.onBindObservable.add(mesh => {
      const normalMatrix = new Matrix();
      mesh.getWorldMatrix().toNormalMatrix(normalMatrix);
      material.setMatrix3x3('normalMatrix', Matrix.GetAsMatrix3x3(normalMatrix));
    });

    return material;
  }

  getHalfLambert() {
    const material = new ShaderMaterial('halfLambert', this.scene, {
      vertexSource: halfLambertVert,
      fragmentSource: halfLambertFrag
    }, {
      attributes: ["position", "normal"],
      uniforms: [
        "worldViewProjection",
        "ambientColor",
        "lightColor",
        "lightDir",
        "diffuseColor",
        "normalMatrix"
      ]
    });
    material.setVector3('ambientColor', new Vector3(0, 0, 0));
    material.setVector3('lightColor', new Vector3(1, 1, 1));
    material.setVector3('lightPosition', new Vector3(5, 5, 5));
    material.setVector4('diffuseColor', new Vector4(1, 1, 1, 1));

    material.onBindObservable.add(mesh => {
      const normalMatrix = new Matrix();
      mesh.getWorldMatrix().toNormalMatrix(normalMatrix);
      material.setMatrix3x3('normalMatrix', Matrix.GetAsMatrix3x3(normalMatrix));
    });

    return material;
  } 

  getPhong() {
    const material = new ShaderMaterial('phong', this.scene, {
      vertexSource: phongVert,
      fragmentSource: phongFrag
    }, {
      attributes: ["position", "normal"],
      uniforms: [
        "worldViewProjection",
        "ambientColor",
        "lightColor",
        "lightDir",
        "diffuseColor",
        "normalMatrix",
        "cameraPosition",
        "specularColor",
        "gloss"
      ]
    });
    material.setVector3('ambientColor', new Vector3(0, 0, 0));
    material.setVector3('lightColor', new Vector3(1, 1, 1));
    material.setVector3('lightPosition', new Vector3(5, 5, 5));
    material.setVector4('diffuseColor', new Vector4(1, 1, 1, 1));
    material.setVector3('specularColor', new Vector3(1, 1, 1));
    material.setFloat('gloss', 8);

    material.onBindObservable.add(mesh => {
      const normalMatrix = new Matrix();
      mesh.getWorldMatrix().toNormalMatrix(normalMatrix);
      material.setMatrix3x3('normalMatrix', Matrix.GetAsMatrix3x3(normalMatrix));
      material.setVector3('cameraPosition', this.scene.activeCamera!.position);
    });

    return material;
  }

  getBlinnPhong() {
    const material = new ShaderMaterial('blinnPhong', this.scene, {
      vertexSource: blinnPhongVert,
      fragmentSource: blinnPhongFrag
    }, {
      attributes: ["position", "normal"],
      uniforms: [
        "worldViewProjection",
        "ambientColor",
        "lightColor",
        "lightDir",
        "diffuseColor",
        "normalMatrix",
        "cameraPosition",
        "specularColor",
        "gloss"
      ],
    });
    material.setVector3('ambientColor', new Vector3(0, 0, 0));
    material.setVector3('lightColor', new Vector3(1, 1, 1));
    material.setVector3('lightPosition', new Vector3(5, 5, 5));
    material.setVector4('diffuseColor', new Vector4(1, 1, 1, 1));
    material.setVector3('specularColor', new Vector3(1, 1, 1));
    material.setFloat('gloss', 8);

    material.onBindObservable.add(mesh => {
      const normalMatrix = new Matrix();
      mesh.getWorldMatrix().toNormalMatrix(normalMatrix);
      material.setMatrix3x3('normalMatrix', Matrix.GetAsMatrix3x3(normalMatrix));
      material.setVector3('cameraPosition', this.scene.activeCamera!.position);
    });

    return material;
  }

  getbaseTexture() {
    const material = new ShaderMaterial('baseTexture', this.scene, {
      vertexSource: baseTextureVert,
      fragmentSource: baseTextureFrag
    }, {
      attributes: ["position", "normal", "uv"],
      uniforms: [
        "worldViewProjection",
        "ambientColor",
        "lightColor",
        "lightDir",
        "diffuseColor",
        "normalMatrix",
        "cameraPosition",
        "specularColor",
        "gloss",
        "baseTexture"
      ],
    });
    material.setVector3('ambientColor', new Vector3(0, 0, 0));
    material.setVector3('lightColor', new Vector3(1, 1, 1));
    material.setVector3('lightPosition', new Vector3(5, 5, 5));
    material.setVector4('diffuseColor', new Vector4(1, 1, 1, 1));
    material.setVector3('specularColor', new Vector3(1, 1, 1));
    material.setFloat('gloss', 8);

    const baseTexture = new Texture(baseImage, this.scene);
    material.setTexture('baseTexture', baseTexture);

    material.onBindObservable.add(mesh => {
      const normalMatrix = new Matrix();
      mesh.getWorldMatrix().toNormalMatrix(normalMatrix);
      material.setMatrix3x3('normalMatrix', Matrix.GetAsMatrix3x3(normalMatrix));
      material.setVector3('cameraPosition', this.scene.activeCamera!.position);
    });

    return material;
  }
}
