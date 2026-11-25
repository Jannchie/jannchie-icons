import { circle, rounded } from '../geometry'
import { solid } from '../solid'
import { mirror } from '../transform'

// 蜘蛛：俯视。小圆头（圆心 (12, 8.5)、半径 2）+ 大圆肚子（圆心 (12, 14)、半径 3.5）；每边四条折一下的长腿（先往外，再折向下 / 向上）
const head = circle(12, 8.5, 2)
const abdomen = circle(12, 14, 3.5)
const LEFT = [
  [[10.25, 7.5], [7, 5], [4.5, 6.5]],
  [[9.25, 11], [5.5, 9.5], [3, 11.5]],
  [[8.5, 14], [5.5, 15], [3.5, 18]],
  [[9.5, 16.5], [7.5, 18.5], [6.5, 21]],
]
const legs = radius => LEFT.flatMap((pts) => {
  const d = rounded(pts, Math.min(radius, 0.75), false)
  return [d, mirror(d)]
})

export default ({ radius }) => [head, abdomen, ...legs(radius)]

// 实心：头和肚子填实；腿照旧是线
export const fill = ({ radius }) => [solid([head, abdomen]), ...legs(radius)]
