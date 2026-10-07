import { circle } from '../geometry'
import { dot } from '../scene'

// 围棋：3×3 的盘线 + 两颗黑子（大实心点）+ 一颗白子（圆圈，作为遮挡刀：盘线在白子处断开，白子内部也清空）
export default () => [
  // 整体右移、下移半格，盘线都落在 .5 上
  'M4.5 7.5H20.5',
  'M4.5 12.5H20.5',
  'M4.5 17.5H20.5',
  'M7.5 4.5V20.5',
  'M12.5 4.5V20.5',
  'M17.5 4.5V20.5',
  dot(12.5, 12.5, 5),
  dot(7.5, 17.5, 5),
  { d: circle(17.5, 7.5, 2.25), cut: true, gap: 0, occlude: true },
]
