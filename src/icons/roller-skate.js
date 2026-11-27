import { GAP } from '../clearance'
import { circle } from '../geometry'
import { eye } from '../scene'
import { clear, solid } from '../solid'

// 轮滑鞋（双排轮，侧面、鞋尖朝右）：和 ice-skate 同一种高帮的鞋（鞋筒 3.5–9.5，顶在 3.5；鞋面往右前方伸到 20.5，鞋底平直在 16.5）
// + 鞋底下前后两个轮子（圆心 (8, 17.75) / (16, 17.75)、半径 2.75，带轮轴点，落到 20.5）
// 轮子嵌在鞋底里：鞋底在轮子处断开，线头落在轮子的圆上（x = 8 ± 2.45 / 16 ± 2.45），不是挂在鞋底下面
// 靠「高帮鞋 + 两个轮子」认出来；ice-skate 底下是刀架和冰刀
const upper = 'V3.5H9.5V8.5C9.5 10 10.5 10.75 12 11.25C16.5 12.25 20.5 13 20.5 15.5V16.5'
const boot = `M5.55 16.5H3.5${upper}H18.45`
const sole = 'M10.45 16.5H13.55'
const wheels = [circle(8, 17.75, 2.75), circle(16, 17.75, 2.75)]
const axles = [eye(8, 17.75, 1.5), eye(16, 17.75, 1.5)]

export default () => [boot, sole, ...wheels, ...axles]

// 实心：鞋子一块（鞋底封口），两个轮子在前面，鞋子在轮子四周让出缝；轮轴挖成小孔
export const fill = () => [
  solid(`M3.5 16.5${upper}Z`),
  clear(wheels, GAP),
  solid(wheels),
  ...axles.map(a => ({ ...a, knock: true })),
]
