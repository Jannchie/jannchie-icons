import { crisp, rounded } from '../geometry'
import { dot } from '../scene'

// 高尔夫：果岭上的旗杆——竖直的旗杆 + 杆顶向右飘的三角旗 + 杆脚下椭圆形的果岭（球洞）+ 旁边一颗球
export default ({ radius }) => [
  'M9.5 19V3',
  rounded([[9.5, 3], [17.5, 6.25], [9.5, 9.5]], crisp(radius), false),
  'M3 19C3 17.6 6.5 16.5 10.5 16.5C14.5 16.5 18 17.6 18 19C18 20.4 14.5 21.5 10.5 21.5C6.5 21.5 3 20.4 3 19Z',
  dot(19.75, 15.5, 2.75),
]
