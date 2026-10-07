import { rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'

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
