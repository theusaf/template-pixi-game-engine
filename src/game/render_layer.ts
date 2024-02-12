import { Application, Container, Graphics, Sprite, Texture } from "pixi.js";

interface RenderLayerOptions {
  worldWidth: number;
  worldHeight: number;
  pixiApp: Application;
}

class RenderLayer extends Container {

  pixiApp: Application;
  worldWidth: number;
  worldHeight: number;

  constructor({
    pixiApp,
    worldWidth,
    worldHeight
  }: RenderLayerOptions) {
    super();
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;
    this.pixiApp = pixiApp;
  }

  getScale() {
    return this.pixiApp.view.width / this.worldWidth;
  }

  createSprite(texture: Texture) {
    const sprite = new Sprite(texture);
    sprite.scale.set(this.getScale());
    return sprite;
  }

  createGeometry() {
    const geometry = new Graphics();
    geometry.scale.set(this.getScale());
    return geometry;
  }

}

export default RenderLayer;
