import { rounded } from '../geometry'
import { solid } from '../solid'

// 分享（箭头）：向右的空心粗箭头，箭头两翼 45°，箭杆从左下弯上来
// 箭头部分是折线（跟随圆角），箭杆上下两条边用曲线，下边比上边弯得更低，像从左下甩上来
const head = radius => rounded([[13.5, 9.5], [13.5, 5], [20.5, 12], [13.5, 19], [13.5, 14.5]], Math.min(radius, 1.5), false)
const shaft = 'M13.5 9.5C8 9.5 4 13 4 19.5C6 16 9.5 14.5 13.5 14.5'

export default ({ radius }) => [
  head(radius),
  shaft,
]

// 实心：箭头和箭杆围成的整块填实（箭杆反着接在箭头末端，闭合成一条路径）
export const fill = ({ radius }) => [
  solid(`${head(radius)}C9.5 14.5 6 16 4 19.5C4 13 8 9.5 13.5 9.5Z`),
]
