import { GAP } from '../clearance'
import { crisp, rounded } from '../geometry'
import { dot } from '../scene'
import { clear, solid } from '../solid'

// 高尔夫：果岭上的旗杆——竖直的旗杆 + 杆顶向右飘的三角旗 + 杆脚下椭圆形的果岭（球洞）+ 旁边一颗球
export default ({ radius }) => [
  'M9.5 19V3',
  rounded([[9.5, 3], [17.5, 6.25], [9.5, 9.5]], crisp(radius), false),
  'M3 19C3 17.6 6.5 16.5 10.5 16.5C14.5 16.5 18 17.6 18 19C18 20.4 14.5 21.5 10.5 21.5C6.5 21.5 3 20.4 3 19Z',
  dot(19.75, 15.5, 2.75),
]

// 实心：旗子、果岭各一块；旗杆照旧是线，插进果岭的那截四周让出缝（像插在球洞里）；球是圆点，尖角模式下也不变方
export const fill = ({ radius }) => [
  solid('M3 19C3 17.6 6.5 16.5 10.5 16.5C14.5 16.5 18 17.6 18 19C18 20.4 14.5 21.5 10.5 21.5C6.5 21.5 3 20.4 3 19Z'),
  clear('M9.5 19V3', GAP),
  'M9.5 19V3',
  // 贴着旗杆的两个角给 0.5 的小圆角：尖角模式下这两个锐角斜接出去会比旗杆的方头还高
  solid(rounded([[9.5, 3, 0.5], [17.5, 6.25], [9.5, 9.5, 0.5]], crisp(radius))),
  { ...dot(19.75, 15.5, 2.75), round: true },
]
