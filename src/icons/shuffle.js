import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 随机播放：两条 45° 交叉的线，右端各带箭头
export default ({ radius }) => [
  rounded([[3.5, 7.5], [7, 7.5], [16, 16.5], [20.5, 16.5]], radius, false),
  rounded(arrow(20.5, 16.5, 'right'), crisp(radius), false),
  rounded([[3.5, 16.5], [7, 16.5], [16, 7.5], [20.5, 7.5]], radius, false),
  rounded(arrow(20.5, 7.5, 'right'), crisp(radius), false),
]
