
// Box

export function boxWidth() {
  if (window.innerWidth) {
    return window.innerWidth
  } else {
    return document.body.clientWidth
  }
}

export function boxHeight() {

  const body = document.body
  const html = document.documentElement

  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  )

  return height
}

export function boxXOffset() {
  if (typeof window.pageXOffset!='undefined') return window.pageXOffset
  return document.body.scrollLeft
}

export function boxYOffset() {
  if (typeof window.pageYOffset!='undefined') return window.pageYOffset
  return document.body.scrollTop
}
