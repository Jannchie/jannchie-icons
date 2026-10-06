// 斜体：上下两道短横 + 与竖直成 15° 的斜竖
const slant = 16 * Math.tan(Math.PI / 12) / 2
export default () => [
  `M${12 + slant - 4} 4H${12 + slant + 4}`,
  `M${12 - slant - 4} 20H${12 - slant + 4}`,
  `M${12 + slant} 4L${12 - slant} 20`,
]
