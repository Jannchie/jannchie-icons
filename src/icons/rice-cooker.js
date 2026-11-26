import { rounded } from '../geometry'
import { eye } from '../scene'
import { knock, solid } from '../solid'

// 电饭煲（正面）：圆柱形的机身（4.5–19.5 × 11.5–20.5，底下两角圆）+ 和机身一样宽的穹顶锅盖（顶到 6.5，合缝在 11.5）
// + 正面一块带指示灯的控制面板（9.5–14.5 × 13.5–17.5）+ 盖顶冒出来的两缕蒸汽（画法同 ramen）
// 蒸汽 + 控制面板是电饭煲的记号：只有机身和盖子时像一口锅、一只头盔
const body = radius => rounded([[4.5, 11.5, 0], [19.5, 11.5, 0], [19.5, 20.5], [4.5, 20.5]], Math.min(radius * 1.5, 3.5))
const lid = 'M4.5 11.5V10.5C4.5 7.75 7.5 6.5 12 6.5C16.5 6.5 19.5 7.75 19.5 10.5V11.5'
const panel = radius => rounded([[9.5, 13.5], [14.5, 13.5], [14.5, 17.5], [9.5, 17.5]], Math.min(radius, 1))
const light = eye(12, 15.5, 1.5)
const steam = ['M10 4.5C9.4 3.9 10.6 3.35 10 2.75', 'M14 4.5C13.4 3.9 14.6 3.35 14 2.75']

export default ({ radius }) => [body(radius), lid, panel(radius), light, ...steam]

// 实心：锅盖、机身各一块，合缝整条挖穿；面板的框和指示灯挖空；蒸汽照旧是线
export const fill = ({ radius }) => [
  solid([body(radius), `${lid}Z`]),
  knock(['M2 11.5H22', panel(radius), light]),
  ...steam,
]
