import { crisp, rounded } from '../geometry'
import { ring } from '../marks'

// 足球：圆 + 中间的正五边形 + 从五边形每个顶点射向球边的缝线
const polar = (r, i) => [12 + r * Math.cos((-90 + 72 * i) * Math.PI / 180), 12 + r * Math.sin((-90 + 72 * i) * Math.PI / 180)]
const penta = [0, 1, 2, 3, 4].map(i => polar(3.5, i))
export default ({ radius }) => [
  ring(),
  rounded(penta, crisp(radius)),
  ...penta.map((p, i) => `M${p.join(' ')}L${polar(9, i).join(' ')}`),
]
