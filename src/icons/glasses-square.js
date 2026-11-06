import { rounded } from '../geometry'
import { solid } from '../solid'

// 眼镜（方框）：两个圆角方镜片（y 8.5–15.5）+ 鼻梁；墨迹上下居中
export default ({ radius }) => [
  rounded([[2.5, 8.5], [9.5, 8.5], [9.5, 15.5], [2.5, 15.5]], Math.min(radius, 2)),
  rounded([[14.5, 8.5], [21.5, 8.5], [21.5, 15.5], [14.5, 15.5]], Math.min(radius, 2)),
  'M9.5 11C11 10 13 10 14.5 11',
]

// 实心：两片镜片填实；鼻梁照旧是线
export const fill = ({ radius }) => [
  solid([
    rounded([[2.5, 8.5], [9.5, 8.5], [9.5, 15.5], [2.5, 15.5]], Math.min(radius, 2)),
    rounded([[14.5, 8.5], [21.5, 8.5], [21.5, 15.5], [14.5, 15.5]], Math.min(radius, 2)),
  ]),
  'M9.5 11C11 10 13 10 14.5 11',
]
