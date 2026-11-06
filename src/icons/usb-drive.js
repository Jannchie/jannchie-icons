import { rounded } from '../geometry'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// U 盘：机身 + 顶上的金属插头 + 插头上两个方孔
export default ({ radius }) => [
  rounded([[6.5, 9.5], [17.5, 9.5], [17.5, 21.5], [6.5, 21.5]], Math.min(radius, 2)),
  rounded([[8.5, 9.5], [8.5, 2.5], [15.5, 2.5], [15.5, 9.5]], Math.min(radius, 0.75), false),
  dot(10.75, 6, 1.75),
  dot(13.25, 6, 1.75),
]

// 实心：机身和金属插头连成一块，挖掉插头上的两个方孔
export const fill = ({ radius }) => [
  solid(rounded([[6.5, 9.5], [17.5, 9.5], [17.5, 21.5], [6.5, 21.5]], Math.min(radius, 2))),
  solid(rounded([[8.5, 9.5], [8.5, 2.5], [15.5, 2.5], [15.5, 9.5]], Math.min(radius, 0.75))),
  knock([dot(10.75, 6, 1.75), dot(13.25, 6, 1.75)]),
]
