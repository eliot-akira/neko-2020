import { boundValue } from './utils'
import { setX, setY } from './dom'
import { setBoard } from './board'
import { setBehavior } from './behavior'

export function targetMouse(being) {

  const endx = boundValue( being.mouse.x, being.minX, being.maxX )
  const endy = boundValue( being.mouse.y, being.minY, being.maxY )

  being.endx = endx
  being.endy = endy

  setBoard(being, being.endx, being.endy)
}

export function targetHome(being) {
  being.endx = being.homeX
  being.endy = being.homeY
}

export function targetRandom(being) {

  const range = being.stepSize * 100

  const changeX = Math.floor( Math.random() * range ) - ( range / 2 )
  const changeY = Math.floor( Math.random() * range ) - ( range / 2 )

  being.endx = boundValue( being.position.x + changeX, being.minX, being.maxX )
  being.endy = boundValue( being.position.y + changeY, being.minY, being.maxY )
}

export function targetRandomX(being) {

  const range = being.stepSize * 100
  const changeX = Math.floor( Math.random() * range ) - ( range / 2 )

  being.endx = boundValue(being.position.x + changeX, being.minX, being.maxX)
  being.endy = being.position.y
}

export function calculateDistance(being) {

  being.distx = being.endx-being.layer.myx
  being.disty = being.endy-being.layer.myy
  being.steps = Math.sqrt(
    Math.pow(being.distx, 2) + Math.pow(being.disty, 2)
  ) / being.stepSize

  if (being.steps >= 1) {

    if (being.caught) {
      setBehavior(being,  being.onUnCaught)
    }

    being.caught=false

  } else {

    if (!being.caught) {
      setBehavior(being,  being.onCaught)
    }

    being.caught=true
  }

  being.dx = being.distx / being.steps
  being.dy = being.disty / being.steps
}

export function moveAStep(being) {

  if (being.steps >= 1 ){
    being.layer.myx += being.dx
    being.layer.myy += being.dy
  } else {
    being.layer.myx = being.endx
    being.layer.myy = being.endy
  }

  setX(being.layer, being.layer.myx)
  setY(being.layer, being.layer.myy)

  setBoard(being, being.layer.myx, being.layer.myy)
}

export function findDirection(being) {

  if (dx == 0 && dy==0){
    being.direction = ''
    return
  }

  const dy = -1 * being.dy
  const dx = being.dx
  const adx = Math.abs(dx)
  const ady = Math.abs(dy)
  const tan = ady/adx
  const bNSShallow = (tan<.41421)
  const bEWShallow = (tan>2.4142)

  let ns = ''
  let ew = ''

  if (dy > 0) {
    if (!bNSShallow) ns = 'n'
  } else {
    if (!bNSShallow) ns = 's'
  }

  if (dx > 0) {
    if (!bEWShallow) ew = 'e'
  } else {
    if (!bEWShallow) ew = 'w'
  }

  if (ew != '') {
    being.looseDirection = ew
  } else {
    being.looseDirection = ns
  }

  being.direction = ns + ew
}
