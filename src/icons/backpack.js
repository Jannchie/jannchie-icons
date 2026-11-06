import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 书包：圆角包身（5.5–18.5 × 6.5–21.5）+ 顶上提手（半径 2.5 的拱，两脚竖直接在包身顶边上）
// + 前袋（8.5–15.5，从 14.5 落到包底，两边竖直接在底边上）+ 前袋盖线
export default ({ radius }) => [
  rounded([[5.5, 6.5], [18.5, 6.5], [18.5, 21.5], [5.5, 21.5]], Math.min(radius, 3)),
  'M9.5 6.5V5A2.5 2.5 0 0 1 14.5 5V6.5',
  rounded([[8.5, 21.5], [8.5, 14.5], [15.5, 14.5], [15.5, 21.5]], Math.min(radius, 1), false),
  'M8.5 17.5H15.5',
]

// 实心：包身一块，前袋轮廓挖空（两条竖边在底边前缩一个线宽，包底不被切开）；袋盖线不挖，免得前袋碎成「A」字；提手照旧是线
export const fill = ({ radius, stroke }) => [
  solid(rounded([[5.5, 6.5], [18.5, 6.5], [18.5, 21.5], [5.5, 21.5]], Math.min(radius, 3))),
  knock(rounded([[8.5, 21.5 - stroke], [8.5, 14.5], [15.5, 14.5], [15.5, 21.5 - stroke]], Math.min(radius, 1), false)),
  'M9.5 6.5V5A2.5 2.5 0 0 1 14.5 5V6.5',
]
