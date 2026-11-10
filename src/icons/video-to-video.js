import { frame } from '../ai'
import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { clear, hole, solid } from '../solid'

// Hugging Face 任务：视频到视频（视频编辑、风格迁移）。一块屏幕 + 播放三角，被一道上下出头的竖分隔线分成「之前 | 之后」
// 和 image-to-image 同一个「同模态变换」母题。分隔线不在正中：三角整个放在左边一格里，分隔线靠右（像拖到三分之二处的对比滑块），
// 不从三角上穿过去
// 屏幕外缘 3–21 × 6–18，分隔线墨迹 15–16.5 × 3–21（按左缘 15 定，线宽变粗时往右长）：横竖边都在 1.5 网格上
// 三角：竖边在 7.5（细字重下落在 .5 上），尖在 12，高 5（屏幕内部只有 9 高，粗字重下 8），离屏幕上下内缘和分隔线都在 1.25 以上
const BOX = [3, 6, 21, 18]
const divider = stroke => `M${15 + stroke / 2} ${3 + stroke / 2}V${21 - stroke / 2}`
const play = radius => rounded([[7.5, 9.5], [12, 12], [7.5, 14.5]], Math.min(radius, 1))

export default ({ radius, stroke }) => [frame(stroke, radius, BOX), play(radius), divider(stroke)]

// 实心：屏幕一块，三角挖空；分隔线两侧各让出 GAP 的缝（屏幕分成左右两块），再把分隔线画回去
export const fill = ({ radius, stroke }) => [
  solid(frame(stroke, radius, BOX)),
  hole(play(radius)),
  clear(divider(stroke), GAP),
  divider(stroke),
]
