import { GAP } from '../clearance'
import { rounded } from '../geometry'

// 瀑布图：底线 + 首尾两根落地的柱 + 中间两根悬空、上下错开的柱
export default ({ radius, stroke }) => {
  const h = stroke / 2
  return [
    // 底线墨迹 2–22（中线两端 2 + h、22 - h），和其他图表一样
    // 四根柱宽 3、间距 2（间距 1 时相邻柱在常规字重下就粘在一起），柱边 3–21 左右居中、竖边落在整数上，柱顶在 .5 上
    `M${2 + h} 20.5H${22 - h}`,
    rounded([[3, 20.5], [3, 11.5], [6, 11.5], [6, 20.5]], Math.min(radius, 1), false),
    rounded([[8, 6.5], [11, 6.5], [11, 11.5], [8, 11.5]], Math.min(radius, 1)),
    rounded([[13, 6.5], [16, 6.5], [16, 9.5], [13, 9.5]], Math.min(radius, 1)),
    rounded([[18, 20.5], [18, 9.5], [21, 9.5], [21, 20.5]], Math.min(radius, 1), false),
  ]
}

// 实心：四根柱各画一块（按墨迹范围原样画，见 solid.js 的 tile），柱和柱之间留 GAP 的缝——描边版柱间距只有 2，
// 柱子各自外扩半个线宽就会粘成一片。四根柱等宽，左右墨迹仍是 3 − h 到 21 + h；柱顶、柱底和描边版的墨迹一致，
// 落地的两根下沿压在底线上、和底线连成一体（下面两个角是直角），悬空的两根四角都收圆；底线照旧是线
export const fill = ({ radius, stroke, sharp }) => {
  const h = stroke / 2
  // 墨迹拐角的半径：圆角模式下是描边版的圆角加半个线宽（外扩后的外缘），尖角模式下是直角
  const k = sharp ? 0 : Math.min(radius, 1) + h
  const w = (18 + 2 * h - 3 * GAP) / 4
  const bar = (i, top, bottom) => {
    const [x0, x1] = [3 - h + i * (w + GAP), 3 - h + i * (w + GAP) + w]
    const b = bottom === undefined ? 20.5 : bottom + h
    const c = bottom === undefined ? 0 : k
    return { d: rounded([[x0, top - h], [x1, top - h], [x1, b, c], [x0, b, c]], k), fill: true, exact: true }
  }
  return [
    `M${2 + h} 20.5H${22 - h}`,
    bar(0, 11.5),
    bar(1, 6.5, 11.5),
    bar(2, 6.5, 9.5),
    bar(3, 9.5),
  ]
}
