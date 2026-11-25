import { solid } from '../solid'

// 饺子：半月形，平底在下；上沿是七个小褶子（一串往外鼓的小弧），底边两角圆润；里面一道和上沿同心的弧（捏合的褶边和饺子肚的分界）
// 褶子的端点落在半椭圆上（圆心 (12, 16.5)、半径 8.75 × 10.25，七等分），控制点沿径向往外推 1.2 倍；里面那道弧是同一个椭圆缩到 K 倍
const [cx, cy, rx, ry] = [12, 16.5, 8.75, 10.25]
const K = 0.7
const STEP = 180 / 7
const f = v => +v.toFixed(3)
const on = (deg, k = 1) => `${f(cx + rx * k * Math.cos(deg * Math.PI / 180))} ${f(cy - ry * k * Math.sin(deg * Math.PI / 180))}`
const pleats = [...Array(7).keys()].map(i => `Q${on(180 - (i + 0.5) * STEP, 1.2)} ${on(180 - (i + 1) * STEP)}`).join('')
const body = `M${on(180)}${pleats}C20.75 17.75 19.75 18.5 18.5 18.5H5.5C4.25 18.5 3.25 17.75 3.25 16.5Z`
const seam = `M${on(170, K)}A${f(rx * K)} ${f(ry * K)} 0 0 1 ${on(10, K)}`

export default () => [body, seam]

// 实心：饺子是完整的一块（里面那道弧不挖——挖开的褶边像一道拱门）
export const fill = () => [solid(body)]
