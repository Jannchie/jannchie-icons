import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 手提包：上窄下宽的包身（5.5–18.5 → 3.5–20.5，10.5–20.5）+ 接在包口上的拱形提手（8.5–15.5，顶到 4.5）
// + 从包口两角兜下来的翻盖弧线 + 翻盖正中的搭扣（短竖线）
const body = radius => rounded([[5.5, 10.5], [18.5, 10.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 2))
const handle = 'M8.5 10.5V8A3.5 3.5 0 0 1 15.5 8V10.5'
const flap = 'C5.5 13.75 8.5 15 12 15C15.5 15 18.5 13.75 18.5 10.5'
const clasp = 'M12 13.5V16.5'

export default ({ radius }) => [body(radius), handle, `M5.5 10.5${flap}`, clasp]

// 实心：包身一块，翻盖的弧线两头穿出包口、整条挖穿，翻盖成为单独的一片；提手、搭扣照旧是线
export const fill = ({ radius }) => [solid(body(radius)), knock(`M5.5 8V10.5${flap}V8`), handle, clasp]
