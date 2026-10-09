import { crisp, rounded } from '../geometry'

// 行高：右边三行文字线（5 / 12 / 19，横向 10–21），左边一根上下双向箭头（轴 5、箭头 3–7）量出行距；整体左右居中
export default ({ radius }) => [
  'M5 5V19',
  rounded([[3, 7], [5, 5], [7, 7]], crisp(radius), false),
  rounded([[3, 17], [5, 19], [7, 17]], crisp(radius), false),
  'M10 5H21',
  'M10 12H21',
  'M10 19H21',
]
