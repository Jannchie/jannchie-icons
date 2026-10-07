import { circle, rounded } from '../geometry'

// 微单（无反）：扁平机身，左上方一个方形取景器凸起（不贴边，免得像文件夹）+ 偏右的大镜头（镜筒 + 镜片）
export default ({ radius }) => [
  rounded([[2.5, 8.5], [4.5, 8.5], [4.5, 5.5], [9.5, 5.5], [9.5, 8.5], [21.5, 8.5], [21.5, 19.5], [2.5, 19.5]], Math.min(radius, 2)),
  circle(14, 14, 3.5),
  circle(14, 14, 1.25),
]
