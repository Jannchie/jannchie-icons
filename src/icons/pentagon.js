import { rounded } from '../geometry'

// 五边形：尖顶朝上的正五边形，外接圆半径 9.7；底边落在 20.5 上
const R = 9.7
const cy = 20.5 - R * Math.cos(Math.PI / 5)
const pts = Array.from({ length: 5 }, (_, i) => {
  const a = -Math.PI / 2 + i * 2 * Math.PI / 5
  return [12 + R * Math.cos(a), i === 2 || i === 3 ? 20.5 : cy + R * Math.sin(a)]
})
export default ({ radius }) => [rounded(pts, Math.min(radius, 2))]
