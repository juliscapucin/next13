import { Box, Mesh, Program } from 'ogl'

import fragment from '@/shaders/object-fragment.glsl'
import vertex from '@/shaders/object-vertex.glsl'

import ScenesRT from './ScenesRT'

export default class extends ScenesRT {
  constructor ({ parent }) {
    super({ parent })

    this.createMesh()
  }

  createMesh () {
    const geometry = new Box(this.parent.gl)
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

    this.mesh.rotation.x += 0.01
  }
}
