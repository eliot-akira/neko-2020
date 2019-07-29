
export default function initMouse(being) {

  const mouse = {
    x : 0,
    y : 0
  }

  // Track mouse position
  const onMouseMove = function(e) {
    mouse.x = e ? e.pageX : event.x + document.body.scrollLeft
    mouse.y = e ? e.pageY : event.y + document.body.scrollTop
  }

  document.addEventListener('mousemove', onMouseMove)

  being.mouse = mouse
  being.mouse.unsubscribe = () => document.removeEventListener('mousemove', onMouseMove)
}
