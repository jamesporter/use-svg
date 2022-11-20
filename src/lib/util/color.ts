export function hsla(
  hue: number,
  saturation: number,
  lightness: number,
  alpha: number = 1
) {
  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
}

export function rgba(
  red: number,
  green: number,
  blue: number,
  alpha: number = 1
) {
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}
