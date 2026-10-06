import { circle, crisp, rounded } from '../geometry'

// 跨性别 ⚧：圆 + 下方十字 + 右上箭头 + 左上带横杠的箭头
export default ({ radius }) => [
  circle(12, 13, 3.5),
  'M12 16.5V21.5',
  'M10 19.5H14',
  'M14.5 10.5L19.5 5.5',
  rounded([[15.5, 5.5], [19.5, 5.5], [19.5, 9.5]], crisp(radius), false),
  'M9.5 10.5L4.5 5.5',
  rounded([[4.5, 9.5], [4.5, 5.5], [8.5, 5.5]], crisp(radius), false),
  'M6.75 10.25L9.25 7.75',
]
