import { circle } from '../geometry'
import { stacked } from '../solid'

// 向日葵：俯视。正中一个实心的大花盘（半径 4）+ 外面一圈十二片尖头的花瓣连成的轮廓（瓣尖在半径 9.75 的圆上，瓣和瓣之间的凹处在半径 6.5 的圆上，每片两边微微鼓起）
// 实心的大花盘 + 一圈又多又尖的花瓣是向日葵的记号：和六个圆瓣、小花心的 flower，空心圆 + 八道光线的 sun 区分开
const [cx, cy] = [12, 12]
const PETALS = 12
const [VALLEY, TIP] = [6.5, 9.75]
const at = (deg, r) => `${+(cx + r * Math.cos(deg * Math.PI / 180)).toFixed(2)} ${+(cy + r * Math.sin(deg * Math.PI / 180)).toFixed(2)}`
const step = 360 / PETALS
// 每片花瓣：凹处 → 瓣尖 → 下一个凹处，两段二次曲线，控制点在瓣尖两侧偏开 0.3 步、略低于瓣尖
const ring = `M${at(-90 - step / 2, VALLEY)}${[...Array(PETALS).keys()].map((i) => {
  const t = -90 + i * step
  return `Q${at(t - step * 0.3, TIP * 0.94)} ${at(t, TIP)}Q${at(t + step * 0.3, TIP * 0.94)} ${at(t + step / 2, VALLEY)}`
}).join('')}Z`
const disc = `${circle(cx, cy, 4)}Z`

export default () => [ring, { d: disc, fill: true }]

// 实心：花瓣一圈是一块，花盘在前，花瓣在花盘四周让出一圈缝
export const fill = () => stacked(ring, disc)
