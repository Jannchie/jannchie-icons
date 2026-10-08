import { crisp, rounded } from '../geometry'

// 全部回复：两个向左的 45° 箭头前后错开 5（翼长 4.5），箭杆从后一个箭头的尖出发，往右再以半径 5.5 弯下来
// 横线 10.5、竖线 20.5 落在 .5 上；和 reply 共用同一条横杆高度和弯下来的位置
export default ({ radius }) => [
  rounded([[8, 6], [3.5, 10.5], [8, 15]], crisp(radius), false),
  rounded([[13, 6], [8.5, 10.5], [13, 15]], crisp(radius), false),
  'M8.5 10.5H15A5.5 5.5 0 0 1 20.5 16V18.5',
]
