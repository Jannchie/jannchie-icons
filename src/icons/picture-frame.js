import { circle, rounded } from '../geometry'
import { hole, solid } from '../solid'

// 画框：外框（3.5–20.5）+ 内框（6.5–17.5，离外框 3）；内框里一幅风景画——
// 山脊线两端接在内框左右两边上（主峰 (10, 12)、次峰 (14.5, 13.5)），右上角一个小太阳
export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 1.5)),
  rounded([[6.5, 6.5], [17.5, 6.5], [17.5, 17.5], [6.5, 17.5]], Math.min(radius, 0.5)),
  rounded([[6.5, 15.5], [10, 12], [13, 15], [14.5, 13.5], [17.5, 16.5]], Math.min(radius, 0.5), false),
  circle(14.25, 9.75, 1),
]

// 实心：外框一块，内框挖成洞（洞外扩半个线宽后正好是描边版内框的中心线）；洞里的山填实（山脊往下封到内框底边，和画框连上），太阳是实心圆
export const fill = ({ radius, stroke }) => {
  const h = stroke / 2
  return [
    solid(rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 1.5))),
    hole(rounded([[6.5 + h, 6.5 + h], [17.5 - h, 6.5 + h], [17.5 - h, 17.5 - h], [6.5 + h, 17.5 - h]], Math.max(0, Math.min(radius, 0.5) - h))),
    solid(rounded([[6.5, 15.5], [10, 12], [13, 15], [14.5, 13.5], [17.5, 16.5], [17.5, 17.5, 0], [6.5, 17.5, 0]], Math.min(radius, 0.5))),
    solid(circle(14.25, 9.75, 1)),
  ]
}
