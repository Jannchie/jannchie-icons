// 购物车共用：把手 + 车筐（左边斜、右边斜，45° 以内）+ 两个轮子；车筐中心放符号
import { circle, rounded } from './geometry'
import { solid } from './solid'

export const cart = radius => [
  // 车筐上沿在 7.5、底边在 15.5（都在 .5 上）
  rounded([[2.5, 3.5], [5, 3.5], [7.5, 15.5], [18.5, 15.5], [20.5, 7.5], [5.85, 7.5]], Math.min(radius, 1.5), false),
  circle(9, 19.5, 1.5),
  circle(17, 19.5, 1.5),
]
// 车筐中心
// 车筐中心（符号的竖笔落在 13.5、横笔落在 11.5 上）
export const basketCenter = [13.5, 11.5]

// 实心版（见 solid.js 的 plainFill / centerFill）：车筐封口填实（上沿左端接在把手的斜线上，那个角不圆），轮子是实心圆；
// 把手（横段 + 车筐左边往上伸出的一截）照旧是线，最后画
export const fillParts = (radius) => {
  const r = Math.min(radius, 1.5)
  return {
    body: [
      solid(rounded([[5.85, 7.5, 0], [20.5, 7.5], [18.5, 15.5], [7.5, 15.5]], r)),
      solid([circle(9, 19.5, 1.5), circle(17, 19.5, 1.5)]),
    ],
    lines: [rounded([[2.5, 3.5], [5, 3.5], [5.85, 7.5]], r, false)],
  }
}
