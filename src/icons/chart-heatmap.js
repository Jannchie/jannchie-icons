import { rounded } from '../geometry'
import { dot } from '../scene'
import { knock, spans, tile } from '../solid'

// 热力图：3×3 网格，格子里的点大小代表数值强弱
export default ({ radius }) => [
  // 框 18×18 居中，每格宽 6
  rounded([[3, 3], [21, 3], [21, 21], [3, 21]], Math.min(radius, 2)),
  'M9 3V21',
  'M15 3V21',
  'M3 9H21',
  'M3 15H21',
  dot(6, 6, 3.5),
  dot(12, 6, 1.25),
  dot(18, 6, 2.5),
  dot(6, 12, 2.5),
  dot(12, 12, 3.5),
  dot(18, 12, 1.25),
  dot(6, 18, 1.25),
  dot(12, 18, 2.5),
  dot(18, 18, 3.5),
]

// 实心：九个独立的方块（见 solid.js 的 tile），块和块之间留 GAP 的缝，再从每块里挖掉大小不同的点；
// 格子只有 6 见方，圆角最多 0.5（和 tetromino 一样）
export const fill = ({ radius, stroke }) => {
  const cells = spans(3, 21, [9, 15], stroke)
  return [
    ...cells.flatMap(([y0, y1]) => cells.map(([x0, x1]) => tile([x0, y0, x1, y1], Math.min(radius, 0.5)))),
    knock([
      dot(6, 6, 3.5),
      dot(12, 6, 1.25),
      dot(18, 6, 2.5),
      dot(6, 12, 2.5),
      dot(12, 12, 3.5),
      dot(18, 12, 1.25),
      dot(6, 18, 1.25),
      dot(12, 18, 2.5),
      dot(18, 18, 3.5),
    ]),
  ]
}
