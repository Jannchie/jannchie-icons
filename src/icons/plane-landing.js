import { plane } from '../plane'
import { GROUND, groundLine } from '../scene'
import { affine, rotate } from '../transform'

// 降落：客机缩到 0.75、机头压低 25°（朝右下），在跑道线（地平线）上方
const K = 0.75
export default ({ radius }) => [
  groundLine,
  ...plane(radius).map(d => rotate(affine(d, K, K, 12 - 12 * K - 0.5, GROUND - 8.5 - 12 * K), 25, [11.5, GROUND - 8.5])),
]
