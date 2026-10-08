import { rounded } from '../geometry'
import { rotate } from '../transform'

// 吸管（取色）：先竖直画——顶上半圆的胶头（宽 4）、一道宽 9 的卡箍、往下收成细管、尖头 ——再顺时针转 45°，尖朝左下
// 竖直时：胶头 10–14 × 3–8，卡箍 y = 8（7.5–16.5），细管 10.5–13.5 往下到 17.5，再收到尖 (12, 21)
export default ({ radius }) => [
  'M10 8V5A2 2 0 0 1 14 5V8',
  'M7.5 8H16.5',
  rounded([[10.5, 8], [10.5, 17.5], [12, 21], [13.5, 17.5], [13.5, 8]], Math.min(radius, 1), false),
].map(d => rotate(d, 45))
