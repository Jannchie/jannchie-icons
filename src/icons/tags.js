import { dot } from '../scene'
import { shrink, tagDiagonal } from '../tag'

// 多个标签：前面一个完整的斜放标签（和 tag 同样的 45° 外形，缩小）+ 后面一个只露出顶边和右上斜边，
// 画成一条折线，是前面标签中心线的左上角、顶边右端、尾边右角往右上平移 (4, -4)
// 墨迹框：左缘 2（前面标签的左边）、顶缘 2（后面标签的顶边），右缘约 22（后面标签斜边的端点），下缘是前面标签尾边的方角——
// 常规圆角下被削圆后约在 21.4，尖角模式下到 22.3（斜角允许外凸）
// 线宽变粗时外缘不动、往里长：前面标签按外缘收半个线宽（见 tag.js），后面那条折线跟着前面标签的中心线平移
const A = 8.15
const FRONT = [[2, 6], [2 + A, 6], [2 + 2 * A, 6 + A], [2 + A, 6 + 2 * A], [2, 6 + A]]
const round = v => Math.round(v * 1000) / 1000

export default ({ radius, stroke }) => {
  const [p0, p1, p2] = shrink(FRONT, stroke / 2).map(([x, y]) => [round(x + 4), round(y - 4)])
  return [
    tagDiagonal(stroke, Math.min(radius, 1.5), FRONT),
    dot(6.25, 10.25),
    `M${p0[0]} ${p0[1]}H${p1[0]}L${p2[0]} ${p2[1]}`,
  ]
}
