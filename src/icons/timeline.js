import { circle, crisp, rounded } from '../geometry'
import { solid } from '../solid'

// 时间线：一根竖线串起三个节点 + 每个节点右边一行文字
export default ({ radius, stroke }) => [
  circle(5.5, 5, 1.75),
  circle(5.5, 12, 1.75),
  circle(5.5, 19, 1.75),
  'M5.5 6.75V10.25',
  'M5.5 13.75V17.25',
  'M10.5 5H20',
  'M10.5 12H17',
  'M10.5 19H19',
]

// 实心：三个节点填实，竖线和文字行照旧是线
export const fill = () => [
  solid([circle(5.5, 5, 1.75), circle(5.5, 12, 1.75), circle(5.5, 19, 1.75)]),
  'M5.5 6.75V10.25',
  'M5.5 13.75V17.25',
  'M10.5 5H20',
  'M10.5 12H17',
  'M10.5 19H19',
]
