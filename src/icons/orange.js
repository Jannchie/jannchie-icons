import { knock, solid } from '../solid'

// 橙子（切开的半片）：半圆的一片，切面的直边在上（3–21 在 7.5），圆弧的皮在下（到 16.5）+ 里面一道同心的弧（果肉和皮的分界，半径 6）
// + 从切面正中放射到果肉边界的三道瓣线（45°、90°、135°，细节线）。画成半片：整圆一片加辐条像车轮
const [cx, cy, R, r] = [12, 7.5, 9, 6]
const f = v => +v.toFixed(3)
const at = (k, deg) => `${f(cx + k * Math.cos(deg * Math.PI / 180))} ${f(cy + k * Math.sin(deg * Math.PI / 180))}`
const slice = `M${cx - R} ${cy}H${cx + R}A${R} ${R} 0 0 1 ${cx - R} ${cy}Z`
const pith = `M${cx + r} ${cy}A${r} ${r} 0 0 1 ${cx - r} ${cy}`
const cuts = (from = 0) => [45, 90, 135].map(deg => ({ d: `M${at(from, deg)}L${at(r, deg)}`, detail: true }))

export default () => [slice, pith, ...cuts()]

// 实心：半片一块，果肉的边界挖成一道缝（两头穿出切面），三道瓣线从切面外一直挖到这道缝，果肉分成四瓣、外面一圈皮
export const fill = ({ stroke }) => [
  solid(slice),
  knock([`M${cx + r} ${cy - stroke * 1.5}V${cy}A${r} ${r} 0 0 1 ${cx - r} ${cy}V${cy - stroke * 1.5}`, ...cuts(-stroke * 1.5)]),
]
