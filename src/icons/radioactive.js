import { dot } from '../scene'

// 辐射标志：中心一点 + 三片 60° 的扇形叶片（内半径 3.5、外半径 9），叶片之间也相隔 60°
const polar = (r, deg) => [12 + r * Math.cos(deg * Math.PI / 180), 12 + r * Math.sin(deg * Math.PI / 180)]
const blade = (mid) => {
  const [a, b] = [mid - 30, mid + 30]
  const p = (r, d) => polar(r, d).join(' ')
  return `M${p(3.5, a)}L${p(9, a)}A9 9 0 0 1 ${p(9, b)}L${p(3.5, b)}A3.5 3.5 0 0 0 ${p(3.5, a)}Z`
}
export default () => [blade(-90), blade(30), blade(150), dot(12, 12, 2.5)]
