import { circle } from '../geometry'
import { solid } from '../solid'
import { danger } from '../tone'

// 删除用户：和添加用户同一个人形（往左挪）+ 右侧叉（16.25–20.75 × 8.25–12.75，同一条路径里交叉）
export default () => [
  circle(9, 8, 3.5),
  'M2.5 20A6.5 6 0 0 1 15.5 20',
  ...danger(['M16.25 8.25L20.75 12.75M20.75 8.25L16.25 12.75']),
]

// 实心：头填实、肩膀封口填实；叉照旧是线
export const fill = () => [
  solid([circle(9, 8, 3.5), 'M2.5 20A6.5 6 0 0 1 15.5 20Z']),
  ...danger(['M16.25 8.25L20.75 12.75M20.75 8.25L16.25 12.75']),
]
