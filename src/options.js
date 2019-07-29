
const defaultOptions = {
  url : '', // URL to image directory

  size : 48, // Size in px
  speed : 180,

  chasing : false, // Chase mouse on launch

  x : 0, y : 0, // Start position
  scale : 20, // Used in box()
  firstRealFrame : 5, // Neko, setBehavior, updateImage
}

export default function initOptions(being) {
  being.options = {
    ...defaultOptions,
    ...being.options
  }
}
