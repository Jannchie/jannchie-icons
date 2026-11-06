import { circle } from '../geometry'
import { solid } from '../solid'

// 轮椅：头 + 身体（坐姿折线到脚）+ 扶手 + 一段开口的大轮
export default ({ radius }) => [
  circle(9.5, 4.5, 1.75),
  'M9.5 8V13.5H15.5L17.5 18.5H19.5',
  'M9.5 10.5H14',
  'M6.99 12.51A5 5 0 1 0 14.33 19',
]

// 实心：头是实心圆，身体、扶手、大轮照旧是线
export const fill = () => [
  solid(circle(9.5, 4.5, 1.75)),
  'M9.5 8V13.5H15.5L17.5 18.5H19.5',
  'M9.5 10.5H14',
  'M6.99 12.51A5 5 0 1 0 14.33 19',
]
