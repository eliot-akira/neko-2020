import initOptions from './options'
import loadImages, { exportImageData } from './images'
import initBoard from './board'
import initDom, { showElement, hideElement, removeElement } from './dom'
import initMouse from './mouse'
import initBeing from './being'

let allNekoIndex = 0

export default function createNeko(options) {

  let being = {}

  being.options = options
  being.index = allNekoIndex++

  initOptions(being)
  initBoard(being)
  initDom(being)
  initMouse(being)
  loadImages(being)

  initBeing(being)

  being.remove = () => {
    removeNeko(being)
    being = null
  }

  being.show = () => showElement(being.layer)
  being.hide = () => hideElement(being.layer)
  being.exportImages = () => exportImageData(being)

  return being
}

function removeNeko(being) {

  removeElement(being.layer)

  if (being.loopTimer) clearTimeout(being.loopTimer)

  being.mouse.unsubscribe()
}
