import { rounded } from '../geometry'
import { cross } from '../symbols'

// 停止（八边形 + 叉）
const v = Array.from({ length: 8 }, (_, i) => {
  const a = (22.5 + 45 * i) * Math.PI / 180
  return [12 + 9.5 * Math.cos(a), 12 + 9.5 * Math.sin(a)]
})
export default ({ radius }) => [rounded(v, Math.min(radius, 1.5)), ...cross([12, 12], 1.4).map(p => p.d ?? p)]
