import { cutLine, frame, polyline } from '../ai'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// Hugging Face 任务：图片到文本（图片描述、OCR）。一张图片，下面两行说明文字：配了图注的图
// 相框外缘 3–21 × 3–15，两行字的墨迹 16.5–18 / 19.5–21（按下缘 18 / 21 定，线宽变粗时往上长）：
// 相框和第一行、两行之间都空 1.5（16px 下 1 像素），所有横边都在 1.5 网格上
const BOX = [3, 3, 21, 15]
// 山脊：45°，山顶 (7.5, 7.75)，两端落在相框左边、底边的中心线上；太阳直径 2
const ridge = (stroke) => {
  const [l, b] = [3 + stroke / 2, 15 - stroke / 2]
  return [[l, 7.75 + 7.5 - l], [7.5, 7.75], [7.5 + b - 7.75, b]]
}
const sun = dot(16.5, 7.75)
// 第二行短一截，读成文字
const caption = h => [`M${3 + h} ${18 - h}H${21 - h}`, `M${3 + h} ${21 - h}H${15 - h}`]

export default ({ radius, stroke }) => [frame(stroke, radius, BOX), polyline(ridge(stroke), radius), sun, ...caption(stroke / 2)]

// 实心：相框一块，山脊线挖空并穿出框外，太阳挖空；两行字照旧是线
export const fill = ({ radius, stroke }) => [
  solid(frame(stroke, radius, BOX)),
  knock([cutLine(ridge(stroke), stroke), sun]),
  ...caption(stroke / 2),
]
