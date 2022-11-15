import { getBoundingClientRect } from '@/utils/dom'
import { map } from '@/utils/math'

export default class {
  constructor ({ element }) {
    this.element = element
    this.speed = parseFloat(this.element.dataset.animationSpeed) //gets speed amount from html

    this.onResize()
  }

  onResize () {
    this.element.style.transform = ''

    this.bounds = getBoundingClientRect(this.element)
    this.height = window.innerHeight
  }

  //this gets called in the demo-2.js file
  update ({ current }) {
    const amount = 100 * this.speed //speed amount
    const offset = (this.bounds.top + this.bounds.height / 2) //middle of the element is the anchor for the animation
    const parallax = map(offset - current, -this.height, this.height, amount, -amount)

    this.element.style.transform = `translate3d(0, ${parallax}px, 0)`
  }
}
