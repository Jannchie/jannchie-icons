import { cutLine, frame, lowRange, polyline } from '../ai'
import { rounded } from '../geometry'
import { hole, knock, solid } from '../solid'

// Hugging Face 任务：图片到视频（让图片动起来）。一张图片（相框 + 压在右下的矮山），天空里一个播放三角
// *-to-video 一族都有播放三角：山表示输入是图片，text-to-video 没有山；image-text-to-video 再多一颗星
// 相框外缘 3–21。三角：竖边在 9.5（细字重下落在 .5 上），尖在 16，高 7.5（6–13.5），在天空的正中
const play = radius => rounded([[9.5, 6], [16, 9.75], [9.5, 13.5]], Math.min(radius, 1))

export default ({ radius, stroke }) => [frame(stroke, radius), polyline(lowRange(stroke), radius), play(radius)]

// 实心：相框一块，山脊线挖空并两端穿出框外（山体自成一块），三角挖空
export const fill = ({ radius, stroke }) => [solid(frame(stroke, radius)), knock(cutLine(lowRange(stroke), stroke)), hole(play(radius))]
