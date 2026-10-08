import { circle } from '../geometry'
import { eye } from '../scene'
import { success } from '../tone'

// 添加表情（回应）：smile 缩小一圈往左下挪（圆心 (11, 13)、半径 8，眼睛、嘴的相对位置照 smile 按比例缩）+ 右上一个加号（中心 (18.5, 5.5)，臂长 2.5，横竖线落在 .5 上）
// 加号作为 cut，脸的右上在它附近断开（读成「给表情加一个」）
const [cx, cy] = [11, 13]

export default () => [
  circle(cx, cy, 8),
  eye(cx - 2.75, cy - 2),
  eye(cx + 2.75, cy - 2),
  `M${cx - 3.25} ${cy + 2}A3.5 3.5 0 0 0 ${cx + 3.25} ${cy + 2}`,
  ...success([{ d: 'M18.5 3V8', cut: true }, { d: 'M16 5.5H21', cut: true }]),
]
