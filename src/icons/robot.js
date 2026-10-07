import { rounded } from '../geometry'

// 机器人：方头 + 天线 + 竖线眼睛 + 两侧耳朵；外框 3.5–20.5 × 5–18.5；横竖线都落在 .5 上，居中的天线偏左半格
const head = { l: 5.5, r: 18.5, t: 8.5, b: 18.5 }
const eyeY = (head.t + head.b) / 2

export default ({ radius }) => [
  rounded([[head.l, head.t], [head.r, head.t], [head.r, head.b], [head.l, head.b]], radius),
  `M11.5 ${head.t}V5`,
  `M9.5 ${eyeY - 1}v2`,
  `M14.5 ${eyeY - 1}v2`,
  `M3.5 ${eyeY - 1.5}v3`,
  `M20.5 ${eyeY - 1.5}v3`,
]
