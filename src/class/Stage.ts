import {
  Engine,
  Scene,
  UniversalCamera,
  Vector3,
  ArcRotateCamera,
  HemisphericLight,
  MeshBuilder,
  ShaderMaterial,
  Vector4
} from '@babylonjs/core';
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

import startVert from '../shader/start.vert';
import startFrag from '../shader/start.frag';

import lambertVert from '../shader/lambert.vert';
import lambertFrag from '../shader/lambert.frag';

export class Stage {
  engine: Engine;

  scene: Scene;

  camera: ArcRotateCamera;

  constructor(canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas, true, {
      limitDeviceRatio: 2,
      adaptToDeviceRatio: true
    });

    this.scene = new Scene(this.engine);

    this.scene.createDefaultEnvironment();

    this.camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 3, new Vector3(0, 0, 0), this.scene);
    this.camera.attachControl(canvas, true);

    const light = new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);

    this.createBox();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    window.addEventListener('resize', () => {
      this.engine.resize();
    });

    document.addEventListener('keydown', event => {
      if (event.code === 'ShiftLeft') {
        this.scene.debugLayer.show({
          overlay: true,
          globalRoot: document.body
        });
      }
    });
  }

  createBox() {
    const box = MeshBuilder.CreateBox("box", { size: 1 }, this.scene);
    box.position.y = 0.5;

    // box.material = this.getStart();

    box.material = this.getVertLambert();
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

  getVertLambert() {
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
      ]
    });
    material.setVector3('ambientColor', new Vector3(0, 0, 0));
    material.setVector3('lightColor', new Vector3(0.5, 0.5, 0.5));
    material.setVector3('lightDir', new Vector3(5, 5, -5));
    material.setVector4('diffuseColor', new Vector4(1, 1, 1, 1));

    return material;
  }
}