import {
  Engine,
  Scene,
  UniversalCamera,
  Vector3,
  ArcRotateCamera,
  HemisphericLight,
  MeshBuilder
} from '@babylonjs/core';
// import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

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

    const box = MeshBuilder.CreateBox("box", { size: 1 }, this.scene);
    box.position.y = 0.5;

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    window.addEventListener('resize', () => {
      this.engine.resize();
    });

    document.addEventListener('keydown', event => {
      if(event.code === 'ShiftLeft') {
        this.scene.debugLayer.show({
          overlay: true,
          globalRoot: document.body
        });
      }
    });    
  }
}