import { rounded } from '../geometry'

// 烧杯：左上的倒嘴 + 圆角直筒杯身 + 右侧三道刻度
export default ({ radius }) => [
  rounded([[4.5, 3.5], [6, 3.5], [6, 20.5], [18, 20.5], [18, 3.5]], Math.min(radius, 1.5), false),
  'M14 9H18',
  'M15.5 12.5H18',
  'M14 16H18',
]
