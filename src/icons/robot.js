import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 机器人：方头 + 正中天线 + 竖线眼睛 + 两侧耳朵；外框 3.5–20.5 × 5.5–18.5，上下左右居中
const head = { l: 5.5, r: 18.5, t: 8.5, b: 18.5 }
const eyeY = (head.t + head.b) / 2

export default ({ radius }) => [
  rounded([[head.l, head.t], [head.r, head.t], [head.r, head.b], [head.l, head.b]], radius),
  `M12 ${head.t}V5.5`,
  `M9.5 ${eyeY - 1}v2`,
  `M14.5 ${eyeY - 1}v2`,
  `M3.5 ${eyeY - 1.5}v3`,
  `M20.5 ${eyeY - 1.5}v3`,
]

// 实心：方头一块，挖掉眼睛，天线和耳朵照旧是线；耳朵和头的中线只隔 2，粗字重下墨迹贴在一起（描边版有断线处理，实心版没有）：
// 耳朵往外挪到和头的墨迹之间至少留 GAP
export const fill = ({ radius, stroke }) => {
  const e = Math.max(0, stroke - (head.l - 3.5 - GAP))
  return [
    solid(rounded([[head.l, head.t], [head.r, head.t], [head.r, head.b], [head.l, head.b]], radius)),
    knock([`M9.5 ${eyeY - 1}v2`, `M14.5 ${eyeY - 1}v2`]),
    `M12 ${head.t}V5.5`,
    `M${3.5 - e} ${eyeY - 1.5}v3`,
    `M${20.5 + e} ${eyeY - 1.5}v3`,
  ]
}
