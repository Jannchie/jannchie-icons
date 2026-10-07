import { rounded } from '../geometry'
import { dot } from '../scene'

// 路由器：扁机箱（3.5–20.5 × 12.5–19.5）+ 顶上两根天线（7.5 / 16.5，竖直接在机箱顶边上）+ 面板上两个指示灯
export default ({ radius }) => [
  rounded([[3.5, 12.5], [20.5, 12.5], [20.5, 19.5], [3.5, 19.5]], Math.min(radius, 2)),
  'M7.5 12.5V5.5',
  'M16.5 12.5V5.5',
  dot(7.5, 16),
  dot(11, 16),
]
