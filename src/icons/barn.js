import { crisp, rounded } from '../geometry'
import { dot, GROUND, groundLine } from '../scene'

// 谷仓：折线形（复折式）屋顶，草料窗一个点，大门带 X 形斜撑；屋顶折角不随全局圆角，门框保持直角好让斜撑顶进角里
export default ({ radius }) => [
  groundLine,
  rounded([[5.5, GROUND], [5.5, 10.5, crisp(radius)], [7.5, 6.5, crisp(radius)], [12, 4.5], [16.5, 6.5, crisp(radius)], [18.5, 10.5, crisp(radius)], [18.5, GROUND]], radius, false),
  dot(12, 8.5),
  rounded([[9.5, GROUND], [9.5, 12.5], [14.5, 12.5], [14.5, GROUND]], 0, false),
  { d: 'M9.5 12.5L14.5 20.5M14.5 12.5L9.5 20.5', thin: true },
]
