import { ring } from '../marks'
import { rounded } from '../geometry'

// PS 面键 △：圆圈 + 尖朝上的正三角（重心约在圆心，底边落在 14.5）
export default ({ radius }) => [
  ring(),
  rounded([[12, 7.15], [16.25, 14.5], [7.75, 14.5]], Math.min(radius, 1)),
]
