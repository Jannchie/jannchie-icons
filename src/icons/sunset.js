import { crisp, rounded } from '../geometry'
import { arrow } from '../media'
import { solid } from '../solid'

// 日落：地平线 + 露出一半的太阳 + 两侧 45° 光线 + 上方向下的箭头
const [cx, cy, r] = [12, 18.5, 5]
const ray = (deg) => {
  const [c, s] = [Math.cos(deg * Math.PI / 180), Math.sin(deg * Math.PI / 180)]
  return `M${cx + 7 * c} ${cy + 7 * s}L${cx + 8.75 * c} ${cy + 8.75 * s}`
}

const horizon = 'M2.5 18.5H21.5'
const sun = `M${cx - r} ${cy}A${r} ${r} 0 0 1 ${cx + r} ${cy}`
const lines = radius => [
  ray(-45),
  ray(-135),
  'M12 3V10',
  rounded(arrow(12, 10, 'down', 2.5), crisp(radius), false),
]

export default ({ radius }) => [
  horizon,
  sun,
  ...lines(radius),
]

// 实心：露出地平线的半个日轮填实（底边和地平线连成一体），光线、箭头、地平线照旧是线
export const fill = ({ radius }) => [
  horizon,
  solid(`${sun}Z`),
  ...lines(radius),
]
