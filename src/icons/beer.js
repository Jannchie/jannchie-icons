import { rounded } from '../geometry'
import { knock, stacked } from '../solid'

// 啤酒：杯身 + 杯口横线 + 把手 + 顶上的泡沫 + 杯身两道反光
const foam = 'M3.5 6.5A2.75 2.75 0 0 1 7.75 3.5A2.75 2.75 0 0 1 12.5 3.5A2.75 2.75 0 0 1 15.5 6.5'
const mug = [[3.5, 6.5], [3.5, 20.5], [15.5, 20.5], [15.5, 6.5]]
const handle = 'M15.5 10.5H18.5A2 2 0 0 1 20.5 12.5V14.5A2 2 0 0 1 18.5 16.5H15.5'
const shine = ['M7.5 11V17.5', 'M11.5 11V17.5']

export default ({ radius }) => [
  foam,
  rounded(mug, Math.min(radius, 1.5), false),
  'M3.5 6.5H15.5',
  handle,
  ...shine,
]

// 实心：泡沫沿杯口封口成完整的一块在前，杯身在后、沿泡沫让出 GAP 的缝（杯口那条线就是这道缝）；
// 杯身两道反光挖空，把手照旧是线
export const fill = ({ radius }) => [
  ...stacked(rounded([[3.5, 6.5, 0], ...mug.slice(1, -1), [15.5, 6.5, 0]], Math.min(radius, 1.5)), `${foam}Z`),
  knock(shine),
  handle,
]
