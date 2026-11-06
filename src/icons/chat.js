import { bubble, fillParts } from '../chat'
import { rounded } from '../geometry'
import { plainFill } from '../solid'

// 对话气泡
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
]

// 实心：轮廓连同尾巴封口（见 chat.js 的 fillParts）
export const fill = ({ radius, stroke }) => plainFill(fillParts(radius, stroke))
