import { rounded } from '../geometry'
import { solid } from '../solid'

// 法槌：斜 45° 的木槌——槌头在左上（中心 (9.5, 9)，长 10、厚 5 的圆角长方块，长边垂直于槌柄），槌柄从槌头侧面的正中伸向右下 (20, 19.5)；
// 左下角一块底座（3.5–11.5 × 17.5–20.5，槌要敲的垫木）
const S = Math.SQRT1_2
const [cx, cy] = [9.5, 9]
const [L, T] = [5, 2.5] // 槌头的半长、半厚
// u 是槌柄方向（右下），v 垂直于槌柄
const at = (a, b) => [cx + (a + b) * S, cy + (a - b) * S].map(n => +n.toFixed(3))
const head = radius => rounded([at(T, L), at(-T, L), at(-T, -L), at(T, -L)], Math.min(radius, 1.5))
const shaft = `M${at(T, 0).join(' ')}L20 19.5`
const block = radius => rounded([[3.5, 17.5], [11.5, 17.5], [11.5, 20.5], [3.5, 20.5]], Math.min(radius, 1))

export default ({ radius }) => [head(radius), shaft, block(radius)]

// 实心：槌头、底座各一块，槌柄照旧是线
export const fill = ({ radius }) => [solid([head(radius), block(radius)]), shaft]
