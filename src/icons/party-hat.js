import { crisp, rounded, through } from '../geometry'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 派对帽：尖顶的圆锥帽（帽尖 (12, 5.5)，帽口 5.5–18.5 在 20.5）+ 帽尖上一颗绒球（圆点）+ 帽身上两道斜的彩条（左低右高地斜着，两端落在帽子的两条斜边上）
// 斜边上的点：离帽尖 k 处是 (12 ± 6.5k, 5.5 + 15k)
const on = (side, k) => [12 + side * 6.5 * k, 5.5 + 15 * k]
const STRIPES = [[on(-1, 0.5), on(1, 0.3)], [on(-1, 0.8), on(1, 0.6)]]
const cone = radius => rounded([[12, 5.5, crisp(radius)], [18.5, 20.5], [5.5, 20.5]], Math.min(radius, 1.5))
const pom = { ...dot(12, 4, 3), round: true }

export default ({ radius }) => [cone(radius), ...STRIPES.map(([a, b]) => through(a, b, 0)), pom]

// 实心：帽子一块，两道彩条两头都挖穿，帽子分成三段；绒球照旧是点
export const fill = ({ radius, stroke }) => [solid(cone(radius)), knock(STRIPES.map(([a, b]) => through(a, b, stroke * 2))), pom]
