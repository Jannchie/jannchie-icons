import { crisp, rounded } from '../geometry'
import { knock, spans, tile } from '../solid'

// 收起右侧栏：sidebar-right 的窗口 + 右侧竖线，主区里的小折角朝右（往侧栏方向收）；panel-left-close 的镜像
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], radius),
  'M14.5 4.5V19.5',
  rounded([[7.5, 9], [10.5, 12], [7.5, 15]], crisp(radius), false),
]

// 实心：主区和侧栏各画一块独立的圆角块（见 solid.js 的 tile），中间留 GAP 的缝，主区挖掉小折角；
// 主区圆角和外框一样，侧栏只有 6 宽，圆角最多 0.5
export const fill = ({ radius, stroke }) => {
  const [[y0, y1]] = spans(4.5, 19.5, [], stroke)
  const [[x0, x1], [x2, x3]] = spans(3.5, 20.5, [14.5], stroke)
  return [
    tile([x0, y0, x1, y1], radius),
    tile([x2, y0, x3, y1], Math.min(radius, 0.5)),
    knock(rounded([[7.5, 9], [10.5, 12], [7.5, 15]], crisp(radius), false)),
  ]
}
