import { split, star4 } from '../ai'
import { hole } from '../solid'

// Hugging Face 任务：图片 + 文本到图片（按提示词改图、局部重绘）。image-to-image 的「之前 | 之后」分隔相框，
// 右半边（之后）的太阳换成一颗实心四角星：这一半是凭一句话改出来的
// 分隔线不在正中，而是靠左（墨迹 9–10.5，按左缘 9 定，线宽变粗时往右长）：星要占右半边，分隔线在正中的话右半边只有 6.75 宽，
// 星的尖离分隔线和相框不到 0.5。挪到左边后右半边内部 10.5–19.5，放得下尖到中心 2.5 的星（中心 (15, 12)），粗字重下四周还剩 0.5
// 山顶也跟着左移到 (6, 11.25)，右坡从星的左下方经过
const star = star4(15, 12, 2.5)
const parts = (stroke, radius) => split(stroke, radius, 9 + stroke / 2, [6, 11.25])

export default ({ radius, stroke }) => [...parts(stroke, radius).outline, star]

// 实心：同 image-to-image，星挖空
export const fill = ({ radius, stroke }) => parts(stroke, radius).solid([hole(star)])
