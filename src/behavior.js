import {
  targetHome, targetMouse, targetRandomX,
  calculateDistance, findDirection, moveAStep
} from './move'
import { updateImage } from './images'

export function setBehavior(being, newBehavior) {

  const rand = Math.floor( Math.random()*100 )

  if (newBehavior == 'chooseIdle') {

    if (rand < 30) {
      if (!being.chasing ) targetRandomX(being)
    } else {
      setBehavior(being, chooseIdle(being))
    }

    return
  }

  // Decrease chances
  if (newBehavior == 'sleeping' && rand < 80) {
    setBehavior(being, 'resting')
    return
  }

  /*if (newBehavior == 'itching' && rand < 70) {
    setBehavior(being, 'resting')
    return
  }*/

  if (!newBehavior) return

  // Load behavior

  being.behavior = newBehavior
  being.frame = being.options.firstRealFrame

  const behaviors = being.actions[being.behavior]

  // Actions
  being.onCaught = behaviors[0]
  being.onUnCaught = behaviors[1]
  being.onLoopEnd = behaviors[2]
  being.loopTimes = behaviors[3]
  being.delayMultiplier = behaviors[4]
}

export function toggleChase(being) {

  if (being.chasing) {
    being.chasing = false
    targetHome(being)
  } else {
    being.chasing = true
    targetMouse(being)
  }
}

export function chooseIdle() {

  const actionChoice = [ 'resting', 'yawning', 'itching', 'scratching', 'hello' ]
  const choiceIndex = Math.floor(Math.random() * actionChoice.length)

  return actionChoice[choiceIndex]
}

export function think(being) {

  if (being.chasing) targetMouse(being)

  calculateDistance(being)
  findDirection(being)
  updateImage(being)

  if (being.behavior == 'chasing'
    // Don't move if cat is still
    && being.action != 'still' && being.action != 'alert'
  ) {
    moveAStep(being)
  }

  // Thinking frequency
  const delay = Math.floor( being.delay * being.delayMultiplier )

  // Loop
  being.loopTimer = setTimeout(() => think(being), delay)
}
