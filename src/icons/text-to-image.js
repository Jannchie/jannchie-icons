import { cutLine, frame, polyline, ridge, star4 } from '../ai'
import { hole, knock, solid } from '../solid'

// Hugging Face 任务：文本到图片（文生图）。一张图片（相框 + 山脊），太阳的位置换成一颗实心四角星：凭一句话「变」出来的图
// 和库里的 image-sparkle（星是压在相框右上角外面的角标）不同，这里星在画面里当太阳；
// *-to-image 一族都是这个相框 + 山脊（见 ai.js），靠天空里的东西区分
// 相框外缘 3–21：既是整数（细字重下中心线落在 .5 上），又是 1.5 的整数倍（16px 下四条边都落在像素边界上），线宽变粗时往里长

// 四角星：中心 (14, 10)，尖到中心 3.5（第一版只有 2.75、腰也粗，16px 下是个圆团）；连描边约 9.75–18.25 × 5.75–14.25，
// 离相框上、右内缘各 1.25，粗字重下（相框和星的描边都变粗）还剩 0.5
const star = star4(14, 10, 3.5)

export default ({ radius, stroke }) => [frame(stroke, radius), polyline(ridge(stroke), radius), star]

// 实心：相框一块；山脊线挖空并穿出框外，左下的山体自成一块（和 image 的实心版一样）；星挖空
export const fill = ({ radius, stroke }) => [solid(frame(stroke, radius)), knock(cutLine(ridge(stroke), stroke)), hole(star)]
