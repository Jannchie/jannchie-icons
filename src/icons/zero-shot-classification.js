import { star4, tag, tagPunch } from '../ai'
import { hole, knock, solid } from '../solid'

// Hugging Face 任务：零样本分类。分类族的标签，标签面上一颗大的实心四角星（zero-shot-* 一族的记号）：
// 标签上没有预先印好的类别。库里的 tag-0 是标签 + 数字 0
// 星：中心 (14.5, 12)，尖到中心 4，占满标签面；连描边离穿孔 1.5、离标签右内缘 1.25，粗字重下还剩 0.5 以上
const star = star4(14.5, 12, 4)

export default ({ radius, stroke }) => [tag(stroke, radius), tagPunch, star]

// 实心：标签一块，穿孔和星挖空
export const fill = ({ radius, stroke }) => [solid(tag(stroke, radius)), knock(tagPunch), hole(star)]
