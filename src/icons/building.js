import { rounded } from '../geometry'
import { dot, GROUND, groundLine, opening } from '../scene'
import { hole, knock, solid } from '../solid'

// 办公楼：窄高平顶，两列窗点
const body = [[6.5, GROUND, 0], [6.5, 4.5], [17.5, 4.5], [17.5, GROUND, 0]]
const windows = [7.5, 10.5, 13.5].flatMap(y => [dot(10, y), dot(14, y)])

export default ({ radius }) => [
  groundLine,
  rounded(body, radius, false),
  ...windows,
  rounded(opening(12, 3, 3.5), radius, false),
]

// 实心：楼身一块（底下两个角贴着地平线，不收圆角），窗点挖成圆点（尖角模式下也是圆的；粗字重下不再放大，免得点和点之间只剩细条），门挖空；地平线最后画
export const fill = ({ radius, stroke }) => [
  solid(rounded(body, radius)),
  knock(windows.map(w => ({ ...w, round: true, eye: true }))),
  hole(rounded(opening(12, 3 - stroke, 3.5 - stroke / 2), Math.max(0, radius - stroke / 2), false)),
  groundLine,
]
