import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 全部压低：所有墙都压到只剩一层砖（墙体 3.5–19.5 × 16.5–20.5，竖缝 7.5 / 15.5）；
// 上方两支向下的箭头对着两条竖缝（x 7.5 / 15.5，3.5 → 13.5，尖端离墙顶 3），表示所有墙一起往下压
export default ({ radius }) => [
  rounded([[3.5, 16.5], [19.5, 16.5], [19.5, 20.5], [3.5, 20.5]], Math.min(radius, 1)),
  'M7.5 16.5V20.5',
  'M15.5 16.5V20.5',
  ...[7.5, 15.5].flatMap(x => [`M${x} 3.5V13.5`, rounded(arrow(x, 13.5, 'down', 2.5), crisp(radius), false)]),
]
