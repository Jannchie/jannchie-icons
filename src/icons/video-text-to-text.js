import { bubble, bubbleSolid } from '../ai'
import { rounded } from '../geometry'
import { hole } from '../solid'

// Hugging Face 任务：视频 + 文本到文本（视频理解）。*-text-to-text 一族的对话气泡，里面一个播放三角（视频）
// 库里的 chat-video 里面是摄像机
// 三角：竖边在 9.5（细字重下落在 .5 上），尖在 15.75，高 7.5，上下以气泡主体的中线 10.5 为中
const play = radius => rounded([[9.5, 6.75], [15.75, 10.5], [9.5, 14.25]], Math.min(radius, 1))

export default ({ radius, stroke }) => [bubble(stroke, radius), play(radius)]

// 实心：气泡填实，三角挖空
export const fill = ({ radius, stroke }) => [bubbleSolid(stroke, radius), hole(play(radius))]
