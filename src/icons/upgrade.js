import { circle, crisp, rounded } from '../geometry'
import { arrow } from '../media'
import { ring, square } from '../marks'
import { knock, solid } from '../solid'

// 升级：圆圈 + 向上的箭头（竖线落在中轴 x=12 上）
export default ({ radius, stroke }) => [
  ring(),
  'M12 16.5V8',
  rounded(arrow(12, 8, 'up', 3), crisp(radius), false),
]

// 实心：圆面填实，挖出向上的箭头
export const fill = ({ radius }) => [
  solid(ring()),
  knock(['M12 16.5V8', rounded(arrow(12, 8, 'up', 3), crisp(radius), false)]),
]
