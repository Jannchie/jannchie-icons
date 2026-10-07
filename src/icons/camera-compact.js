import { circle, rounded } from '../geometry'

// 卡片机：扁平的长方机身（顶部没有取景器凸起）+ 右上角快门按钮 + 偏右的双圈镜头（伸缩镜筒）+ 左上角闪光灯
export default ({ radius }) => [
  rounded([[2.5, 7.5], [21.5, 7.5], [21.5, 18.5], [2.5, 18.5]], Math.min(radius, 2.5)),
  rounded([[15.5, 7.5], [15.5, 5.5], [18.5, 5.5], [18.5, 7.5]], Math.min(radius, 0.75), false),
  circle(13.5, 13, 3.75),
  circle(13.5, 13, 1.75),
  rounded([[5.5, 9.5], [8.5, 9.5], [8.5, 11.5], [5.5, 11.5]], Math.min(radius, 0.5)),
]
