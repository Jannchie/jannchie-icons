import { circle } from '../geometry'

// 一键开关（IEC 60417-5010，「I」在「O」里）：圆（圆心 (12, 12)、半径 8.5）+ 圆里一根竖线（7.5–16.5），线头离圆 1.5
export default () => [
  circle(12, 12, 8.5),
  'M12 7.5V16.5',
]
