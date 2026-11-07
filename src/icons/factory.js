import { crisp, rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'
import { hole, solid } from '../solid'

// 工厂：两段 30° 锯齿屋顶，门居中；锯齿的角不随全局圆角
// 左右墙和中间那道竖边都要落在 .5 上：宽 14、中线 12.5
const left = 5.5
const right = 19.5
const mid = (left + right) / 2
const low = 9 // 屋顶最高处约 5，和其他建筑同高
const high = low - (mid - left) * Math.tan(Math.PI / 6)
const body = radius => [
  [left, GROUND, 0],
  [left, low],
  [mid, high, crisp(radius)],
  [mid, low, crisp(radius)],
  [right, high, crisp(radius)],
  [right, GROUND, 0],
]

export default ({ radius }) => [
  groundLine,
  rounded(body(radius), radius, false),
  rounded(opening(mid, 4, 5.5), radius, false),
]

// 实心：厂房一块（底下两个角贴着地平线，不收圆角），门挖空（洞外扩半个线宽后是门框的中心线）；地平线最后画
export const fill = ({ radius, stroke }) => [
  solid(rounded(body(radius), radius)),
  hole(rounded(opening(mid, 4 - stroke, 5.5 - stroke / 2), Math.max(0, radius - stroke / 2), false)),
  groundLine,
]
