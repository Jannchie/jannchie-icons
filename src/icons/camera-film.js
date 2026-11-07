import { circle, rounded } from '../geometry'
import { cutout, knock, solid } from '../solid'

// 胶片机：平顶机身 + 顶上左侧的倒片钮（小方块）、右侧的过片扳手（竖起再斜着伸出）+ 镜头；
// 机身正面右上角一个测距窗（小方框）
export default ({ radius }) => [
  rounded([[2.5, 8.5], [21.5, 8.5], [21.5, 19.5], [2.5, 19.5]], Math.min(radius, 2.5)),
  rounded([[4.5, 8.5], [4.5, 6.5], [7.5, 6.5], [7.5, 8.5]], Math.min(radius, 0.5), false),
  rounded([[16.5, 8.5], [16.5, 6.5], [20.5, 5]], Math.min(radius, 0.5), false),
  circle(10.5, 14, 3.5),
  rounded([[16.5, 10.5], [19.5, 10.5], [19.5, 12.5], [16.5, 12.5]], Math.min(radius, 0.5)),
]

// 实心：机身和倒片钮一块，挖掉镜头圆圈（镜片留成实心圆），测距窗按中心线原样挖成洞（外扩半个线宽的话粗字重下贴到镜头的缝）；
// 过片扳手照旧是线
export const fill = ({ radius }) => [
  solid([
    rounded([[2.5, 8.5], [21.5, 8.5], [21.5, 19.5], [2.5, 19.5]], Math.min(radius, 2.5)),
    rounded([[4.5, 8.5], [4.5, 6.5], [7.5, 6.5], [7.5, 8.5]], Math.min(radius, 0.5)),
  ]),
  knock(circle(10.5, 14, 3.5)),
  cutout(rounded([[16.5, 10.5], [19.5, 10.5], [19.5, 12.5], [16.5, 12.5]], Math.min(radius, 0.5))),
  rounded([[16.5, 8.5], [16.5, 6.5], [20.5, 5]], Math.min(radius, 0.5), false),
]
