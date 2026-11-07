import { knock, solid } from '../solid'

// 木桶（酒桶）：上下平口、两侧外鼓的桶身 + 两道铁箍
// 两侧是半径 R 的圆弧，中段鼓出 2：桶口 7–17，最宽处 5–19；铁箍在 8.5 / 15.5（落在 .5 上，以中线 12 对称），两端落在弧上
const R = (8.5 * 8.5 + 2 * 2) / (2 * 2)
const f = v => +v.toFixed(3)
const at = y => f(5 + R - Math.sqrt(R * R - (y - 12) ** 2)) // 左侧弧在 y 处的 x
const body = `M7 3.5H17A${f(R)} ${f(R)} 0 0 1 17 20.5H7A${f(R)} ${f(R)} 0 0 1 7 3.5Z`
const hoop = y => `M${at(y)} ${y}H${f(24 - at(y))}`

export default () => [body, hoop(8.5), hoop(15.5)]

// 实心：桶身一块，两道铁箍整条挖穿，桶身分成三截
export const fill = () => [
  solid(body),
  knock([8.5, 15.5].map(y => `M0 ${y}H24`)),
]
