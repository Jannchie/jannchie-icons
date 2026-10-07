import { crisp, rounded } from '../geometry'
import { ring } from '../marks'

// 足球：圆 + 中间的正五边形 + 从五边形每个顶点射向球边的缝线
// 五边形中心放在 (11.5, …)：朝上的缝线落在 x = 11.5，底边落在 y = 14.5
const [px, py] = [11.5, 14.5 - 3.5 * Math.cos(Math.PI / 5)]
const dir = i => [Math.cos((-90 + 72 * i) * Math.PI / 180), Math.sin((-90 + 72 * i) * Math.PI / 180)]
const penta = [0, 1, 2, 3, 4].map((i) => {
  const [ux, uy] = dir(i)
  return [px + 3.5 * ux, py + 3.5 * uy]
})
// 缝线从顶点沿射线方向一直画到球边（圆心 (12, 12)、半径 9）
const rim = (i) => {
  const [ux, uy] = dir(i)
  const [ox, oy] = [px - 12, py - 12]
  const b = ox * ux + oy * uy
  const t = -b + Math.sqrt(b * b - (ox * ox + oy * oy - 81))
  return [px + t * ux, py + t * uy]
}
export default ({ radius }) => [
  ring(),
  rounded(penta, crisp(radius)),
  ...penta.map((p, i) => `M${p.join(' ')}L${rim(i).join(' ')}`),
]
