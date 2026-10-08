import { crisp, rounded } from '../geometry'

// 十二面骰（d12）：正十边形外轮廓 + 中间尖朝上的正五边形正面 + 正面五个顶点各连到同方向的外顶点
// 中心在 (12, 12)；外轮廓半径取 9 / cos18°，左右两条竖边落在 3 / 21 上；
// 正面半径取 4.5 / sin54°，底边落在 16.5 上
const polar = (r, deg) => [12 + r * Math.cos(deg * Math.PI / 180), 12 + r * Math.sin(deg * Math.PI / 180)]
const outer = Array.from({ length: 10 }, (_, i) => polar(9 / Math.cos(Math.PI / 10), -90 + 36 * i))
const face = Array.from({ length: 5 }, (_, i) => polar(4.5 / Math.sin(0.3 * Math.PI), -90 + 72 * i))
export default ({ radius }) => [
  rounded(outer, crisp(radius)),
  rounded(face, crisp(radius)),
  ...face.map((p, i) => `M${p.join(' ')}L${outer[i * 2].join(' ')}`),
]
