import { rounded } from '../geometry'

// 已读邮件（拆开的信封）：侧墙、底边和 mail 一样（墨迹左右 2–22、底 21），顶上是翻开的封口——两侧墙顶起斜向收到中间的屋顶形，
// 屋顶尖和 mail 的顶边一样顶到 3，整体墨迹 2–22 × 3–21；线宽变粗时外缘不动、往里长（h 是半个线宽）
// 屋顶从墙顶 WALL 斜向升到尖，尖的顶点在 2.6 + h（圆角 2 下墨迹顶在 3 左右，和底边 21 对称）；里面的 V 口和 mail 的封口同样 30°，从墙顶往下 2 起（避开圆角）
const WALL = 9.5

export default ({ radius, stroke }) => {
  const h = stroke / 2
  const [l, r, b] = [2 + h, 22 - h, 21 - h]
  const apex = 2.6 + h
  const v = WALL + 2
  const depth = (r - l) / 2 * Math.tan(Math.PI / 6)
  return [
    rounded([[l, WALL], [12, apex], [r, WALL], [r, b], [l, b]], Math.min(radius, 2.5)),
    rounded([[l, v], [12, v + depth], [r, v]], Math.min(radius, 1.5), false),
  ]
}
