import { ring } from '../marks'
import { crisp, rounded } from '../geometry'

// 晶体管（NPN）：圆 + 竖直的基极板 + 左侧基极引线（与圆心齐平） + 斜出的集电极和带箭头的发射极
export default ({ radius }) => [
  ring(),
  'M3.01 12H9.5',
  'M9.5 7.5V16.5',
  'M9.5 10L14.5 6.5V3',
  'M9.5 14L14.5 17.5V21',
  rounded([[12, 17.75], [14.5, 17.5], [13.5, 15.25]], crisp(radius), false),
]
