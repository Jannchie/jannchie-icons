import { circle, rounded } from '../geometry'
import { solid } from '../solid'

// 扶梯：梯身是闭合斜带——下平台（高 3）→ 45° 斜段（上边 x + y = 27，下边 x + y = 33）→ 上平台（高 3）；
// 斜带左上站一个人，画法同 elevator：圆头 + 半圆肩的上身，左边落在下平台上、右边落在斜段上。右下角的三角空白留给上下行箭头
const body = [[3.5, 20.5], [3.5, 17.5], [9.5, 17.5], [17.5, 9.5], [20.5, 9.5], [20.5, 12.5], [12.5, 20.5]]
export const escalator = radius => [
  rounded(body, Math.min(radius, 1)),
  circle(8.5, 5.25, 1.75),
  'M6.5 17.5V11A2 2 0 0 1 10.5 11V16.5',
]
export default ({ radius }) => escalator(radius)

// 实心：梯身一块，人（头和上身）各是实心。上身不碰梯身：底边顺着脚下的台面和斜边往上收 d（线宽 + 0.75），
// 实心外扩半个线宽以后，和梯身之间正好是一道 0.75 宽、贴着台面和斜边的缝，梯身本身不被挖
const LIFT = 0.75
export const escalatorFill = (radius, stroke) => {
  const d = stroke + LIFT
  const f = v => +v.toFixed(3)
  const yb = 17.5 - d // 底边（台面往上 d）
  const xi = f(9.5 + d * (1 - Math.SQRT2)) // 底边和斜边（x + y = 27 往里收 d）的交点
  const yr = f(16.5 - d * Math.SQRT2) // 上身右边落在收进的斜边上
  return [
    solid(rounded(body, Math.min(radius, 1))),
    solid([`M6.5 ${yb}V11A2 2 0 0 1 10.5 11V${yr}L${xi} ${yb}Z`, circle(8.5, 5.25, 1.75)]),
  ]
}
export const fill = ({ radius, stroke }) => escalatorFill(radius, stroke)
