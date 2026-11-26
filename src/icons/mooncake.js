import { circle } from '../geometry'
import { knock, solid } from '../solid'

// 月饼（俯视）：一圈十二个小花边的圆饼（花边的端点在半径 8.25 的圆上，控制点往外推 1.2 倍）+ 里面一道圆（半径 5.5，饼面上压出来的边框）
// + 正中一朵四瓣的小花（印花）
const [cx, cy, R, N] = [12, 12, 8.25, 12]
const f = v => +v.toFixed(3)
const on = (deg, k = 1) => `${f(cx + R * k * Math.cos(deg * Math.PI / 180))} ${f(cy + R * k * Math.sin(deg * Math.PI / 180))}`
const STEP = 360 / N
const cake = `M${on(0)}${[...Array(N).keys()].map(i => `Q${on((i + 0.5) * STEP, 1.2)} ${on((i + 1) * STEP)}`).join('')}Z`
const border = circle(cx, cy, 5.5)
const flower = 'M12 12C10.5 10.5 10.5 9 12 9C13.5 9 13.5 10.5 12 12C13.5 10.5 15 10.5 15 12C15 13.5 13.5 13.5 12 12C13.5 13.5 13.5 15 12 15C10.5 15 10.5 13.5 12 12C10.5 13.5 9 13.5 9 12C9 10.5 10.5 10.5 12 12Z'

export default () => [cake, border, { d: flower, detail: true }]

// 实心：饼一块，边框挖成一圈缝，印花挖空
export const fill = () => [solid(cake), knock([border, { d: flower, detail: true }])]
