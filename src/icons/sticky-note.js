import { crisp, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 便利贴：方形纸片（3.5–20.5），右下角折起 6；折角的两处转角固定小圆角，折痕是一个 L（同 file 的折角画法，换到右下）
// 和 file（竖长、右上折角）区分开
const [l, t, r, b] = [3.5, 3.5, 20.5, 20.5]
const fold = 6

export default ({ radius }) => [
  rounded([[l, t], [r, t], [r, b - fold, crisp(radius)], [r - fold, b, crisp(radius)], [l, b]], radius),
  rounded([[r, b - fold], [r - fold, b - fold], [r - fold, b]], crisp(radius), false),
]

// 实心：纸片一块，挖掉翻折线，折角成了单独的一小块三角（同 file 的折角）
export const fill = ({ radius }) => [
  solid(rounded([[l, t], [r, t], [r, b - fold, crisp(radius)], [r - fold, b, crisp(radius)], [l, b]], radius)),
  knock(rounded([[r, b - fold], [r - fold, b - fold], [r - fold, b]], crisp(radius), false)),
]
