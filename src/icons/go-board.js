import { circle } from '../geometry'
import { dot } from '../scene'

// 围棋：3×3 的盘线 + 两颗黑子（大实心点）+ 一颗白子（圆圈，作为遮挡刀：盘线在白子处断开，白子内部也清空）
export default () => [
  // 盘线 4–20，中线过中心 12
  'M4 7H20',
  'M4 12H20',
  'M4 17H20',
  'M7 4V20',
  'M12 4V20',
  'M17 4V20',
  dot(12, 12, 5),
  dot(7, 17, 5),
  { d: circle(17, 7, 2.25), cut: true, gap: 0, occlude: true },
]
