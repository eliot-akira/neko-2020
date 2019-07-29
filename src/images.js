import defaultImageData from './defaultImageData'
import { setBehavior } from './behavior'

// Images

export default function loadImages(being) {

  being.images = []
  being.actionImageData = defaultImageData

  // Images for all actions
  const actions = [
    'alert',
    'still',
    'nrun1', 'nrun2', 'nerun1', 'nerun2',
    'erun1', 'erun2', 'serun1', 'serun2',
    'srun1', 'srun2', 'swrun1', 'swrun2',
    'wrun1', 'wrun2', 'nwrun1', 'nwrun2',
    'yawn',
    'sleep1', 'sleep2',
    'itch1', 'itch2',
    'nscratch1', 'nscratch2', 'escratch1', 'escratch2',
    'sscratch1', 'sscratch2', 'wscratch1', 'wscratch2',

    'maneki1',
    'maneki2'
  ]

  const count = actions.length
  let img

  for (let i = 0; i < count; i++) {

    img = new Image()

    img.src = being.options.url
      ? being.options.url+'/'+actions[i]+'.gif'
      : being.actionImageData[ actions[i] ]

    being.images[ actions[i] ] = img
  }

  setActionImage(being, 'still')
}

export function exportImageData(being) {

  being.actionImageData = {}

  Object.keys(being.images).forEach(action => {
    setActionImage(being, action)
    being.actionImageData[ action ] = being.canvas.toDataURL('image/png')
  })

  return being.actionImageData
}

export function updateImage(being) {

  let action
  const behaviors =being.actions[being.behavior]

  if (being.frame >= behaviors.length ){

    being.behaviorRepetition++

    if (being.loopTimes!=0 && being.behaviorRepetition>=being.loopTimes) {

      being.behaviorRepetition = 0

      if (being.onLoopEnd) {
        setBehavior(being,  being.onLoopEnd)
      }

    } else {
      being.frame = being.options.firstRealFrame
    }
  }

  // Decide which image

  if (being.images[ being.direction + behaviors[being.frame] ]) {
    action = being.direction+behaviors[being.frame]
  } else if (being.images[ behaviors[being.frame] ]) {
    action = behaviors[being.frame]
  } else if (being.images[ being.looseDirection + behaviors[being.frame] ]) {
    action = being.looseDirection+behaviors[being.frame]
  } else {
    //action = 'still' // alert
    return
  }

  setActionImage(being, action)

  being.action = action
  being.frame++
}

export function setActionImage(being, action) {

  being.canvasContext.clearRect(0, 0, being.options.size, being.options.size)
  being.canvasContext.drawImage(being.images[ action ], 0, 0, being.options.size, being.options.size)
  //being.image.src = being.images[ action ].src
}
