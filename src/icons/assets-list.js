import { rounded } from '../geometry'
import { listMark, withListMarkFill } from '../list'
import { spans } from '../solid'
import { assets } from '../symbols'

// 素材为主（居中）+ 右下角小列表；小列表作为 cut，主符号在附近断开
export default ({ radius, stroke }) => [
  ...assets([12, 12], 2, radius),
  ...listMark([18, 18], stroke).map(p => (typeof p === 'string' ? { d: p, cut: true } : { ...p, cut: true })),
]

// 实心：田字的四格各画一块完整的方块（按墨迹范围原样画，同 solid.js 的 tile），格间留 GAP 的缝，不是一整块被十字切开；
// 方框中心线 5–19、十字在 12（assets([12, 12], 2) 的外框）。外角的半径和描边版外缘一致，朝里的角只收一点圆，四块拼起来还是一个方框；
// 右下那一格让出小列表四周的缝以后只剩一圈半个线宽宽的细边：实心版不画这一格，小列表正好占在它的位置上
export const fill = ({ radius, stroke }) => {
  const outer = radius ? Math.min(radius, 2) + stroke / 2 : 0
  const inner = Math.min(radius, 1) / 2
  const [a, b] = spans(5, 19, [12], stroke)
  // 一格：墨迹范围 xs × ys，(ox, oy) 是它在外框上的那个角
  const cell = ([x0, x1], [y0, y1], ox, oy) => ({ d: rounded([[x0, y0], [x1, y0], [x1, y1], [x0, y1]].map(([x, y]) => [x, y, x === ox && y === oy ? outer : inner]), 0), fill: true, exact: true })
  return withListMarkFill([cell(a, a, a[0], a[0]), cell(b, a, b[1], a[0]), cell(a, b, a[0], b[1])], stroke)
}
