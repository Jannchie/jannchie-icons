import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// Python：两条互扣的蛇，一笔画完，绕中心 (12, 12.5) 中心对称
// 上面的蛇：蛇头是 8.5–15.5 × 4.5–12.5 的方块，左下伸出身子 3.5–8.5 × 8.5–16.5；
// 蛇头底边 y 12.5 往左走到 x 8.5 就折下去，变成下面那条蛇的蛇头（8.5–15.5 × 12.5–20.5），右上同样伸出身子
// 两头的线头分别落在对方蛇头的竖边上（(8.5, 16.5)、(15.5, 8.5)），丁字相接
// 眼睛在蛇头里靠外的角上，离两条边各 2.5
const eyes = [dot(11, 7), dot(13, 18)]
export default ({ radius }) => [
  rounded([
    [8.5, 16.5], [3.5, 16.5], [3.5, 8.5], [8.5, 8.5], [8.5, 4.5], [15.5, 4.5], [15.5, 12.5],
    [8.5, 12.5], [8.5, 20.5], [15.5, 20.5], [15.5, 16.5], [20.5, 16.5], [20.5, 8.5], [15.5, 8.5],
  ], Math.min(radius, 2), false),
  ...eyes,
]

// 实心：两条蛇各一块，中心对称，之间留 GAP 的缝。缝沿着两个蛇头之间的横边走，两端拐进对方蛇头的竖边外侧：
// 蛇头保持描边版的整块方形，伸出的身子在对方蛇头旁边收窄让出缝（身子本来就该比头细），缝从两头穿出外轮廓；
// 挨着缝的拐角不随全局圆角（只剩外扩半个线宽的圆），缝宽处处一致；眼睛挖成圆点（尖角模式下也是圆的）
export const fill = ({ radius, stroke }) => {
  const r = Math.min(radius, 2)
  const y = 12.5 - GAP / 2 - stroke / 2 // 上蛇头底边（中心线）
  const x = 8.5 - stroke - GAP // 上蛇身子右边（中心线）：墨迹离下蛇头左边的墨迹 GAP
  const upper = [[3.5, 16.5], [3.5, 8.5], [8.5, 8.5], [8.5, 4.5], [15.5, 4.5], [15.5, y, 0], [x, y, 0], [x, 16.5, 0]]
  const lower = upper.map(([px, py, pr]) => [24 - px, 25 - py, pr])
  return [
    solid([rounded(upper, r), rounded(lower, r)]),
    knock(eyes.map(e => ({ ...e, round: true }))),
  ]
}
