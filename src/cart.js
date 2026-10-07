// 购物车共用：把手 + 车筐（左边斜、右边斜，45° 以内）+ 两个轮子；车筐中心放符号
import { circle, rounded } from './geometry'

export const cart = radius => [
  // 车筐上沿在 7.5、底边在 15.5（都在 .5 上）
  rounded([[2.5, 3.5], [5, 3.5], [7.5, 15.5], [18.5, 15.5], [20.5, 7.5], [5.85, 7.5]], Math.min(radius, 1.5), false),
  circle(9, 19.5, 1.5),
  circle(17, 19.5, 1.5),
]
// 车筐中心
// 车筐中心（符号的竖笔落在 13.5、横笔落在 11.5 上）
export const basketCenter = [13.5, 11.5]
