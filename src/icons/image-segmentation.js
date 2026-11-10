import { cutLine, frame, ridge } from '../ai'
import { crisp, rounded } from '../geometry'
import { knock, solid } from '../solid'

// Hugging Face 任务：图像分割。一张图片沿山脊线分成两个区域：山脊以下整片填实，天空留白
// 和 mask-generation（选区里一块不贴边的色块）不同，这里整张图都被分了区
// 相框外缘 3–21；山体是一块实心区域，沿相框左边、底边的中心线走，左下角跟着相框的圆角
const ground = (stroke, radius) => {
  const [p, top, q] = ridge(stroke)
  return { d: rounded([p, [...top, crisp(radius)], q, [p[0], q[1], radius]], 0), fill: true }
}

export default ({ radius, stroke }) => [frame(stroke, radius), ground(stroke, radius)]

// 实心：相框一块，沿山脊线挖一道缝并穿出框外——天空、山体两块各自独立（实心版里两个区域都是实的，靠这道缝分开）
export const fill = ({ radius, stroke }) => [solid(frame(stroke, radius)), knock(cutLine(ridge(stroke), stroke))]
