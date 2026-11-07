import { GAP } from '../clearance'
import { circle } from '../geometry'
import { cutout, solid } from '../solid'
import { rotate } from '../transform'

// 蜜蜂：俯视。头是实心圆（圆心 (12, 6)、半径 2），两根往外弯的触角从头里伸出（-125° / -55°，长 4，起点藏在填实的头里，尖角时线头不冒出来）；
// 腹部是两侧竖直、底部用软曲线收成尾尖的水滴（8.5–15.5，顶 9.5，竖边从 13 到 16，尾尖 (12, 21)），两道横纹垂直接在竖边的直线段上（13.5 / 15.5，离尾针拐角留开）；
// 两片椭圆翅膀（半轴 3 × 1.75）斜向外上张开，离开身体；圆心 (5.5, 11) / (18.5, 11)，外缘离画布边常规约 1.9、粗字重约 1.7（圆形可放宽到 1.5）
const wing = (cx, cy, deg) => rotate(`M${cx - 3} ${cy}A3 1.75 0 1 0 ${cx + 3} ${cy}A3 1.75 0 1 0 ${cx - 3} ${cy}Z`, deg, [cx, cy])
const rad = d => d * Math.PI / 180
const antenna = (deg) => {
  const p = r => `${+(12 + r * Math.cos(rad(deg))).toFixed(3)} ${+(6 + r * Math.sin(rad(deg))).toFixed(3)}`
  // 触角微微拱起：二次曲线的控制点在中段、往上抬 0.75
  const c = `${+(12 + 2.5 * Math.cos(rad(deg))).toFixed(3)} ${+(6 + 2.5 * Math.sin(rad(deg)) - 0.75).toFixed(3)}`
  return `M${p(1)}Q${c} ${p(4)}`
}
export default () => [
  { d: `${circle(12, 6, 2)}Z`, fill: true },
  antenna(-125),
  antenna(-55),
  'M8.5 13A3.5 3.5 0 0 1 15.5 13V16C15.5 18.1 13.75 19.9 12 21C10.25 19.9 8.5 18.1 8.5 16Z',
  'M8.5 13.5H15.5',
  'M8.5 15.5H15.5',
  wing(5.5, 11, -25),
  wing(18.5, 11, 25),
]

// 实心：头本来就是实心；腹部一块，沿两道横纹各切开一条 GAP 宽的缝（腹部分成三节，读作条纹）；翅膀各是一块，触角照旧是线。
// 不按线宽挖横纹：两道纹只隔 2，常规字重下中间那节只剩 0.5 的细条，粗字重下两道缝连成一片。缝按 GAP 切，中间那节总是 1 厚，
// 缝是横穿腹部的矩形（腹部在这里两侧竖直），两端伸出腹部外，翅膀最后画、不受影响
const abdomen = 'M8.5 13A3.5 3.5 0 0 1 15.5 13V16C15.5 18.1 13.75 19.9 12 21C10.25 19.9 8.5 18.1 8.5 16Z'
const stripe = y => `M6 ${y - GAP / 2}H18V${y + GAP / 2}H6Z`
export const fill = () => [
  { d: `${circle(12, 6, 2)}Z`, fill: true },
  antenna(-125),
  antenna(-55),
  solid(abdomen),
  cutout([stripe(13.5), stripe(15.5)]),
  solid([wing(5.5, 11, -25), wing(18.5, 11, 25)]),
]
