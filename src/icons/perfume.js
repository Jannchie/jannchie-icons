import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { solid, tile } from '../solid'

// 香水瓶：方圆形的瓶身（4.5–16.5 × 10.5–20.5，圆角比别的方框大一号）+ 瓶颈和按压喷头（8.5–12.5，瓶颈 7.5 → 10.5，上面的喷头 4.5 → 7.5，中间一道横线分开）；
// 喷头右边两道同心的香气弧（圆心在喷头右边 (12.5, 6)，半径 3.25 / 6.5）
const body = radius => rounded([[4.5, 10.5], [16.5, 10.5], [16.5, 20.5], [4.5, 20.5]], Math.min(radius * 1.5, 3))
const neck = radius => rounded([[8.5, 10.5], [8.5, 4.5], [12.5, 4.5], [12.5, 10.5]], Math.min(radius, 1), false)
const seam = 'M8.5 7.5H12.5'
const [cx, cy] = [12.5, 6]
const arc = (R, deg) => {
  const [x, y] = [+(cx + R * Math.cos(deg * Math.PI / 180)).toFixed(3), +(R * Math.sin(deg * Math.PI / 180)).toFixed(3)]
  return `M${x} ${cy - y}A${R} ${R} 0 0 1 ${x} ${cy + y}`
}
const scent = [arc(3.25, 42), arc(6.5, 27)]

export default ({ radius }) => [body(radius), neck(radius), seam, ...scent]

// 实心：瓶身一块；瓶颈连喷头一块（见 solid.js 的 tile），底边往上收，和瓶身之间留 GAP 的缝（同 pump-bottle），中间那道横线不画；香气弧照旧是线
export const fill = ({ radius, stroke, sharp }) => {
  const h = stroke / 2
  const r = sharp ? 0 : Math.min(radius, 1) + h
  return [
    solid(body(radius)),
    tile([8.5 - h, 4.5 - h, 12.5 + h, 10.5 - h - GAP], r),
    ...scent,
  ]
}
