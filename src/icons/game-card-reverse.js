import { card, cardFill } from '../game-card'
import { crisp, rounded } from '../geometry'
import { knock } from '../solid'

// 功能牌·反转：牌心里两道方向相反的折返箭头；箭头尖臂长 1.25，离另一道箭头的横杆留 1.75
// 两个拐角放在右上、左下——牌心转了 30°，这两个方向最宽（左上、右下最窄，拐角放那里会贴着牌心）
export default ({ radius }) => [
  ...card(radius),
  { d: 'M15 13.5V10.5H9.5', thin: true },
  { d: rounded([[10.75, 9.25], [9.5, 10.5], [10.75, 11.75]], crisp(radius), false), thin: true },
  { d: 'M9 10.5V13.5H14.5', thin: true },
  { d: rounded([[13.25, 12.25], [14.5, 13.5], [13.25, 14.75]], crisp(radius), false), thin: true },
]

// 实心：牌面填实，挖出牌心和两道箭头；箭杆停在箭头尖往里半个线宽处（尖角模式下方头的箭杆顶到尖上，两角会从斜接的箭头尖两侧戳出来）
export const fill = ({ radius, stroke }) => [
  ...cardFill(radius),
  knock([
    { d: `M15 13.5V10.5H${9.5 + stroke / 2}`, thin: true },
    { d: rounded([[10.75, 9.25], [9.5, 10.5], [10.75, 11.75]], crisp(radius), false), thin: true },
    { d: `M9 10.5V13.5H${14.5 - stroke / 2}`, thin: true },
    { d: rounded([[13.25, 12.25], [14.5, 13.5], [13.25, 14.75]], crisp(radius), false), thin: true },
  ]),
]
