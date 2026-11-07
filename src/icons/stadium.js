import { crisp, rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'
import { hole, solid, stacked } from '../solid'

// 体育场：正面看的椭圆形场馆——顶上一圈椭圆看台口，两侧外墙落地，墙上一道顺着椭圆前沿的弧线分出上下两层；
// 正中拱门，看台后沿立两面旗
const [cx, rimY, rx, ry] = [12, 10, 8.5, 2]
const backY = x => rimY - ry * Math.sqrt(1 - ((x - cx) / rx) ** 2) // 看台后沿上 x 处的 y
const flag = x => `M${x} ${+backY(x).toFixed(2)}V2.5L${x + 3} 3.75L${x} 5`

export default ({ radius }) => [
  groundLine,
  `M${cx - rx} ${rimY}a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0`,
  `M${cx - rx} ${rimY}V${GROUND}`,
  `M${cx + rx} ${rimY}V${GROUND}`,
  `M${cx - rx} 13.5A${rx} ${ry} 0 0 0 ${cx + rx} 13.5`,
  flag(7.5),
  flag(15.5),
  rounded(opening(12, 3, 3.5), radius, false),
]

// 实心：看台口的椭圆在前，完整的一块；墙身在后，沿椭圆让出 GAP 的缝（见 solid.js 的 stacked），门挖空。
// 墙上的分层弧线实心版不画：描边版那条半椭圆两端和外墙相切，挖出来的缝在墙边收成越来越细的尖条、还在外轮廓上啃出缺口；
// 椭圆和门之间又只有 5 高，椭圆让出缝以后再挖一道线，夹在中间的上层只剩 1 宽的细条。
// 旗子是实心小三角（贴着旗杆的两个角给 0.5 的小圆角，尖角模式下锐角斜接不会比旗杆顶还高），旗杆和地平线照旧是线
export const fill = ({ radius, stroke }) => [
  ...stacked(
    `M${cx - rx} ${GROUND}V${rimY}H${cx + rx}V${GROUND}Z`,
    `M${cx - rx} ${rimY}a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0`,
  ),
  hole(rounded(opening(12, 3 - stroke, 3.5 - stroke / 2), Math.max(0, radius - stroke / 2), false)),
  ...[7.5, 15.5].flatMap(x => [
    `M${x} ${+backY(x).toFixed(2)}V2.5`,
    solid(rounded([[x, 2.5, 0.5], [x + 3, 3.75], [x, 5, 0.5]], crisp(radius))),
  ]),
  groundLine,
]
