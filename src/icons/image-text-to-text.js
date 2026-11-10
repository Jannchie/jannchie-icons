import { bubble, bubbleSolid } from '../ai'
import { eye } from '../scene'
import { hole } from '../solid'

// Hugging Face 任务：图片 + 文本到文本（视觉语言模型）。对话气泡里一只眼睛：看得见、还能跟你说
// *-text-to-text 一族都是「气泡 + 里面的模态」（气泡见 ai.js）：video 是播放三角，audio 是波形
// 这里不用山形图片：库里已经有 chat-image（气泡 + 图片），画出来会一模一样

// 眼睛以主体中心 (12, 10.5) 为中：上下眼睑是两段二次曲线，墨迹约 5.75–18.25 × 6–15，离气泡上下内缘各 1.5；
// 里面只有一个瞳孔（直径 3 的圆点，和眼睑上下各空 1.5）。瞳孔用 eye：粗字重下不再变大，尖角模式下也是圆的
const lids = 'M6.5 10.5Q12 3 17.5 10.5Q12 18 6.5 10.5Z'
const pupil = eye(12, 10.5, 3)

export default ({ radius, stroke }) => [bubble(stroke, radius), lids, pupil]

// 实心：气泡填实，整只眼睛（眼眶连同里面）挖成一个洞，瞳孔再画回去：白眼睛、黑瞳孔。
// 只挖眼眶线的话，眼眶和瞳孔之间会剩一圈细环
export const fill = ({ radius, stroke }) => [bubbleSolid(stroke, radius), hole(lids), pupil]
