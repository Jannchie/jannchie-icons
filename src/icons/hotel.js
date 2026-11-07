import { rounded } from '../geometry'
import { dot, GROUND, groundLine, opening } from '../scene'
import { hole, knock, solid } from '../solid'

// 酒店：高楼，楼顶招牌上一个 H，下面一排窗点，门居中
const body = [[6.5, GROUND, 0], [6.5, 3.5], [17.5, 3.5], [17.5, GROUND, 0]]
const sign = ['M10.5 6.5V10.5', 'M13.5 6.5V10.5', 'M10.5 8.5H13.5']
const windows = [9, 12, 15].map(x => dot(x, 13.5))

export default ({ radius }) => [
  groundLine,
  rounded(body, radius, false),
  ...sign,
  ...windows,
  rounded(opening(12, 3, 3.5), radius, false),
]

// 实心：楼身一块（底下两个角贴着地平线，不收圆角），H 和窗点挖空（窗点在尖角模式下也是圆的，粗字重下不再放大，免得点和点之间只剩细条），门挖空；地平线最后画
export const fill = ({ radius, stroke }) => [
  solid(rounded(body, radius)),
  knock([...sign, ...windows.map(w => ({ ...w, round: true, eye: true }))]),
  hole(rounded(opening(12, 3 - stroke, 3.5 - stroke / 2), Math.max(0, radius - stroke / 2), false)),
  groundLine,
]
