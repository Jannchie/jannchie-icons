import { circle } from '../geometry'
import { knock, solid } from '../solid'

// 饼图：圆 + 两条半径切出四分之一扇区
export default () => [
  circle(12, 12, 8.5),
  'M12 3.5V12H20.5',
]

// 实心：圆片一块，两条半径伸出圆边一个线宽挖穿，切出四分之一扇区
export const fill = ({ stroke }) => [
  solid(circle(12, 12, 8.5)),
  knock(`M12 ${3.5 - stroke}V12H${20.5 + stroke}`),
]
