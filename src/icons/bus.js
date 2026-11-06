import { GAP } from '../clearance'
import { circle, rounded } from '../geometry'
import { clear, hole, solid } from '../solid'

// 公交车（侧视、车头朝右）：方正的长车厢 2.5–21.5 × 4.5–16.5；一道腰线（10.5）把上面隔成一排车窗，
// 三根窗柱（7.5、12.5、17.5）上下都垂直接在车顶和腰线上；两个车轮挂在底边下、和底边相切
export default ({ radius }) => [
  rounded([[2.5, 4.5], [21.5, 4.5], [21.5, 16.5], [2.5, 16.5]], Math.min(radius, 2)),
  'M2.5 10.5H21.5',
  'M7.5 4.5V10.5M12.5 4.5V10.5M17.5 4.5V10.5',
  circle(6.5, 18.75, 2.25),
  circle(17.5, 18.75, 2.25),
]

// 实心：车厢一块，四扇车窗挖空（窗洞和描边版窗框的内缘一样大，窗柱、车顶留一个线宽）；车轮四周让出缝，车轮是实心圆
export const fill = ({ radius, stroke }) => {
  const r = Math.max(0, Math.min(radius, 2) - stroke) / 2
  const xs = [2.5, 7.5, 12.5, 17.5, 21.5]
  const wheels = [circle(6.5, 18.75, 2.25), circle(17.5, 18.75, 2.25)]
  return [
    solid(rounded([[2.5, 4.5], [21.5, 4.5], [21.5, 16.5], [2.5, 16.5]], Math.min(radius, 2))),
    ...xs.slice(1).map((x, i) => {
      // 最右一扇只有 4 宽，粗字重下内缩一个线宽会缩没，留 0.1 的余量
      const k = Math.min(stroke, (x - xs[i]) / 2 - 0.1)
      return hole(rounded([[xs[i] + k, 4.5 + k], [x - k, 4.5 + k], [x - k, 10.5 - k], [xs[i] + k, 10.5 - k]], r))
    }),
    clear(wheels, GAP),
    solid(wheels),
  ]
}
