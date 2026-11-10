import { cutLine, frame, polyline, ridge } from '../ai'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// Hugging Face 任务：无条件图像生成（GAN、扩散模型从噪声出图）。*-to-image 一族的相框 + 山脊，天空里散着三个点：
// 没有任何输入，图是从一把随机噪声里长出来的。text-to-image 的天空里是一颗四角星
// 三个点直径 2，不排成一行也不等距，彼此相隔 4 以上
const noise = [dot(11.25, 7.5), dot(17, 8.25), dot(14.25, 12)]

export default ({ radius, stroke }) => [frame(stroke, radius), polyline(ridge(stroke), radius), ...noise]

// 实心：相框一块，山脊线挖空并穿出框外，三个点挖空
export const fill = ({ radius, stroke }) => [solid(frame(stroke, radius)), knock([cutLine(ridge(stroke), stroke), ...noise])]
