import { bubble, bubbleSolid } from '../ai'
import { knock } from '../solid'

// Hugging Face 任务：音频 + 文本到文本（语音理解）。*-text-to-text 一族的对话气泡，里面四根波形竖条（声音）
// 库里的 chat-music 里面是音符
// 竖条的中心线在 7.5 / 10.5 / 13.5 / 16.5：间距 3（16px 下 2 像素），左右以 12 对称，细字重下落在 .5 上。
// 四根等距的竖条不可能既对称又和气泡两边（3 / 21）同一个 1.5 相位，这里保对称和等距：16px 下竖条清晰，气泡左右两边里有一边略灰
// 上下以气泡主体的中线 10.5 为中，半高 1.5 / 3.75 / 2.25 / 3，最高一根的墨迹离气泡上下内缘 1.5
const bars = [[7.5, 1.5], [10.5, 3.75], [13.5, 2.25], [16.5, 3]].map(([x, a]) => `M${x} ${10.5 - a}V${10.5 + a}`)

export default ({ radius, stroke }) => [bubble(stroke, radius), ...bars]

// 实心：气泡填实，竖条挖空
export const fill = ({ radius, stroke }) => [bubbleSolid(stroke, radius), knock(bars)]
