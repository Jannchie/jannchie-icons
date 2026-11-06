import { circle } from '../geometry'
import { solid } from '../solid'
import { success } from '../tone'

// 添加用户：用户往左挪 + 右侧加号
export default ({ radius }) => [
  circle(9, 8, 3.5),
  'M2.5 20A6.5 6 0 0 1 15.5 20',
  ...success(['M18.5 8V13', 'M16 10.5H21']),
]

// 实心：头填实、肩膀封口填实；加号照旧是线
export const fill = () => [
  solid([circle(9, 8, 3.5), 'M2.5 20A6.5 6 0 0 1 15.5 20Z']),
  ...success(['M18.5 8V13', 'M16 10.5H21']),
]
