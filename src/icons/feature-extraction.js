import { brackets } from '../ai'
import { dot } from '../scene'

// Hugging Face 任务：特征提取（embedding）。一个列向量：一对方括号，中间竖排三个点
// 方括号外缘 6–18 × 3–21，都是 3 的整数倍（整数，又在 1.5 网格上：细字重和 16px 下都清晰）；列向量本来就窄，左右留白 6。
// 横臂墨迹伸到 10 / 14，线宽变粗时往里长（方括号见 ai.js，image-feature-extraction 用更宽的一对）
// 三个点直径 3（16px 下 2 像素），圆心 6.75 / 12 / 17.25，点与点之间空 2.25，离方括号的竖笔 3

// 纯线条图标，实心版和描边版相同，不单独导出 fill
export default ({ radius, stroke }) => [...brackets(stroke, radius, [6, 18, 4]), dot(12, 6.75, 3), dot(12, 12, 3), dot(12, 17.25, 3)]
