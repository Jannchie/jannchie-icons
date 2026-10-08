import { rounded } from '../geometry'
import { envelope, flap } from '../mail'

// 邮件：信封 + 30° 封口
export default ({ radius, stroke }) => [
  rounded(envelope(stroke), radius),
  flap(stroke, radius),
]
