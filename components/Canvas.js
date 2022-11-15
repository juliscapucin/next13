import { Renderer, Camera, Mesh, Plane, Program, Texture, Transform, Vec2 } from 'ogl'

import fragment from '@/shaders/video-fragment.glsl'
import vertex from '@/shaders/video-vertex.glsl'

import src from '@/assets/video.mp4'

export default class {
  constructor () {
    this.area = new Vec2()
    this.sizes = new Vec2()

    this.createRenderer()
    this.createCamera()
    this.createScene()
    this.createVideo()
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

  createScene () {
    this.scene = new Transform()
  }

  createVideo () {
    this.video = document.createElement('video')
    this.video.loop = true
    this.video.muted = true
    this.video.src = src
    this.video.setAttribute('crossorigin', 'anonymous')
    this.video.setAttribute('webkit-playsinline', true)
    this.video.setAttribute('playsinline', true)
    this.video.load()
    this.video.play()
  }

  createMesh () {
    this.texture = new Texture(this.gl, {
      generateMipmaps: false,
      height: 1080,
      width: 1920
    })

    this.program = new Program(this.gl, {
      fragment,
      vertex,
      uniforms: {
        tMap: { value: this.texture },
        uMeshSizes: { value: this.area },
        uProgress: { value: 0 },
        uTime: { value: 0 }
      }
    })

    const geometry = new Plane(this.gl)

    this.mesh = new Mesh(this.gl, {
      geometry,
      program: this.program
    })

    this.mesh.setParent(this.scene)
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

  loop () {
    this.program.uniforms.uTime.value += 0.01

    if (this.video.readyState >= this.video.HAVE_ENOUGH_DATA) {
      if (!this.texture.image) {
        this.texture.image = this.video
      }

      this.texture.needsUpdate = true
    }

    this.renderer.render({
      scene: this.scene,
      camera: this.camera
    })
  }
}
