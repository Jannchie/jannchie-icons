// 购物车共用：把手 + 车筐（左边斜、右边斜，45° 以内）+ 两个轮子；车筐中心放符号
import { circle, rounded } from './geometry'

export const cart = radius => [
  rounded([[2.5, 3.5], [5, 3.5], [7.5, 15.5], [18.5, 15.5], [20.5, 7], [5.8, 7]], Math.min(radius, 1.5), false),
  circle(9, 19.5, 1.5),
  circle(17, 19.5, 1.5),
]
// 车筐中心
export const basketCenter = [13, 11.25]
