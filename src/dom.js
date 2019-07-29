import { boxWidth, boxHeight } from './box'

export default function initDom(being) {

  being.minX = 0
  being.minY = being.options.size

  being.maxX = boxWidth() - (being.options.size *2)
  being.maxY = boxHeight() - (being.options.size + 8)

  being.position = {
    x : being.options.x || being.minX, // Left
    y : being.options.y || being.maxY // Bottom
  }

  const layerId='being-layer-'+being.index
  //const strImage='imageNeko'+being.index
  //const strImageSrc=being.options.url+'/still.gif'
  const size = being.options.size

  const strContent = ''
  //`<span id="being-${being.index}" onfocus="this.blur()"><img border="0" name="${strImage}" width="${size}" height="${size}" src="${strImageSrc}"></span>`

  being.layer = createLayer(
    layerId,
    being.position.x,
    being.position.y,
    being.options.size, being.options.size,
    strContent
  )

  being.layer.style.cursor = 'pointer'

  being.homeX = being.layer.myx
  being.homeY = being.layer.myy

  being.doc = document

  // Canvas

  being.canvas = document.createElement('canvas')
  being.canvasContext = being.canvas.getContext('2d')
  being.canvas.width = size
  being.canvas.height = size

  being.layer.appendChild(being.canvas)

  //being.image = getByName(being.doc.images, strImage)
}

// Element

function createLayer( layerId, x, y, w, h, strContent) {

  const el = createElement(layerId)

  //setClip(el, 0, w, h, 0)
  showElement(el)

  setX(el, x)
  el.myx = x

  setY(el, y)
  el.myy = y

  setWidth(el, w)
  setHeight(el, h)

  if (strContent) setContent(el, strContent)
  setZIndex(el, 9999)

  return el
}

function createElement(i) {

  //const content = `<div id="${i}" style="position:absolute">&nbsp;</div>`
  const el = document.createElement('div')

  el.id = i
  el.style.position = 'absolute'
  //el.innerHTML = '&nbsp;'

  document.body.appendChild(el)

  return el
}

export function removeElement(el) {
  el.parentNode.removeChild(el)
}

export function getElement(id) {
  return document.getElementById(id)
}

export function showElement(el) {
  el.style.visibility = 'visible'
}

export function hideElement(el) {
  el.style.visibility = 'hidden'
}

export function setZIndex(el, z) {
  el.style.zIndex = z
}

export function setX(el, x) {
  el.style.left = x+'px'
}

export function setY(el, y) {
  el.style.top = y+'px'
}

export function setWidth(el, w) {
  el.style.width = w+'px'
}

export function setHeight(el, h) {
  el.style.height = h+'px'
}

export function setClip(el, t, r, b, x) {
  el.style.clip = `rect(${t}px ${r}px ${b}px ${x}px)`
}

export function setContent(el, h) {
  el.innerHTML = h
}
