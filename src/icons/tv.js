import { rounded } from '../geometry'

// 电视：宽屏 + 顶部 45° V 形天线；外框 2.5–21.5 × 4–20
export default ({ radius }) => [
  rounded([[2.5, 7.5], [21.5, 7.5], [21.5, 20], [2.5, 20]], Math.min(radius, 2.5)),
  'M8.5 4L12 7.5L15.5 4',
]
