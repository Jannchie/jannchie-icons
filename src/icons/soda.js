import { rounded } from '../geometry'

// 饮料杯：上宽下窄的杯身 + 杯盖 + 斜插的吸管
export default ({ radius }) => [
  rounded([[6, 8.5], [7.5, 20.5], [16.5, 20.5], [18, 8.5]], Math.min(radius, 1.5), false),
  'M5 8.5H19',
  rounded([[12, 8.5], [14, 2.5], [17, 2.5]], Math.min(radius, 0.75), false),
]
