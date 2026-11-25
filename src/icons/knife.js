import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { cutout, solid } from '../solid'
import { rotate, translate } from '../transform'

// 厨刀（主厨刀）：刀尖朝左上、刀柄在右下的斜 45°。先横着画再顺时针转 45°：刀背是一条直线，刀刃从刀尖鼓着肚子弯到刀跟；
// 刀柄比刀身窄，顶边和刀背平齐，尾端圆角
// 横着画时：刀尖 (1.5, 10) → 刀跟 x = 14，刀身最宽 6；刀柄 14–23 × 10–13.5
// 转完以后墨迹偏右，整体往左挪 1.5 居中
const place = d => translate(rotate(d, 45), -1.5, 0)
const blade = place('M14 10H1.5C3.5 13.75 8 16 14 16Z')
const grip = radius => place(rounded([[14, 10, 0], [23, 10], [23, 13.5], [14, 13.5, 0]], Math.min(radius, 1.5)))

export default ({ radius }) => [blade, grip(radius)]

// 实心：刀身、刀柄各一块，本来共用刀跟这条边：沿这条边挖开一道 GAP 宽、两头都穿出轮廓的直缝
export const fill = ({ radius }) => [
  solid([blade, grip(radius)]),
  cutout(place(`M${14 - GAP / 2} 0H${14 + GAP / 2}V24H${14 - GAP / 2}Z`)),
]
