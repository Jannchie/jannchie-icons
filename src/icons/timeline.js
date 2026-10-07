import { circle, crisp, rounded } from '../geometry'

// 时间线：一根竖线串起三个节点 + 每个节点右边一行文字；横竖线落在 .5 上，整体往左上偏半格
export default ({ radius, stroke }) => [
  circle(5.5, 4.5, 1.75),
  circle(5.5, 11.5, 1.75),
  circle(5.5, 18.5, 1.75),
  'M5.5 6.25V9.75',
  'M5.5 13.25V16.75',
  'M10.5 4.5H20',
  'M10.5 11.5H17',
  'M10.5 18.5H19',
]
