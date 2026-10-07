import { crisp, rounded } from '../geometry'

// 行高：右边三行文字线（5.5 / 12.5 / 19.5），左边一根上下双向箭头量出行距
export default ({ radius }) => [
  'M4.5 5.5V19.5',
  rounded([[2.5, 7.5], [4.5, 5.5], [6.5, 7.5]], crisp(radius), false),
  rounded([[2.5, 17.5], [4.5, 19.5], [6.5, 17.5]], crisp(radius), false),
  'M9.5 5.5H20.5',
  'M9.5 12.5H20.5',
  'M9.5 19.5H20.5',
]
