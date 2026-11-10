import { cutLine, polyline, star4, tag, tagPunch, tagRidge } from '../ai'
import { hole, knock, solid } from '../solid'

// Hugging Face 任务：零样本图像分类。image-classification（标签 + 山脊）的天空里多一颗实心四角星（zero-shot-* 一族的记号）
// 和 image-classification 只差这颗星——这是和用户确认过的取舍
// 星：中心 (15.25, 9.75)，尖到中心 2.75，在山脊上方、标签右半的正中；粗字重下离标签上内缘、山顶都还剩 0.5 以上
const star = star4(15.25, 9.75, 2.75)

export default ({ radius, stroke }) => [tag(stroke, radius), tagPunch, polyline(tagRidge(stroke), radius), star]

// 实心：标签一块，穿孔、星挖空，山脊线挖空并穿出标签
export const fill = ({ radius, stroke }) => [solid(tag(stroke, radius)), knock([tagPunch, cutLine(tagRidge(stroke), stroke)]), hole(star)]
