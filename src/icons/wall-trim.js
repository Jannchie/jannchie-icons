import { rounded } from '../geometry'
import { spans, tile } from '../solid'

// 墙面边饰（立面）：一面墙（3.5–20.5 × 3.5–20.5，顶边是天花、底边是地面）；
// 下面一条踢脚线（16.5，高 4）、上面一条顶角线（6.5，离天花 3），两条线的两端都接在墙的左右两边上
export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 1)),
  'M3.5 16.5H20.5',
  'M3.5 6.5H20.5',
]

// 实心：顶角线、墙面、踢脚线各画一块（见 solid.js 的 tile），块和块之间留 GAP 的缝；外缘和描边版的墨迹一致。
// 两条边饰只有 3–4 高，圆角最多 0.5；中间的墙面按描边版的 1
export const fill = ({ radius, stroke }) => {
  const [x0, x1] = [3.5 - stroke / 2, 20.5 + stroke / 2]
  const [crown, wall, base] = spans(3.5, 20.5, [6.5, 16.5], stroke)
  return [
    tile([x0, crown[0], x1, crown[1]], Math.min(radius, 0.5)),
    tile([x0, wall[0], x1, wall[1]], Math.min(radius, 1)),
    tile([x0, base[0], x1, base[1]], Math.min(radius, 0.5)),
  ]
}
