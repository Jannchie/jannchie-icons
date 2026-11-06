import { circle } from '../geometry'
import { solid } from '../solid'
import { success } from '../tone'

// 已验证用户：和添加用户同一个人形（往左挪）+ 右侧对勾（16–21 × 8.5–12.5）
export default () => [
  circle(9, 8, 3.5),
  'M2.5 20A6.5 6 0 0 1 15.5 20',
  ...success(['M16 10.5L17.75 12.25L21 8.75']),
]

// 实心：头填实、肩膀封口填实；对勾照旧是线
export const fill = () => [
  solid([circle(9, 8, 3.5), 'M2.5 20A6.5 6 0 0 1 15.5 20Z']),
  ...success(['M16 10.5L17.75 12.25L21 8.75']),
]
