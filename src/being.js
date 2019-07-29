import { setBehavior, think, toggleChase } from './behavior'

export default function initBeing(being) {

  // Action: onCaught, onUnCaught, onLoopEnd, loopTimes, delayMultiplier

  being.actions = {
    resting: ['', 'wakingup', 'chooseIdle', 10, 1, 'still'],
    resting2: ['', 'wakingup', 'sleeping', 8, 1, 'still'],

    yawning: ['', 'wakingup', 'resting2', 5, 1, 'yawn'],

    itching: ['', 'wakingup', 'resting', 6, .7, 'itch2', 'itch1'],
    scratching: ['', 'wakingup', 'resting', 6, 1, 'scratch1', 'scratch2'],
    sleeping: ['', 'wakingup', '', 8, 1,
      'sleep1', 'sleep1', 'sleep1', 'sleep2', 'sleep2', 'sleep2'
    ],
    wakingup: ['resting', '', 'chasing', 1, 1, 'still', 'alert'],
    chasing: ['resting', '', '', 0, 0.8, 'run1', 'run2'],

    hello: ['', 'wakingup', 'resting', 6, 1, 'maneki2', 'maneki1']
  }

  being.behaviorRepetition = 0
  being.loopTimes = 0

  being.direction = ''
  being.looseDirection = ''

  being.endx = 0
  // being.endy = 0
  // being.distx = 0
  // being.disty = 0
  // being.steps = 0

  being.caught = true
  // being.dx = 0
  // being.dy = 0

  being.boardX = -1
  being.boardY = -1
  being.stepSize = Math.floor( being.options.size * 0.36 )  // 36 : 100

  being.delay = being.options.speed // + Math.floor( variance *Math.random()-5);
  being.delayMultiplier = 1

  being.frame = being.options.firstRealFrame

  setBehavior(being, 'resting')

  // On click: target mouse or home

  being.layer.addEventListener('click', () => {
    event.preventDefault()
    toggleChase(being)
  })

  /*
    // After 3 min, start chasing anyway
    setTimeout(function() {
      if (!being.chasing ) toggleChase(being);
    }, 3 * 60 * 1000 );
    */

  think(being)

}
