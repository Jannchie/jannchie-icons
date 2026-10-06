import { circle } from '../geometry'

// 轮椅：头 + 身体（坐姿折线到脚）+ 扶手 + 一段开口的大轮
export default ({ radius }) => [
  circle(10, 4.5, 1.75),
  'M10 8V13H15.5L17.5 18.5H19.5',
  'M10 10.5H14',
  'M6.99 12.51A5 5 0 1 0 14.33 19',
]
