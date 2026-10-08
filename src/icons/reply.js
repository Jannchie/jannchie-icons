import { crisp, rounded } from '../geometry'

// 回复：向左的 45° 箭头（翼长 5，同 undo）+ 箭杆往右、再以半径 6 的圆弧弯下来
// 箭杆横线 10.5、弯下来的竖线 20.5 都落在 .5 上；整体 4–20.5 × 5.5–18.5 居中
export default ({ radius }) => [
  rounded([[9, 5.5], [4, 10.5], [9, 15.5]], crisp(radius), false),
  'M4 10.5H14.5A6 6 0 0 1 20.5 16.5V18.5',
]
