import { brackets, polyline } from '../ai'
import { dot } from '../scene'

// Hugging Face 任务：图像特征提取（图像 embedding）。feature-extraction 的那对方括号，括号里不是三个点，而是一幅小风景（两座山 + 太阳）：
// 被编码成向量的是一张图
// 方括号外缘 3–21 × 3–21（比 feature-extraction 的宽，里面要放画），横臂墨迹伸到 7.5
// 山：45° 的折线 (6.75, 16.5) → (10.5, 12.75) → (13.25, 15.5) → (17.25, 11.5)，墨迹 6–18，离两边的竖笔 1.5；太阳直径 2.25
// 纯线条图标，实心版和描边版相同，不单独导出 fill
export default ({ radius, stroke }) => [
  ...brackets(stroke, radius, [3, 21, 4.5]),
  polyline([[6.75, 16.5], [10.5, 12.75], [13.25, 15.5], [17.25, 11.5]], radius),
  dot(12.5, 8, 2.25),
]
