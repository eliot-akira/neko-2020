
// Utilities

export function getByName(array, name) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].name == name) {
      return array[i]
    }
  }
  return null
}

export function boundValue(val, min, max) {
  if (val < min) return min
  if (val > max) return max
  return val
}
