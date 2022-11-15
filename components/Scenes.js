import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform, Vec2 } from 'ogl'

import fragment from '@/shaders/transition-fragment.glsl'
import vertex from '@/shaders/transition-vertex.glsl'

import sprite from '@/assets/sprite.png'

import { map } from '@/utils/math'

import Cube from './ScenesCube'
import Sphere from './ScenesSphere'

export default class {
  constructor () {
    this.area = new Vec2()
    this.sizes = new Vec2(window.innerHeight, this.innerWidth)

    this.createRenderer()
    this.createCamera()
    this.createScenes()
    this.createMesh()

    this.onResize()
  }

  createRenderer () {
    this.renderer = new Renderer({
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 2)
    })

    this.gl = this.renderer.gl
    this.gl.canvas.classList.add('canvas')

    document.body.appendChild(this.gl.canvas)
  }

  createCamera () {
    this.camera = new Camera(this.gl)
    this.camera.fov = 45
    this.camera.position.z = 2
  }

  createMesh () {
    this.scene = new Transform()

    const texture = new Texture(this.gl)
    const textureMask = new Texture(this.gl)

    const image = document.createElement('img')

    image.src = sprite
    image.onload = _ => {
      textureMask.image = image
    }

    const geometry = new Plane(this.gl)
    const program = new Program(this.gl, {
      fragment,
      vertex,
      uniforms: {
        tMap1: { value: texture },
        tMap2: { value: texture },
        tMask: { value: textureMask },
        uIndex: { value: new Vec2() },
        uTransition: { value: 0 }
      }
    })

    this.mesh = new Mesh(this.gl, {
      geometry,
      program
    })

    this.mesh.setParent(this.scene)
  }

  createScenes () {
    this.cube = new Cube({
      parent: this
    })

    this.sphere = new Sphere({
      parent: this
    })
  }

  onResize () {
    this.sizes.x = window.innerWidth
    this.sizes.y = window.innerHeight

    this.renderer.setSize(this.sizes.x, this.sizes.y)

    this.camera.perspective({
      aspect: this.sizes.x / this.sizes.y
    })

    const fov = this.camera.fov * (Math.PI / 180)
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect

    this.area.x = width
    this.area.y = height

    this.mesh.scale.x = this.area.x
    this.mesh.scale.y = this.area.y
  }

  loop (percent) {
    this.cube.render()
    this.sphere.render()

    this.mesh.program.uniforms.tMap1.value = this.cube.renderTarget.texture
    this.mesh.program.uniforms.tMap2.value = this.sphere.renderTarget.texture
    this.mesh.program.uniforms.uTransition.value = percent

    const index = Math.round(map(percent, 0, 1, 0, 79))
    const x = index % 10
    const y = Math.floor(index / 10)

    this.mesh.program.uniforms.uIndex.value.x = x
    this.mesh.program.uniforms.uIndex.value.y = y

    this.renderer.render({
      scene: this.scene,
      camera: this.camera
    })
  }
}
