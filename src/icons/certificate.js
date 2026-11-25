import { GAP } from '../clearance'
import { circle, frame } from '../geometry'
import { clear, knock, solid } from '../solid'

// 证书（奖状）：横放的纸（墨迹 3–21 × 3–15，线宽变粗往里长）+ 纸上两行字（6.5 / 9.5）+ 压在纸的底边上的圆印章（圆心在底边的中线上、x = 16.5，半径 2.5，纸的底边在印章处断开）
// + 印章下面垂着的一条燕尾绶带
const paper = (radius, stroke) => frame(stroke, Math.min(radius, 2), [3, 3, 21, 15])
const lines = ['M6.5 6.5H14.5', 'M6.5 9.5H11.5']
const seal = stroke => circle(16.5, 15 - stroke / 2, 2.5)
// 绶带两条边在 14.5 / 18.5，上端落在印章的圆上（离圆心横向 2，圆上那一点在圆心下面 1.5）
const ribbon = stroke => `M14.5 ${16.5 - stroke / 2}V21L16.5 19.5L18.5 21V${16.5 - stroke / 2}`

export default ({ radius, stroke }) => [paper(radius, stroke), ...lines, { d: seal(stroke), cut: true, occlude: true }, ribbon(stroke)]

// 实心：纸一块，两行字挖空；印章在前，纸在印章四周让出缝；绶带照旧是线
export const fill = ({ radius, stroke }) => [
  solid(paper(radius, stroke)),
  knock(lines),
  clear(seal(stroke), GAP),
  solid(seal(stroke)),
  ribbon(stroke),
]
