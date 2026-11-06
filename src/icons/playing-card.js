import { rounded } from '../geometry'
import { hole, solid } from '../solid'
import { SPADE } from '../suits'
import { scale, translate } from '../transform'

// 扑克牌：竖长的圆角牌面 + 中间缩小的黑桃
export default ({ radius }) => [
  rounded([[5.5, 2.5], [18.5, 2.5], [18.5, 21.5], [5.5, 21.5]], Math.min(radius, 2)),
  // 缩小后黑桃底边在 15.825，上移 0.325 落到 15.5
  translate(scale(SPADE, 0.45), 0, -0.325),
]

// 实心：牌面填实，黑桃挖成白色的洞
export const fill = ({ radius }) => [
  solid(rounded([[5.5, 2.5], [18.5, 2.5], [18.5, 21.5], [5.5, 21.5]], Math.min(radius, 2))),
  hole(translate(scale(SPADE, 0.45), 0, -0.325)),
]
