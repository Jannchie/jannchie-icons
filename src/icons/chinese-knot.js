import { circle, crisp, rounded, through } from '../geometry'
import { GAP } from '../clearance'
import { cutout, solid } from '../solid'

// 中国结（盘长结）：正中一个菱形（四个角 (12, 5.5)、(17.5, 11)、(12, 16.5)、(6.5, 11)），里面两组斜线各分三份，编成 3 × 3 的格子；
// 菱形上角顶着一个挂绳的小圈，左右两个角各挂一个耳圈（半径 1.25，都和菱形的角相切）；下角垂一小段绳，接一束上窄下宽的流苏。
// 编织的菱形格子 + 耳圈 + 流苏是记号：只有菱形和十字读成风筝，没有流苏读成格子菱形
const f = v => +v.toFixed(3)
const [T, R, B, L] = [[12, 5.5], [17.5, 11], [12, 16.5], [6.5, 11]]
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
// 格子线：平行于右上边的两条（从左上边到右下边）、平行于左上边的两条（从左下边到右上边）
const strands = [1 / 3, 2 / 3].flatMap((t) => {
  const a = lerp(L, T, t)
  const c = lerp(L, B, t)
  return [[a, [a[0] + R[0] - T[0], a[1] + R[1] - T[1]]], [c, [c[0] + T[0] - L[0], c[1] + T[1] - L[1]]]]
})
const lattice = e => strands.map(([a, b]) => through(a.map(f), b.map(f), e))
const diamond = radius => rounded([T, R, B, L], crisp(radius))
const loops = [circle(12, 4.25, 1.25), circle(5.25, 11, 1.25), circle(18.75, 11, 1.25)]
const cord = 'M12 16.5V17.5'
const tassel = radius => rounded([[11, 17.5], [13, 17.5], [14, 20.5], [10, 20.5]], crisp(radius))

export default ({ radius }) => [diamond(radius), ...lattice(0), ...loops, cord, tassel(radius)]

// 实心：菱形一块，四条格子线各挖一道 GAP 宽的缝、两头穿出菱形，分成九个小菱形（按线宽挖的话每格只剩一个线宽，碎成一片网）；
// 流苏一块；挂绳圈、耳圈、短绳照旧是线
const band = ([a, b], e, w) => {
  const l = Math.hypot(b[0] - a[0], b[1] - a[1])
  const [ux, uy] = [(b[0] - a[0]) / l, (b[1] - a[1]) / l]
  const [nx, ny] = [-uy * w, ux * w]
  const [p, q] = [[a[0] - ux * e, a[1] - uy * e], [b[0] + ux * e, b[1] + uy * e]]
  return `M${f(p[0] + nx)} ${f(p[1] + ny)}L${f(q[0] + nx)} ${f(q[1] + ny)}L${f(q[0] - nx)} ${f(q[1] - ny)}L${f(p[0] - nx)} ${f(p[1] - ny)}Z`
}
export const fill = ({ radius, stroke }) => [
  solid(diamond(radius)),
  cutout(strands.map(s => band(s, stroke * 2, GAP / 2))),
  solid(tassel(radius)),
  ...loops,
  cord,
]
