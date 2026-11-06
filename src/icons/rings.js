import { circle, crisp, rounded } from '../geometry'
import { solid } from '../solid'

// 婚戒：两枚套在一起的戒指（半径 5，圆心相距 6），左边那枚顶上镶一颗钻（五边形，底尖正好落在戒圈顶上）
export default ({ radius }) => [
  circle(9, 14.5, 5),
  circle(15, 14.5, 5),
  rounded([[9, 9.5], [6.5, 7], [7.75, 5.5], [10.25, 5.5], [11.5, 7]], crisp(radius)),
]

// 实心：钻石填实；两枚戒圈本来就是线，照旧
export const fill = ({ radius }) => [
  circle(9, 14.5, 5),
  circle(15, 14.5, 5),
  solid(rounded([[9, 9.5], [6.5, 7], [7.75, 5.5], [10.25, 5.5], [11.5, 7]], crisp(radius))),
]
