import { rounded, through } from '../geometry'
import { knock, solid } from '../solid'

// 半身裙：顶上的腰头（7.5–16.5 × 4.5–7.5）+ 往下张开的 A 字裙身（下摆 3.5–20.5 在 19.5）+ 裙身上两道顺着裙摆张开的褶线
const band = radius => rounded([[7.5, 4.5], [16.5, 4.5], [16.5, 7.5, 0], [7.5, 7.5, 0]], Math.min(radius, 1))
const body = radius => rounded([[7.5, 7.5, 0], [16.5, 7.5, 0], [20.5, 19.5], [3.5, 19.5]], Math.min(radius, 1.5))
const PLEATS = [[[10.5, 7.5], [9.25, 19.5]], [[13.5, 7.5], [14.75, 19.5]]]

export default ({ radius }) => [band(radius), body(radius), ...PLEATS.map(([a, b]) => through(a, b, 0))]

// 实心：腰头、裙身各一块，接缝整条挖穿；两道褶线从接缝一直挖穿下摆，裙身分成三片
export const fill = ({ radius, stroke }) => [
  solid([band(radius), body(radius)]),
  knock(['M2 7.5H22', ...PLEATS.map(([a, b]) => through(a, b, 0, stroke * 2))]),
]
