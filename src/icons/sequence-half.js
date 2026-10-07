import { crisp, rounded } from '../geometry'

// 顺序播放（半箭头）：同 sequence 的三行列表，右边的向下箭头只留朝里（左）的一侧箭羽，杆和箭羽是一条折线
// 箭羽 45° 长 4：从 (19.5, 19.5) 收到 (15.5, 15.5)，离最后一行（止于 10.5）够远
export default ({ radius }) => [
  'M3.5 5.5H14.5',
  'M3.5 11.5H14.5',
  'M3.5 17.5H10.5',
  rounded([[19.5, 4.5], [19.5, 19.5], [15.5, 15.5]], crisp(radius), false),
]
