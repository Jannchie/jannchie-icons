import { rounded } from '../geometry'
import { dot } from '../scene'
import { hole, knock, solid } from '../solid'

// 计算器：竖长机身（4.5–19.5 × 2.5–21.5）+ 顶部显示屏（7.5–16.5 × 5.5–9.5）+ 下面 3 × 2 个按键点
export default ({ radius }) => [
  rounded([[4.5, 2.5], [19.5, 2.5], [19.5, 21.5], [4.5, 21.5]], Math.min(radius, 2.5)),
  rounded([[7.5, 5.5], [16.5, 5.5], [16.5, 9.5], [7.5, 9.5]], Math.min(radius, 1)),
  ...[8, 12, 16].flatMap(x => [13.5, 17.5].map(y => dot(x, y))),
]

// 实心：机身一块，显示屏挖成洞（洞外扩半个线宽后正好是描边版屏幕框的中心线），按键点挖空
export const fill = ({ radius, stroke }) => {
  const h = stroke / 2
  return [
    solid(rounded([[4.5, 2.5], [19.5, 2.5], [19.5, 21.5], [4.5, 21.5]], Math.min(radius, 2.5))),
    hole(rounded([[7.5 + h, 5.5 + h], [16.5 - h, 5.5 + h], [16.5 - h, 9.5 - h], [7.5 + h, 9.5 - h]], Math.max(0, Math.min(radius, 1) - h))),
    knock([8, 12, 16].flatMap(x => [13.5, 17.5].map(y => dot(x, y)))),
  ]
}
