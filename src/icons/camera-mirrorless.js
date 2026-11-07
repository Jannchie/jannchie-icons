import { circle, rounded } from '../geometry'
import { cutout, knock, solid } from '../solid'

// 微单（无反）：扁平机身，左上方一个方形取景器凸起（不贴边，免得像文件夹）+ 偏右的大镜头（镜筒 + 镜片）
export default ({ radius }) => [
  rounded([[2.5, 8.5], [4.5, 8.5], [4.5, 5.5], [9.5, 5.5], [9.5, 8.5], [21.5, 8.5], [21.5, 19.5], [2.5, 19.5]], Math.min(radius, 2)),
  circle(14, 14, 3.5),
  circle(14, 14, 1.25),
]

// 实心：机身一块，挖掉镜头外圈（镜筒成一块实心圆），镜片按内圈的中心线原样挖成圆洞
// （两圈都挖时中间的实心环只剩 2.25 − 线宽，粗字重下只剩针眼大的镜片）
export const fill = ({ radius }) => [
  solid(rounded([[2.5, 8.5], [4.5, 8.5], [4.5, 5.5], [9.5, 5.5], [9.5, 8.5], [21.5, 8.5], [21.5, 19.5], [2.5, 19.5]], Math.min(radius, 2))),
  knock(circle(14, 14, 3.5)),
  cutout(circle(14, 14, 1.25)),
]
