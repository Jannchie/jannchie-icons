import { oval, rounded } from '../geometry'
import { knock, solid } from '../solid'
import { rotate, translate } from '../transform'

// 武士刀：竖着画（刀尖朝上）再逆时针转 45°，刀尖朝左上，和 sword、dagger 同一个朝向。
// 细长的单刃刀身（宽 2.5，10.75–13.25）往刀背一侧弯（刃在左、外凸，刀尖往右挑到 (14, 1.25)）；
// 护手是一枚圆形的锷，侧着看是一只扁椭圆（实心，半径 3 × 1）；长刀柄（10.75–13.25 × 18.5–23.75，和锷之间留一道缝）上两组交叉的缠绳（细线）。
// 弯刀身 + 圆锷 + 长柄缠绳是记号：sword 是直刀身、十字护手、短柄加圆剑首
// 转过以后刀尖挑在左上、整体偏右，往左挪 1.25 居中
const tilt = d => translate(rotate(d, -45), -1.25, 0)
const blade = 'M10.75 15.5V9.5C10.75 6 11.75 3.5 14 1.25C13.5 3.75 13.25 6 13.25 9.5V15.5Z'
const guard = oval(12, 16.5, 3, 1)
const grip = radius => rounded([[10.75, 18.5], [13.25, 18.5], [13.25, 23.75], [10.75, 23.75]], Math.min(radius, 0.5))
const wrap = 'M10.75 19.5L13.25 21.25M10.75 21.25L13.25 19.5M10.75 21.25L13.25 23M10.75 23L13.25 21.25'

export default ({ radius }) => [
  tilt(blade),
  { d: tilt(guard), fill: true },
  tilt(grip(radius)),
  { d: tilt(wrap), detail: true },
]

// 实心：刀身、锷、刀柄各一块；缠绳从刀柄上挖出交叉的细缝
export const fill = ({ radius }) => [
  solid(tilt(blade)),
  solid(tilt(guard)),
  solid(tilt(grip(radius))),
  knock({ d: tilt(wrap), detail: true }),
]
