import { crisp, rounded } from '../geometry'

// 行高：右边三行文字线（5 / 12 / 19），左边一根上下双向箭头量出行距
export default ({ radius }) => [
  'M4.5 5V19',
  rounded([[2.5, 7], [4.5, 5], [6.5, 7]], crisp(radius), false),
  rounded([[2.5, 17], [4.5, 19], [6.5, 17]], crisp(radius), false),
  'M9.5 5H20.5',
  'M9.5 12H20.5',
  'M9.5 19H20.5',
]
