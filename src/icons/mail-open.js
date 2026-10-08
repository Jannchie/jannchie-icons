import { rounded } from '../geometry'

// 已读邮件（拆开的信封）：信封侧边、底边和 mail 一样（3.5 / 20.5、底 19.5），顶上是翻开的封口——
// 两侧墙顶 9.5 起斜向收到 (12, 3.5) 的屋顶形；里面的 V 口和 mail 的封口同样 30°，从墙顶往下 2 起（避开圆角）
const [l, r, b] = [3.5, 20.5, 19.5]
const wall = 9.5
const v = wall + 2
const depth = (r - l) / 2 * Math.tan(Math.PI / 6)

export default ({ radius }) => [
  rounded([[l, wall], [12, 3.5], [r, wall], [r, b], [l, b]], Math.min(radius, 2.5)),
  rounded([[l, v], [12, v + depth], [r, v]], Math.min(radius, 1.5), false),
]
