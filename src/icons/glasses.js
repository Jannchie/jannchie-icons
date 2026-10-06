import { circle } from '../geometry'

// 眼镜（圆框）：两个圆镜片 + 鼻梁弧 + 两侧往后上方收的镜腿
export default ({ radius }) => [
  circle(6.5, 14, 3.5),
  circle(17.5, 14, 3.5),
  'M10 14A2.1 2.1 0 0 1 14 14',
  'M3 14L4.5 9',
  'M21 14L19.5 9',
]
