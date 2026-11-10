import { tag, tagPoints, tagPunch } from '../ai'
import { through } from '../geometry'
import { knock, solid } from '../solid'

// Hugging Face 任务：表格分类。分类族的标签，整个标签面被表格线划开：两条横线、一条竖线
// 线都从标签的边画到边（横线左端落在尖头的斜边上），实心版里才能整条穿出去、不留死胡同
// 横线按墨迹外缘定：上一条的上缘 9、下一条的下缘 15（中间一栏净高 3，穿孔在这一栏里）；竖线的左缘 15（整数，细字重下中心线落在 .5 上）
const grid = (stroke) => {
  const h = stroke / 2
  const [tip, top, , , bottom] = tagPoints(stroke)
  const [r, t, b] = [22 - h, 3 + h, 21 - h]
  // 斜边上 y 处的 x（上下两条斜边对称）
  const xAt = (y, shoulder) => +(tip[0] + (y - tip[1]) / (shoulder[1] - tip[1]) * (shoulder[0] - tip[0])).toFixed(3)
  return [
    [[xAt(9 + h, top), 9 + h], [r, 9 + h]],
    [[xAt(15 - h, bottom), 15 - h], [r, 15 - h]],
    [[15 + h, t], [15 + h, b]],
  ]
}
const line = ([a, b]) => `M${a[0]} ${a[1]}L${b[0]} ${b[1]}`

export default ({ radius, stroke }) => [tag(stroke, radius), tagPunch, ...grid(stroke).map(line)]

// 实心：标签一块，穿孔挖空；三条表格线挖成缝，两端各穿出标签两个线宽，六个格子各自独立
export const fill = ({ radius, stroke }) => [
  solid(tag(stroke, radius)),
  knock([tagPunch, ...grid(stroke).map(([a, b]) => through(a, b, 2 * stroke))]),
]
