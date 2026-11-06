import { circle, rounded } from '../geometry'
import { hole, knock, solid } from '../solid'

// 卡片机：扁平的长方机身（顶部没有取景器凸起）+ 右上角快门按钮 + 偏右的双圈镜头（伸缩镜筒）+ 左上角闪光灯
export default ({ radius }) => [
  rounded([[2.5, 7.5], [21.5, 7.5], [21.5, 18.5], [2.5, 18.5]], Math.min(radius, 2.5)),
  rounded([[15.5, 7.5], [15.5, 5.5], [18.5, 5.5], [18.5, 7.5]], Math.min(radius, 0.75), false),
  circle(13.5, 13, 3.75),
  circle(13.5, 13, 1.75),
  rounded([[5.5, 9.5], [8.5, 9.5], [8.5, 11.5], [5.5, 11.5]], Math.min(radius, 0.5)),
]

// 实心：机身和快门按钮一块，挖掉镜头的两圈（镜筒成一圈实心环、镜片中心留成实心），闪光灯挖成洞
export const fill = ({ radius }) => [
  solid([
    rounded([[2.5, 7.5], [21.5, 7.5], [21.5, 18.5], [2.5, 18.5]], Math.min(radius, 2.5)),
    rounded([[15.5, 7.5], [15.5, 5.5], [18.5, 5.5], [18.5, 7.5]], Math.min(radius, 0.75)),
  ]),
  knock([circle(13.5, 13, 3.75), circle(13.5, 13, 1.75)]),
  hole(rounded([[5.5, 9.5], [8.5, 9.5], [8.5, 11.5], [5.5, 11.5]], Math.min(radius, 0.5))),
]
