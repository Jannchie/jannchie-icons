import { circle, frame, ray } from '../geometry'
import { knock, solid } from '../solid'

// 保险箱：方箱体（墨迹 3–21 × 3–18，线宽变粗往里长）+ 箱门正中的转盘（圆心 (12, 10.5)、半径 3）+ 转盘上往四个斜角伸出去的把手
// （径向线，和圆垂直相接，伸到半径 5）+ 箱底两只脚（落到 21）。有把手的转盘和两只脚把它和洗衣机分开
const [cx, cy, r, R] = [12, 10.5, 3, 5]
const spokes = [45, 135, 225, 315].map(deg => ray([cx, cy], deg, r, R))
const dial = [circle(cx, cy, r), ...spokes]
const box = (radius, stroke) => frame(stroke, Math.min(radius, 2), [3, 3, 21, 18])
const feet = (stroke) => {
  const h = stroke / 2
  return [`M6.5 ${18 - h}V${21 - h}`, `M17.5 ${18 - h}V${21 - h}`]
}

export default ({ radius, stroke }) => [box(radius, stroke), ...dial, ...feet(stroke)]

// 实心：箱体一块，转盘的圆圈和把手挖空（转盘留成实心）；两只脚照旧是线
export const fill = ({ radius, stroke }) => [solid(box(radius, stroke)), knock(dial), ...feet(stroke)]
