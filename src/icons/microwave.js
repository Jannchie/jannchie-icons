import { rounded } from '../geometry'
import { dot } from '../scene'
import { hole, knock, solid } from '../solid'

// 微波炉：横向的箱体（2.5–21.5 × 5.5–18.5）+ 左边的玻璃窗（5.5–12.5 × 8.5–15.5）+ 右侧控制面板的分隔竖线（15.5，
// 两端垂直接在上下边上）+ 面板正中两个小旋钮（x 18.5，离分隔线和外框各 3；粗字重下也留够空隙，不触发自动调细）
export default ({ radius }) => [
  rounded([[2.5, 5.5], [21.5, 5.5], [21.5, 18.5], [2.5, 18.5]], Math.min(radius, 2)),
  rounded([[5.5, 8.5], [12.5, 8.5], [12.5, 15.5], [5.5, 15.5]], Math.min(radius, 1)),
  'M15.5 5.5V18.5',
  dot(18.5, 9.5, 1.5), dot(18.5, 12.5, 1.5),
]

// 实心：箱体一块，玻璃窗挖成洞（洞外扩半个线宽后正好是描边版窗框的中心线）；分隔竖线挖空，两端各缩一个线宽，面板不和箱体断开；旋钮挖空
export const fill = ({ radius, stroke }) => {
  const h = stroke / 2
  return [
    solid(rounded([[2.5, 5.5], [21.5, 5.5], [21.5, 18.5], [2.5, 18.5]], Math.min(radius, 2))),
    hole(rounded([[5.5 + h, 8.5 + h], [12.5 - h, 8.5 + h], [12.5 - h, 15.5 - h], [5.5 + h, 15.5 - h]], Math.max(0, Math.min(radius, 1) - h))),
    knock([`M15.5 ${5.5 + stroke}V${18.5 - stroke}`, dot(18.5, 9.5, 1.5), dot(18.5, 12.5, 1.5)]),
  ]
}
