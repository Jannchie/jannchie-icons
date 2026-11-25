import { rounded } from '../geometry'
import { eye } from '../scene'
import { hole, knock, solid } from '../solid'

// 磁带（卡式录音带）：横放的带盒（墨迹 3–21 宽，线宽变粗往里长；上下 5.5–18.5）+ 盒面上的观察窗（6.5–17.5 × 8.5–13.5）和窗里的两个带轴（圆点）
// + 盒底正中一块梯形的磁头口（7.5–16.5 收到 8.5–15.5，从底边往上到 15.5）
const shell = (radius, stroke) => {
  const h = stroke / 2
  return rounded([[3 + h, 5.5], [21 - h, 5.5], [21 - h, 18.5], [3 + h, 18.5]], Math.min(radius, 2))
}
const window = (radius, k = 0) => rounded([[6.5 + k, 8.5 + k], [17.5 - k, 8.5 + k], [17.5 - k, 13.5 - k], [6.5 + k, 13.5 - k]], Math.max(0, Math.min(radius, 1) - k / 2))
const reels = [eye(9.5, 11), eye(14.5, 11)]
const mouth = 'M7.5 18.5L8.5 15.5H15.5L16.5 18.5'

export default ({ radius, stroke }) => [shell(radius, stroke), window(radius), ...reels, mouth]

// 实心：带盒一块，观察窗挖成洞（和描边版窗框的内缘一样大），带轴是洞里的实心点；磁头口的轮廓往下挖穿盒底
export const fill = ({ radius, stroke }) => [
  solid(shell(radius, stroke)),
  hole(window(radius, stroke)),
  knock('M7.17 19.5L8.5 15.5H15.5L16.83 19.5'),
  ...reels,
]
