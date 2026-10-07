import { circle, crisp, rounded } from '../geometry'

// 画幅比例：外框 + 左上、右下两个角标
export default ({ radius, stroke }) => [
  rounded([[2.5, 5.5], [21.5, 5.5], [21.5, 18.5], [2.5, 18.5]], Math.min(radius, 2.5)),
  rounded([[6.5, 11], [6.5, 8.5], [9, 8.5]], Math.min(radius, 1), false),
  rounded([[17.5, 13], [17.5, 15.5], [15, 15.5]], Math.min(radius, 1), false),
]
