import { circle, rounded } from '../geometry'
import { hole, solid } from '../solid'

// 消防栓（正面）：圆顶的栓身（7.5–16.5，圆顶顶到 4.5，落到底座 20.5）+ 圆顶底下一圈伸出栓身的帽檐（横线 6–18 在 9.5）+ 顶上的螺帽（短竖线）
// + 左右两个侧出水口（伸出栓身 2 的小方盖）+ 正面的大出水口（圆，圆心 (12, 14.5)、半径 2）+ 底座（横线 4.5–19.5）
// 靠「圆顶 + 两侧的出水口 + 正面的圆口」认出来
const body = 'M7.5 20.5V9A4.5 4.5 0 0 1 16.5 9V20.5'
const brim = 'M6 9.5H18'
const nut = 'M12 4.5V2.5'
const caps = radius => [
  rounded([[7.5, 12.5], [5.5, 12.5], [5.5, 16.5], [7.5, 16.5]], Math.min(radius, 1), false),
  rounded([[16.5, 12.5], [18.5, 12.5], [18.5, 16.5], [16.5, 16.5]], Math.min(radius, 1), false),
]
const base = 'M4.5 20.5H19.5'

export default ({ radius }) => [body, brim, nut, ...caps(radius), circle(12, 14.5, 2), base]

// 实心：栓身一块，帽檐整条挖穿（圆顶成为单独的一片），正面的出水口挖成圆孔；侧出水口各一块小盖；螺帽和底座照旧是线
export const fill = ({ radius, stroke }) => [
  solid([`${body}Z`, ...caps(radius).map(d => `${d}Z`)]),
  { d: 'M4 9.5H20', knock: true },
  hole(circle(12, 14.5, 2 - stroke / 2)),
  nut,
  base,
]
