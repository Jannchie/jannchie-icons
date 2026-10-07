import { circle } from '../geometry'
import { danger } from '../tone'

// 移除用户：和添加用户同一个人形（往左挪）+ 右侧减号
export default () => [
  circle(9, 8, 3.5),
  'M2.5 20A6.5 6 0 0 1 15.5 20',
  ...danger(['M16 10.5H21']),
]
