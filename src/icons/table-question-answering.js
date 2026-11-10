import { frame, questionMark } from '../ai'
import { through } from '../geometry'
import { knock, solid } from '../solid'

// Hugging Face 任务：表格问答。一张表格（外框 + 表头线 + 左列线），右下的大格子里一个大问号：对着这张表提问
// *-question-answering 一族都是「被问的东西 + 一个大问号」
// 外框 3–21；表头线、左列线的墨迹都是 6–7.5（按靠外的一缘 6 定，线宽变粗时往里长）：表头、左列净宽 1.5（16px 下 1 像素），
// 剩下的大格子 7.5–19.5 见方，放得下问号
// 问号：钩的圆心 (13.5, 11.75)、半径 1.5（墨迹上缘 9.5，离表头线 2），点直径 2、圆心 17；粗字重下点和竖笔、外框之间都还剩 0.5 以上
const rules = (stroke) => {
  const h = stroke / 2
  const [a, b, c] = [3 + h, 21 - h, 6 + h]
  return [[[a, c], [b, c]], [[c, a], [c, b]]]
}
const mark = questionMark(13.5, 11.75, 1.5, 17)

export default ({ radius, stroke }) => [frame(stroke, radius), ...rules(stroke).map(([p, q]) => `M${p[0]} ${p[1]}L${q[0]} ${q[1]}`), ...mark]

// 实心：外框一块，表头线、左列线挖成缝并穿出外框（四个格子各自独立），问号挖空
export const fill = ({ radius, stroke }) => [
  solid(frame(stroke, radius)),
  knock([...rules(stroke).map(([p, q]) => through(p, q, 2 * stroke)), ...mark]),
]
