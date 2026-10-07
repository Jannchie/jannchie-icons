import { crisp, rounded } from '../geometry'

// 缩放 / 分辨率：外框 + 左下角小框 + 指向右上的 45° 箭头
export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 2.5)),
  rounded([[3.5, 13.5], [10.5, 13.5], [10.5, 20.5]], Math.min(radius, 1), false),
  'M13.5 10.5L17.5 6.5',
  rounded([[14.5, 6.5], [17.5, 6.5], [17.5, 9.5]], crisp(radius), false),
]
