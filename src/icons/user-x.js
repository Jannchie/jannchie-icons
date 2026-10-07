import { circle } from '../geometry'
import { danger } from '../tone'

// 删除用户：和添加用户同一个人形（往左挪）+ 右侧叉（16.25–20.75 × 8.25–12.75，同一条路径里交叉）
export default () => [
  circle(9, 8, 3.5),
  'M2.5 20A6.5 6 0 0 1 15.5 20',
  ...danger(['M16.25 8.25L20.75 12.75M20.75 8.25L16.25 12.75']),
]
