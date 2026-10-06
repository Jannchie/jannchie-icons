import { ring } from '../marks'
import { rounded } from '../geometry'

// PS 面键 △：圆圈 + 尖朝上的正三角（重心放在圆心）
export default ({ radius }) => [
  ring(),
  rounded([[12, 7.6], [16.25, 14.95], [7.75, 14.95]], Math.min(radius, 1)),
]
