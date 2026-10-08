import { card } from '../game-card'
import { glyph, LABEL } from '../letters'

// 功能牌 +2：牌心里一个小加号 + 数字 2；两者缩小后顺着牌心的倾斜摆：加号偏左下、数字偏右上（转 30° 的牌心右下、左上最窄），离牌心边缘都留出空隙
export default ({ radius }) => [
  ...card(radius),
  { d: 'M9.75 11.5V13.5', thin: true },
  { d: 'M8.75 12.5H10.75', thin: true },
  { d: glyph('2', 12.25, 9.4, 0.7, 0.7, LABEL), thin: true },
]
