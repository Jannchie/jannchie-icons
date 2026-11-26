import { crisp, rounded } from '../geometry'
import { dot, eye } from '../scene'
import { knock, solid } from '../solid'

// 木琴：上面一排四根竖着的琴键（宽 2，x 3.5 / 8.5 / 13.5 / 18.5 起，相邻两根的边隔 3，粗字重下也分得开），
// 从左到右一根比一根短、上下对称地收（中心都在 y 10.5，每根上下各收 1）+ 下面斜躺着一根琴槌（杆从左下 (3.5, 20.5) 往右，圆头在右下）。
// 琴键用小圆角（crisp），像一根根木条，圆角大了会像一排药丸或数字 0。靠"长短递减的琴键 + 琴槌"认出来
const BARS = [[3.5, 3.5, 17.5], [8.5, 4.5, 16.5], [13.5, 5.5, 15.5], [18.5, 6.5, 14.5]]
const bars = radius => BARS.map(([x, y0, y1]) => rounded([[x, y0], [x + 2, y0], [x + 2, y1], [x, y1]], crisp(radius)))
const stick = 'M3.5 20.5L15.75 19.1'
const head = dot(18, 18.85, 3.5)

export default ({ radius }) => [...bars(radius), stick, head]

// 实心：琴键填实，每根上下各挖一颗固定钉的圆孔（在两头往里约 2/9 处，真木琴的振动节点）；
// 琴槌的杆照旧是线，圆头是实心圆点（尖角模式下也不变方）
const NAILS = BARS.flatMap(([x, y0, y1]) => [[x + 1, y0 + (y1 - y0) * 2 / 9], [x + 1, y1 - (y1 - y0) * 2 / 9]])
export const fill = ({ radius }) => [
  solid(bars(radius)),
  knock(NAILS.map(([x, y]) => eye(x, y, 1.5))),
  stick,
  { ...head, round: true },
]
