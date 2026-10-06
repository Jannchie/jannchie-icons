import { rounded } from '../geometry'

// 饮料杯：上宽下窄的杯身 + 杯盖 + 斜插的吸管
export default ({ radius }) => [
  rounded([[6, 8], [7.5, 21], [16.5, 21], [18, 8]], Math.min(radius, 1.5), false),
  'M5 8H19',
  rounded([[12, 8], [14, 2.5], [17, 2.5]], Math.min(radius, 0.75), false),
]
