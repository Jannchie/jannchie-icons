import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 顺序播放：三行列表 + 向下箭头
export default ({ radius }) => [
  'M3.5 7H14.5',
  'M3.5 12H14.5',
  'M3.5 17H10.5',
  'M18.5 7V17',
  rounded(arrow(18.5, 17, 'down'), crisp(radius), false),
]
