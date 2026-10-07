import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 顺序播放：三行列表 + 向下箭头
export default ({ radius }) => [
  'M3.5 6.5H14.5',
  'M3.5 11.5H14.5',
  'M3.5 16.5H10.5',
  'M18.5 6.5V16.5',
  rounded(arrow(18.5, 16.5, 'down'), crisp(radius), false),
]
