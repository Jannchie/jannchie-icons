import { cutLine, frame, lowRange, polyline, questionMark } from '../ai'
import { knock, solid } from '../solid'

// Hugging Face 任务：视觉问答。一张图片（相框 + 压在右下的矮山），天空里一个大问号：对着这张图提问
// *-question-answering 一族都是「被问的东西 + 一个大问号」
// 问号在天空的左半（x 10.25）：钩的半径 2（墨迹上缘 5.75，离相框上内缘 1.25），点直径 2、圆心 14.5，离下面的山坡 1 以上
const mark = questionMark(10.25, 8.5, 2, 14.5)

export default ({ radius, stroke }) => [frame(stroke, radius), polyline(lowRange(stroke), radius), ...mark]

// 实心：相框一块，山脊线挖空并穿出框外，问号挖空
export const fill = ({ radius, stroke }) => [solid(frame(stroke, radius)), knock([cutLine(lowRange(stroke), stroke), ...mark])]
