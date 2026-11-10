import { cutLine, polyline, tag, tagPunch, tagRidge } from '../ai'
import { knock, solid } from '../solid'

// Hugging Face 任务：图像分类。分类族的标签，标签面上一道山脊（图片）
// 山脊从底边 45° 上到山顶 (15, 底边上 5)，下到山谷，再 45° 上到右边：两端都落在标签的直边上
// 山脊见 ai.js 的 tagRidge：zero-shot-image-classification 在同一道山脊上方加一颗星

export default ({ radius, stroke }) => [tag(stroke, radius), tagPunch, polyline(tagRidge(stroke), radius)]

// 实心：标签一块，穿孔挖空；山脊线挖空并两端穿出标签，山体自成一块
export const fill = ({ radius, stroke }) => [solid(tag(stroke, radius)), knock([tagPunch, cutLine(tagRidge(stroke), stroke)])]
