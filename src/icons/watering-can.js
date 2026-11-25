import { rounded } from '../geometry'
import { solid } from '../solid'

// 洒水壶（侧视，壶嘴朝右）：方壶身（7.5–16.5 × 10.5–20.5）+ 壶身顶上的拱形提手（9.5–14.5，顶到 6.5）+ 左侧的 D 形把手
// + 从壶身右侧下部斜伸到右上的长壶嘴，嘴尖上一道垂直于壶嘴的短横（莲蓬头）
const body = radius => rounded([[7.5, 10.5], [16.5, 10.5], [16.5, 20.5], [7.5, 20.5]], Math.min(radius, 2))
const top = 'M9.5 10.5V9A2.5 2.5 0 0 1 14.5 9V10.5'
const grip = 'M7.5 12.5H6A2.5 2.5 0 0 0 6 17.5H7.5'
// 壶嘴：(16.5, 17.5) → (19.75, 9.75)；莲蓬头在嘴尖两侧各伸 1.5
const [sx, sy, tx, ty] = [16.5, 17.5, 19.75, 9.75]
const len = Math.hypot(tx - sx, ty - sy)
const [px, py] = [-(ty - sy) / len * 1.5, (tx - sx) / len * 1.5]
const f = v => +v.toFixed(3)
const spout = `M${sx} ${sy}L${tx} ${ty}`
const rose = `M${f(tx - px)} ${f(ty - py)}L${f(tx + px)} ${f(ty + py)}`

export default ({ radius }) => [body(radius), top, grip, spout, rose]

// 实心：壶身一块；提手、把手、壶嘴照旧是线
export const fill = ({ radius }) => [solid(body(radius)), top, grip, spout, rose]
