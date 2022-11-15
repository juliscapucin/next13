import { RenderTarget, Transform } from 'ogl'

export default class {
  constructor ({ parent }) {
    this.parent = parent

    this.scene = new Transform()

    this.renderTarget = new RenderTarget(this.parent.gl, {
      height: this.parent.sizes.y * 2,
      width: this.parent.sizes.x * 2
    })
  }

  render () {
    this.parent.renderer.render({
      scene: this.scene,
      camera: this.parent.camera,
      target: this.renderTarget
    })
  }
}
