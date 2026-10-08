// 对齐对象（幻灯片编辑器工具栏）：一条基准线 + 两个长短不同的圆角条
// 先按「横向条、竖直基准线」给出点列（贴左、居中、贴右），上 / 中 / 下把点列的横竖坐标互换后再画
import { rounded } from './geometry'

// 竖直基准线 x = 3.5（左）、12（中）、20.5（右）；两条：长条 14 宽、短条 8 宽，高 5，上下排在 5.5–10.5 / 13.5–18.5
const ROWS = [[5.5, 10.5, 14], [13.5, 18.5, 8]]
const bars = side => ROWS.map(([y0, y1, w]) => {
  const [x0, x1] = side === 'start' ? [6.5, 6.5 + w] : side === 'end' ? [17.5 - w, 17.5] : [12 - w / 2, 12 + w / 2]
  return [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]
})
// 基准线（两点一段）；居中时只画在条外面的几段
const axis = side => side === 'start'
  ? [[[3.5, 3.5], [3.5, 20.5]]]
  : side === 'end'
    ? [[[20.5, 3.5], [20.5, 20.5]]]
    : [[[12, 2.5], [12, 5.5]], [[12, 10.5], [12, 13.5]], [[12, 18.5], [12, 21.5]]]

// side：'start' | 'center' | 'end'；vertical：true 时横竖互换（基准线变横线：上 / 中 / 下）
export function alignObjects(side, vertical, radius) {
  const t = pts => (vertical ? pts.map(([x, y]) => [y, x]) : pts)
  return [
    ...axis(side).map(seg => rounded(t(seg), 0, false)),
    ...bars(side).map(pts => rounded(t(pts), Math.min(radius, 1.5))),
  ]
}
