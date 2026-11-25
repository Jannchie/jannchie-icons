import { rounded } from '../geometry'
import { hole, solid } from '../solid'

// 缆车：一根斜的缆绳（从左上 (3, 6) 到右上 (21, 3)）+ 挂在缆绳正中的吊臂（竖线，12）+ 吊臂下面的车厢（5.5–18.5 × 8.5–19.5）；
// 车厢上半一排三扇车窗：一道腰线（13.5）+ 两根窗柱（9.5 / 14.5）
const cable = 'M3 6L21 3'
const arm = 'M12 4.5V8.5'
const cabin = radius => rounded([[5.5, 8.5], [18.5, 8.5], [18.5, 19.5], [5.5, 19.5]], Math.min(radius, 2.5))
const belt = 'M5.5 13.5H18.5'
const posts = 'M9.5 8.5V13.5M14.5 8.5V13.5'

export default ({ radius }) => [cable, arm, cabin(radius), belt, posts]

// 实心：车厢一块，三扇车窗挖成洞（和描边版窗框的内缘一样大）；缆绳、吊臂照旧是线
export const fill = ({ radius, stroke }) => {
  const r = Math.max(0, Math.min(radius, 2.5) - stroke) / 2
  const xs = [5.5, 9.5, 14.5, 18.5]
  return [
    cable,
    arm,
    solid(cabin(radius)),
    ...xs.slice(1).map((x, i) => {
      // 两边的车窗只有 4 宽，粗字重下内缩一个线宽会缩没，留 0.1 的余量（同 bus）
      const k = Math.min(stroke, (x - xs[i]) / 2 - 0.1)
      return hole(rounded([[xs[i] + k, 8.5 + k], [x - k, 8.5 + k], [x - k, 13.5 - k], [xs[i] + k, 13.5 - k]], r))
    }),
  ]
}
