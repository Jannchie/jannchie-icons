import { rounded } from '../geometry'
import { dot } from '../scene'
import { knock, solid } from '../solid'

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

// 实心：方框一块，格线伸出外框一个线宽挖穿，切成 3×3 块；再从每块里挖掉大小不同的点
export const fill = ({ radius, stroke }) => [
  solid(rounded([[3, 3], [21, 3], [21, 21], [3, 21]], Math.min(radius, 2))),
  knock([
    ...[9, 15].map(v => `M${v} ${3 - stroke}V${21 + stroke}`),
    ...[9, 15].map(v => `M${3 - stroke} ${v}H${21 + stroke}`),
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
