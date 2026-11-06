import { circle } from '../geometry'
import { solid } from '../solid'
import { danger } from '../tone'

// 移除用户：和添加用户同一个人形（往左挪）+ 右侧减号
export default () => [
  circle(9, 8, 3.5),
  'M2.5 20A6.5 6 0 0 1 15.5 20',
  ...danger(['M16 10.5H21']),
]

// 实心：头填实、肩膀封口填实；减号照旧是线
export const fill = () => [
  solid([circle(9, 8, 3.5), 'M2.5 20A6.5 6 0 0 1 15.5 20Z']),
  ...danger(['M16 10.5H21']),
]
