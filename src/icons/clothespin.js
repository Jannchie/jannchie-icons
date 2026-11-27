import { circle, rounded } from '../geometry'
import { hole, knock, solid } from '../solid'

// 晾衣夹（木头夹子，竖放、夹口朝下）：两片木夹片合成的一条轮廓——上面两根把手张开（6.5–9.5 / 14.5–17.5，中间一个 V 形的豁口，尖在 (12, 9.5)），
// 往下略微收拢成合上的夹口（8.5–15.5 在 21.5）；豁口尖往下一条合缝一直到夹口，合缝上一个夹晾衣绳的圆孔（圆心 (12, 17)、半径 1.5）；
// 腰上一道横着的弹簧钢丝（12.5，两端落在夹片的外缘上：x = 7.55 / 16.45）
// 靠「张开的把手 + 合拢的夹口 + 腰上的弹簧」认出来
const body = radius => rounded([[6.5, 2.5], [9.5, 2.5], [12, 9.5, 0], [14.5, 2.5], [17.5, 2.5], [15.5, 21.5], [8.5, 21.5]], Math.min(radius, 1))
const grip = circle(12, 17, 1.5)
const spring = 'M7.55 12.5H16.45'

export default ({ radius }) => [body(radius), 'M12 9.5V15.5', 'M12 18.5V21.5', grip, spring]

// 实心：夹子一块；合缝从豁口一直挖到夹口外面（两片夹片分开），圆孔挖成洞（和描边版圆孔的外缘一样大）；
// 弹簧钢丝不挖：再横着切一刀，两片夹片就碎成四截
export const fill = ({ radius }) => [
  solid(body(radius)),
  knock('M12 8V24'),
  hole(grip),
]
