import { rounded } from '../geometry'
import { envelope, fillParts, flap } from '../mail'
import { plainFill } from '../solid'

// 邮件：信封 + 30° 封口
export default ({ radius, stroke }) => [
  rounded(envelope(stroke), radius),
  flap(stroke, radius),
]

// 实心：信封一块，挖掉封口线（见 mail.js 的 fillParts）
export const fill = ({ radius, stroke }) => plainFill(fillParts(radius, stroke))
