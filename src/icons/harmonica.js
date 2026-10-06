import { rounded } from '../geometry'

// 口琴（半音阶）：长方琴身 + 上方盖板线 + 一排吹孔 + 右侧推键
export default ({ radius }) => [
  rounded([[2.5, 8], [20, 8], [20, 16], [2.5, 16]], Math.min(radius, 1.5)),
  'M2.5 11.5H20',
  'M5 13.75h0',
  'M7.5 13.75h0',
  'M10 13.75h0',
  'M12.5 13.75h0',
  'M15 13.75h0',
  'M17.5 13.75h0',
  'M20 12H21.75',
]
