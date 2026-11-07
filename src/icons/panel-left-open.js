import { crisp, rounded } from '../geometry'
import { knock, spans, tile } from '../solid'

// 展开左侧栏：和 sidebar 同一个窗口 + 左侧竖线（9.5），右边主区（9.5–20.5，中心 15）里一个朝右的小折角（深 3、高 6），指向侧栏要展开的方向
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], radius),
  'M9.5 4.5V19.5',
  rounded([[13.5, 9], [16.5, 12], [13.5, 15]], crisp(radius), false),
]

// 实心：侧栏和主区各画一块独立的圆角块（见 solid.js 的 tile），中间留 GAP 的缝，主区挖掉小折角；
// 主区圆角和外框一样，侧栏只有 6 宽，圆角最多 0.5
export const fill = ({ radius, stroke }) => {
  const [[y0, y1]] = spans(4.5, 19.5, [], stroke)
  const [[x0, x1], [x2, x3]] = spans(3.5, 20.5, [9.5], stroke)
  return [
    tile([x0, y0, x1, y1], Math.min(radius, 0.5)),
    tile([x2, y0, x3, y1], radius),
    knock(rounded([[13.5, 9], [16.5, 12], [13.5, 15]], crisp(radius), false)),
  ]
}
