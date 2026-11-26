import { rounded } from '../geometry'
import { dot } from '../scene'
import { knock, stacked } from '../solid'

// 搅拌机（正面）：上宽下窄的杯身（顶 5.5–16.5 在 5.5，底 7.5–14.5，两端落在底座顶边 13.5 上）+ 杯口上一个窄一圈的杯盖（7.5–14.5，高 2）
// + 杯身右侧的把手（两端落在杯身斜边上）+ 杯底一道刀片（细线）+ 底座（5.5–16.5 × 13.5–20.5）正中一个旋钮
// 杯身 + 底座 + 旋钮是搅拌机的记号；整体左移 1，让带把手的墨迹在 12 上居中
const jar = radius => rounded([[7.5, 13.5], [5.5, 5.5], [16.5, 5.5], [14.5, 13.5]], Math.min(radius, 1), false)
const lid = radius => rounded([[7.5, 5.5], [7.5, 3.5], [14.5, 3.5], [14.5, 5.5]], Math.min(radius, 0.5), false)
const base = radius => rounded([[5.5, 13.5], [16.5, 13.5], [16.5, 20.5], [5.5, 20.5]], Math.min(radius, 1.5))
// 杯身右边从 (16.5, 5.5) 斜到 (14.5, 13.5)：x = 16.5 - (y - 5.5) / 4，把手两端在 7.5 / 11.5 落在这条边上
const handle = radius => rounded([[16, 7.5], [18.5, 7.5], [18.5, 11.5], [15, 11.5]], Math.min(radius, 1), false)
const blade = { d: 'M9 10.5H13', detail: true }
const knob = dot(11, 17, 2)

export default ({ radius }) => [jar(radius), lid(radius), base(radius), handle(radius), blade, knob]

// 实心：杯盖、杯身、底座从后往前叠成三块，每块完整，前面的块四周让出 GAP 的缝；刀片、旋钮挖空，把手照旧是线
export const fill = ({ radius }) => [
  ...stacked(`${lid(radius)}Z`, `${jar(radius)}Z`, base(radius)),
  knock([blade, knob]),
  handle(radius),
]
