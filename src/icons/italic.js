// 斜体：上下两道短横 + 与竖直成 15° 的斜竖
// 上下两横在 4.5 / 19.5 上
const [top, bottom] = [4.5, 19.5]
const slant = (bottom - top) * Math.tan(Math.PI / 12) / 2
export default () => [
  `M${12 + slant - 4} ${top}H${12 + slant + 4}`,
  `M${12 - slant - 4} ${bottom}H${12 - slant + 4}`,
  `M${12 + slant} ${top}L${12 - slant} ${bottom}`,
]
