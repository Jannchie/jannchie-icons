import { rounded } from '../geometry'

// 机器人：方头 + 天线 + 竖线眼睛 + 两侧耳朵；外框 3–21 × 5–19
const head = { l: 5, r: 19, t: 8, b: 19 }
const eyeY = (head.t + head.b) / 2

export default ({ radius }) => [
  rounded([[head.l, head.t], [head.r, head.t], [head.r, head.b], [head.l, head.b]], radius),
  `M12 ${head.t}V5`,
  `M9 ${eyeY - 1}v2`,
  `M15 ${eyeY - 1}v2`,
  `M3 ${eyeY - 1.5}v3`,
  `M21 ${eyeY - 1.5}v3`,
]
