import { circle } from '../geometry'

// 饼图：圆 + 两条半径切出四分之一扇区
export default () => [
  circle(12, 12, 8.5),
  'M12 3.5V12H20.5',
]
