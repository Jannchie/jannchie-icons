import { rounded } from '../geometry'
import { dot } from '../scene'
import { solid } from '../solid'

// 组合图：底线 + 三根空心方柱（宽 3、间距 3，柱边都在 .5 上）+ 上方一条带节点的折线
const bars = [[4.5, 14.5], [10.5, 12.5], [16.5, 15.5]]
const column = ([x, top], radius, closed) => rounded([[x, 20.5], [x, top], [x + 3, top], [x + 3, 20.5]], Math.min(radius, 1), closed)
const line = ['M6 8.5L12 5L18 7.5', dot(6, 8.5), dot(12, 5), dot(18, 7.5)]

export default ({ radius }) => [
  'M3 20.5H21',
  ...bars.map(b => column(b, radius, false)),
  ...line,
]

// 实心：三根柱填实（柱底和底线连成一体，同 chart-column），底线、折线和节点照旧是线
export const fill = ({ radius }) => [
  'M3 20.5H21',
  ...bars.map(b => solid(column(b, radius, true))),
  ...line,
]
