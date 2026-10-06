import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 随机播放：两条 45° 交叉的线，右端各带箭头
export default ({ radius }) => [
  rounded([[3.5, 7], [6.5, 7], [16.5, 17], [20.5, 17]], radius, false),
  rounded(arrow(20.5, 17, 'right'), crisp(radius), false),
  rounded([[3.5, 17], [6.5, 17], [16.5, 7], [20.5, 7]], radius, false),
  rounded(arrow(20.5, 7, 'right'), crisp(radius), false),
]
