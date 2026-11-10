import { boxLines, boxSolid, star4 } from '../ai'
import { hole } from '../solid'

// Hugging Face 任务：文本到 3D。*-to-3d 一族的斜二测盒子，正面一颗实心四角星（凭一句话生成）
// 库里的 cube-sparkle 是等距立方体 + 右上角标星；这里星在盒子的正面上
// 星：正面（内部 4.5–13.5 × 10.5–19.5）的正中 (9, 15)，尖到中心 2.5、腰略放宽（0.3）；连描边离正面内缘 1.25，粗字重下还剩 0.5
const star = star4(9, 15, 2.5, 0.3)

export default ({ radius, stroke }) => [...boxLines(stroke, radius), star]

// 实心：盒子三块，正面上的星挖空
export const fill = ({ radius, stroke }) => [...boxSolid(stroke, radius), hole(star)]
