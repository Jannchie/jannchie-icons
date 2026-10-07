import { circle } from '../geometry'

// 饼图：圆 + 两条半径切出四分之一扇区（圆心挪到 (12.5, 11.5)，两条半径都落在 .5 上）
export default () => [
  circle(12.5, 11.5, 8.5),
  'M12.5 3V11.5H21',
]
