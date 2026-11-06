import { GAP } from '../clearance'
import { circle, crisp, rounded } from '../geometry'
import { clear, solid } from '../solid'

// 窗口还原：两个交叠的方框（后面的只画露出部分）
export default ({ radius, stroke }) => [
  rounded([[4.5, 8.5], [15.5, 8.5], [15.5, 19.5], [4.5, 19.5]], Math.min(radius, 2)),
  rounded([[8.5, 6], [8.5, 4.5], [19.5, 4.5], [19.5, 15.5], [18, 15.5]], Math.min(radius, 2), false),
]

// 实心：两个方框都填实，后面的在前面的四周让出缝
export const fill = ({ radius }) => {
  const front = rounded([[4.5, 8.5], [15.5, 8.5], [15.5, 19.5], [4.5, 19.5]], Math.min(radius, 2))
  return [
    solid(rounded([[8.5, 4.5], [19.5, 4.5], [19.5, 15.5], [8.5, 15.5]], Math.min(radius, 2))),
    clear(front, GAP),
    solid(front),
  ]
}
