import { tag, tagPunch } from '../ai'
import { knock, solid } from '../solid'

// Hugging Face 任务：音频分类。分类族的标签，标签面上三根波形竖条（声音）
// 竖条按墨迹的左缘定（11 / 14 / 17，都是整数：细字重下中心线落在 .5 上；线宽变粗时往右长），间距 3（16px 下 2 像素，三根同相位）；
// 常规线宽下竖条之间空 1.5，最右一根离标签内缘 2（粗字重下还剩 1）。上下墨迹 7.5–16.5 / 6–18 / 9–15
const bars = h => [[11, 7.5, 16.5], [14, 6, 18], [17, 9, 15]].map(([x, t, b]) => `M${x + h} ${t + h}V${b - h}`)

export default ({ radius, stroke }) => [tag(stroke, radius), tagPunch, ...bars(stroke / 2)]

// 实心：标签一块，穿孔和竖条挖空
export const fill = ({ radius, stroke }) => [solid(tag(stroke, radius)), knock([tagPunch, ...bars(stroke / 2)])]
