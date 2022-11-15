import { Mesh, Program, Sphere } from 'ogl'

import fragment from '@/shaders/object-fragment.glsl'
import vertex from '@/shaders/object-vertex.glsl'

import ScenesRT from './ScenesRT'

export default class extends ScenesRT {
  constructor ({ parent }) {
    super({ parent })

    this.createMesh()
  }

  createMesh () {
    const geometry = new Sphere(this.parent.gl)
    const program = new Program(this.parent.gl, {
      fragment,
      vertex
    })

    this.mesh = new Mesh(this.parent.gl, {
      geometry,
      program
    })

    this.mesh.setParent(this.scene)
  }

  render () {
    super.render()

    this.mesh.rotation.y += 0.01
  }
}
