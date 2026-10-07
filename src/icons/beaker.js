import { rounded } from '../geometry'

// 烧杯：左上的倒嘴 + 圆角直筒杯身 + 右侧三道刻度
export default ({ radius }) => [
  rounded([[4, 3.5], [5.5, 3.5], [5.5, 20.5], [18.5, 20.5], [18.5, 3.5]], Math.min(radius, 1.5), false),
  'M14.5 8.5H18.5',
  'M16 12.5H18.5',
  'M14.5 16.5H18.5',
]
