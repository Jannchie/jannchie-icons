import { plane } from '../plane'
import { GROUND, groundLine } from '../scene'
import { affine, rotate } from '../transform'

// 起飞：客机缩到 0.7、机头抬起 25°（朝右上），离跑道线（地平线）留开——机尾的平尾不碰到跑道
const K = 0.7
export default ({ radius }) => [
  groundLine,
  ...plane(radius).map(d => rotate(affine(d, K, K, 12 - 12 * K + 0.5, GROUND - 9.5 - 12 * K), -25, [12.5, GROUND - 9.5])),
]
