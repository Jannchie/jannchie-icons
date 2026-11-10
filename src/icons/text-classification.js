import { tag, tagPunch } from '../ai'
import { knock, solid } from '../solid'

// Hugging Face 任务：文本分类。一个横放的标签（分类 = 贴标签），标签面上写着两行字（被分类的是文本）
// *-classification 一族共用这个标签外形（见 ai.js），标签面上换成各自的内容

// 两行字按墨迹的外缘定：上一行的上缘在 9、下一行的下缘在 15（线宽变粗时往中间长），常规线宽下墨迹 9–10.5 / 13.5–15，
// 中间空 3（16px 下 2 像素）；第二行短一截，读成文字而不是等号
const lines = h => [`M12 ${9 + h}H18.25`, `M12 ${15 - h}H15.5`]

export default ({ radius, stroke }) => [tag(stroke, radius), tagPunch, ...lines(stroke / 2)]

// 实心：标签一块，穿孔和两行字挖空
export const fill = ({ radius, stroke }) => [solid(tag(stroke, radius)), knock([tagPunch, ...lines(stroke / 2)])]
