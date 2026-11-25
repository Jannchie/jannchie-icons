import { oval } from '../geometry'
import { knock, solid } from '../solid'

// 菠萝：椭圆的果身（圆心 (12, 15)、半径 5.5 × 6.25）+ 顶上的叶冠（正中一片竖直到 2.75，两边各一片往外弯）
// + 果身上两组交叉的斜纹（斜 45° 各两道，细节线，两端落在果身的椭圆上）
const [cx, cy, rx, ry] = [12, 15, 5.5, 6.25]
const f = v => +v.toFixed(3)
const body = oval(cx, cy, rx, ry)
// 斜线 y − cy = s·(x − cx) + c 和椭圆的两个交点；k 把线段沿自身方向放长（实心版挖穿用）
function chord(s, c, k = 1) {
  const A = 1 / rx ** 2 + 1 / ry ** 2
  const B = 2 * s * c / ry ** 2
  const C = c * c / ry ** 2 - 1
  const D = Math.sqrt(B * B - 4 * A * C)
  const [u0, u1] = [(-B - D) / (2 * A), (-B + D) / (2 * A)]
  const [m, half] = [(u0 + u1) / 2, (u1 - u0) / 2 * k]
  const at = u => `${f(cx + u)} ${f(cy + s * u + c)}`
  return `M${at(m - half)}L${at(m + half)}`
}
const LINES = [[1, -2.75], [1, 2.75], [-1, -2.75], [-1, 2.75]]
const hatch = LINES.map(([s, c]) => ({ d: chord(s, c), detail: true }))
const crown = ['M12 8.75V2.75', 'M12 8.75C10.75 6.75 9.25 5.5 7 5', 'M12 8.75C13.25 6.75 14.75 5.5 17 5']

export default () => [body, ...hatch, ...crown]

// 实心：果身一块，斜纹两头都挖穿；叶冠照旧是线
export const fill = () => [solid(body), knock(LINES.map(([s, c]) => ({ d: chord(s, c, 1.5), detail: true }))), ...crown]
