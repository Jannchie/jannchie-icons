import { tag, tagPunch } from '../ai'
import { rounded } from '../geometry'
import { hole, knock, solid } from '../solid'

// Hugging Face 任务：视频分类。分类族的标签，标签面上一个播放三角（视频）
// 三角：竖边在 12.5，尖在 18.5，高 7.5，上下以 12 为中
const play = radius => rounded([[12.5, 8.25], [18.5, 12], [12.5, 15.75]], Math.min(radius, 1))

export default ({ radius, stroke }) => [tag(stroke, radius), tagPunch, play(radius)]

// 实心：标签一块，穿孔和三角挖空
export const fill = ({ radius, stroke }) => [solid(tag(stroke, radius)), knock(tagPunch), hole(play(radius))]
