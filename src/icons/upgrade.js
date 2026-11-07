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

// 实心：圆面填实，挖出向上的箭头；箭杆停在箭头尖往里半个线宽处：尖角模式下方头的箭杆顶到尖上，两角会从斜接的箭头尖两侧戳出来
export const fill = ({ radius, stroke }) => [
  solid(ring()),
  knock([`M12 16.5V${8 + stroke / 2}`, rounded(arrow(12, 8, 'up', 3), crisp(radius), false)]),
]
