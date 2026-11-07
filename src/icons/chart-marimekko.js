import { rounded } from '../geometry'
import { spans, tile } from '../solid'

// 马赛克图（Marimekko）：方框里三列宽度不等，每列再按不同比例横向切分；
// 相邻两列的切分线上下错开至少 3，免得两个丁字接头挤在竖线同一处
export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 2)),
  'M10.5 3.5V20.5',
  'M15.5 3.5V20.5',
  'M3.5 8.5H10.5',
  'M10.5 11.5H15.5',
  'M15.5 7.5H20.5',
  'M15.5 15.5H20.5',
]

// 实心：每个矩形各一块（见 solid.js 的 tile），块和块之间留 GAP 的缝，每块四个角都收圆；外缘和描边版的墨迹一致
export const fill = ({ radius, stroke }) => {
  const k = Math.min(radius, 1)
  const cols = spans(3.5, 20.5, [10.5, 15.5], stroke)
  const rows = [[8.5], [11.5], [7.5, 15.5]].map(cuts => spans(3.5, 20.5, cuts, stroke))
  return cols.flatMap(([x0, x1], i) => rows[i].map(([y0, y1]) => tile([x0, y0, x1, y1], k)))
}
