import { questionMark } from '../ai'
import { crisp, rounded } from '../geometry'
import { knock, solid } from '../solid'

// Hugging Face 任务：文档问答。一页文档（右上切角的纸）上一个大问号：对着这份文档提问
// *-question-answering 一族都是「被问的东西 + 一个大问号」（问号见 ai.js）：表格问答是表格，视觉问答是相框
// 纸张外缘 4.5–19.5 × 3–21：宽 15、高 18 都是 1.5 的整数倍，16px 下四条边同时落在像素边界上。
// 左右没有取整数：6–18 的纸只有 12 宽，内部 9，放不下四周留 1.5 的大问号；3–21 又成了正方形、不像一页纸。
// 所以保持 4.5 / 19.5，细字重下 grid 审计会提示 x 5 / x 19（已和用户确认接受）
// 折角只留一道 45° 切角（外缘切 4.5），不画翻折线，把地方让给问号
const page = (stroke, radius) => {
  const h = stroke / 2
  const [l, t, r, b] = [4.5 + h, 3 + h, 19.5 - h, 21 - h]
  // 切角的斜边往里收 h：两个端点各沿直边退 h·tan 22.5°
  const k = h * Math.tan(Math.PI / 8)
  return rounded([[l, t], [15 - k, t, crisp(radius)], [r, 7.5 + k, crisp(radius)], [r, b], [l, b]], radius)
}
// 钩的半径 2.75（墨迹上缘 5.75，离纸的上内缘 1.25），竖笔停在 13.5；点直径 2.25，圆心 17.25，和竖笔之间空 1.9
const mark = questionMark(12, 9.25, 2.75, 17.25, 2.25)

export default ({ radius, stroke }) => [page(stroke, radius), ...mark]

// 实心：纸张一块，问号挖空
export const fill = ({ radius, stroke }) => [solid(page(stroke, radius)), knock(mark)]
