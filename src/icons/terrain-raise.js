import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 抬升地形：地平线 (y = 20.5) 中间隆起一座土丘，丘顶 (12.5, 13.5)，两侧用 S 形曲线和地平线相切
// 土丘正上方一支向上的箭头（竖线落在 x = 12.5，3.5 → 10.5），和丘顶留 3 的空隙
export default ({ radius }) => [
  'M2.5 20.5H5.5C8.5 20.5 9.5 13.5 12.5 13.5C15.5 13.5 16.5 20.5 19.5 20.5H21.5',
  'M12.5 10.5V3.5',
  rounded(arrow(12.5, 3.5, 'up', 3), crisp(radius), false),
]
