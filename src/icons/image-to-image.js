import { split } from '../ai'
import { dot } from '../scene'
import { knock } from '../solid'

// Hugging Face 任务：图片到图片（风格迁移、超分、图生图）。一张图片被一道上下出头的竖分隔线分成「之前 | 之后」两半
// 「竖分隔线」是同模态变换的母题（video-to-video 也用）；库里的 compare 是方框 + 分隔线 + 圆手柄，没有山脊
// 相框外缘 3–21 × 6–18，分隔线墨迹 3–21（上下各出头 3）：横竖边都在 3 的整数倍上。分隔线在正中 x 12
// （正中的单线不为对齐挪半格，细字重下 grid 审计会提示 x 12）
// 分隔相框见 ai.js 的 split（image-text-to-image 也用，那边分隔线靠左，给右半边的星腾地方）
// 右半边的太阳：直径 2 的点
const sun = dot(16.25, 10.75)
const parts = (stroke, radius) => split(stroke, radius, 12, [7.5, 10.75])

export default ({ radius, stroke }) => [...parts(stroke, radius).outline, sun]

export const fill = ({ radius, stroke }) => parts(stroke, radius).solid([knock(sun)])
