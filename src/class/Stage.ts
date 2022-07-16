import {
  Engine,
  Scene,
  Vector3,
  ArcRotateCamera,
  HemisphericLight,
} from '@babylonjs/core';
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { LightCapsule } from './LightCapsule';
import { UvGround } from './UvGround';


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

    this.scene.createDefaultEnvironment({
      createGround: false
    });

    this.camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 3, new Vector3(0, 0, 0), this.scene);
    this.camera.attachControl(canvas, true);

    const light = new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);

    // this.createLightCapsule();

    this.createUvGround();

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

  createLightCapsule() {
    const lightCapsule = new LightCapsule('lightCapsule', this.scene);
  }

  createUvGround() {
    const uvGround = new UvGround('lightCapsule', this.scene);
  }
}