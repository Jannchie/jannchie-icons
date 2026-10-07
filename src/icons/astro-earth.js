import { circle } from '../geometry'

// 地球 ⊕：圆 + 内接的十字；十字左上移半格落在 .5 上，端点仍在圆上
export default ({ radius }) => [
  circle(12, 12, 8.5),
  'M11.5 3.515V20.485',
  'M3.515 11.5H20.485',
]
