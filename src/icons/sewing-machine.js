import { circle, rounded } from '../geometry'
import { eye } from '../scene'
import { solid, stacked } from '../solid'

// 缝纫机（侧视，机头朝左）：底板（墨迹 2–22 宽，线宽变粗往里长；上下 17.5–20.5）+ 立在底板右边的机身——一条「厂」字形的闭合轮廓：
// 右边的立柱（15.5–20.5）、顶上往左伸的横臂（5.5–10.5 高）、横臂左端垂下来的机头（5.5–9.5，到 12.5）
// + 机头底下的针（7.5，到 15，悬在底板上面 2.5）+ 立柱上的手轮（小圆）+ 横臂顶上的线轴（小方块，10.5–13.5 × 2.5–5.5）
// 靠「悬臂的机头 + 针 + 线轴」认出来
const body = radius => rounded([[5.5, 5.5], [20.5, 5.5], [20.5, 17.5, 0], [15.5, 17.5, 0], [15.5, 10.5], [9.5, 10.5], [9.5, 12.5], [5.5, 12.5]], Math.min(radius, 1.5))
const base = (radius, stroke) => rounded([[2 + stroke / 2, 17.5], [22 - stroke / 2, 17.5], [22 - stroke / 2, 20.5], [2 + stroke / 2, 20.5]], Math.min(radius, 1))
const needle = 'M7.5 12.5V15'
const spool = radius => rounded([[10.5, 5.5], [10.5, 2.5], [13.5, 2.5], [13.5, 5.5]], Math.min(radius, 0.5), false)

export default ({ radius, stroke }) => [body(radius), base(radius, stroke), needle, circle(18, 9, 1.25), spool(radius)]

// 实心：机身一块，底板一块叠在前面（机身在底板上面让出缝）；手轮挖成一个圆点，线轴是一小块；针照旧是线
export const fill = ({ radius, stroke }) => [
  ...stacked(body(radius), base(radius, stroke)),
  { ...eye(18, 9, 2), knock: true },
  solid(`${spool(radius)}Z`),
  needle,
]
