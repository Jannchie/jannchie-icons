import { circle, crisp, rounded } from '../geometry'

// 跨性别 ⚧：圆 + 下方十字 + 右上箭头 + 左上带横杠的箭头
export default ({ radius }) => [
  // 圆心在 (12, 12.5)：竖线在 12，两个箭头的竖边在 5 / 19、横边在 5.5 上
  circle(12, 12.5, 3.5),
  'M12 16V21.5',
  'M10 19.5H14',
  'M14.5 10L19 5.5',
  rounded([[15, 5.5], [19, 5.5], [19, 9.5]], crisp(radius), false),
  'M9.5 10L5 5.5',
  rounded([[5, 9.5], [5, 5.5], [9, 5.5]], crisp(radius), false),
  'M6.75 9.75L9.25 7.25',
]
