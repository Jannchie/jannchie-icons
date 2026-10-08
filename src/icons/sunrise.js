import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 日出：地平线 + 露出一半的太阳 + 两侧 45° 光线 + 上方向上的箭头
const [cx, cy, r] = [12, 18.5, 5]
const ray = (deg) => {
  const [c, s] = [Math.cos(deg * Math.PI / 180), Math.sin(deg * Math.PI / 180)]
  return `M${cx + 7 * c} ${cy + 7 * s}L${cx + 8.75 * c} ${cy + 8.75 * s}`
}

export default ({ radius }) => [
  'M2.5 18.5H21.5',
  `M${cx - r} ${cy}A${r} ${r} 0 0 1 ${cx + r} ${cy}`,
  ray(-45),
  ray(-135),
  'M12 10V3',
  rounded(arrow(12, 3, 'up', 2.5), crisp(radius), false),
]
