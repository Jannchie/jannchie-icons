import { circle, rounded } from '../geometry'

// 拍立得：方正的高机身 + 居中的大镜头 + 左上闪光灯；底部出片口吐出半张相纸（相纸下边落在画布底部）
export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 16.5], [3.5, 16.5]], Math.min(radius, 2.5)),
  circle(12, 10.5, 3.5),
  rounded([[5.5, 5.5], [7.5, 5.5], [7.5, 7.5], [5.5, 7.5]], Math.min(radius, 0.5)),
  rounded([[6.5, 16.5], [6.5, 20.5], [17.5, 20.5], [17.5, 16.5]], Math.min(radius, 1), false),
]
