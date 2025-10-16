export default function parseHours(hours: number, empty?: boolean) {
  const negative = hours < 0
  hours = hours < 0 ? hours * -1 : hours
  return hours
    ? `${negative ? '-' : ''}${Math.floor(hours / 1) < 10 ? '0' : ''}${Math.floor(hours / 1)}:${Math.round(
        (hours % 1) * 60
      )
        .toString()
        .padStart(2, '0')}`
    : empty
    ? ''
    : '00:00'
}
