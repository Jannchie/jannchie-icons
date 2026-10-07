import { rounded } from '../geometry'
import { cross } from '../symbols'

// 停止（八边形 + 叉）
// 外接圆半径取 8.5 / cos22.5°，横竖四条边正好落在 3.5 / 20.5
const R = 8.5 / Math.cos(22.5 * Math.PI / 180)
const v = Array.from({ length: 8 }, (_, i) => {
  const a = (22.5 + 45 * i) * Math.PI / 180
  return [12 + R * Math.cos(a), 12 + R * Math.sin(a)]
})
export default ({ radius }) => [rounded(v, Math.min(radius, 1.5)), ...cross([12, 12], 1.4).map(p => p.d ?? p)]
