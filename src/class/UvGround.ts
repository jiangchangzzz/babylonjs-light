import {
  Scene,
  MeshBuilder,
  Axis,
  ShaderMaterial,
  Texture,
  Vector2
} from '@babylonjs/core';

import boomImage from '../image/boom.png';
import uvAnimationVert from '../shader/uvAnimation.vert';
import uvAnimationFrag from '../shader/uvAnimation.frag';

export class UvGround {
  scene: Scene;

  constructor(name: string, scene: Scene) {
    this.scene = scene;

    const ground = MeshBuilder.CreateSphere(name, undefined, this.scene);
    ground.rotate(Axis.X, Math.PI / 2);

    ground.material = this.getStart();
  }

  getStart() {
    const material = new ShaderMaterial('start', this.scene, {
      vertexSource: uvAnimationVert,
      fragmentSource: uvAnimationFrag
    }, {
      attributes: ["position", "uv"],
      uniforms: ["worldViewProjection", "offset", 'scale'],
      samplers: ['baseTexture'],
      needAlphaBlending: true,
    });
    material.backFaceCulling = false;

    const baseTexture = new Texture(boomImage, this.scene);
    material.setTexture('baseTexture', baseTexture);
    
    const speed = 30;
    const colNum = 8;
    const rowNum = 8;
    let lastTime = 0;
    let scale = new Vector2(1 / colNum, 1 / rowNum);
    material.setVector2('scale', scale);

    material.onBindObservable.add(() => {
      lastTime += this.scene.getEngine().getDeltaTime() * 0.001;
      const time = Math.floor(lastTime * speed);
      
      const row = rowNum - Math.floor(time / colNum) % rowNum - 1;
      const col = time % colNum;

      const offset = new Vector2();
      offset.x = col / colNum;
      offset.y = row / rowNum;

      material.setVector2('offset', offset);
    });
    return material;
  }
}