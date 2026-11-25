import { GAP } from '../clearance'
import { circle } from '../geometry'
import { clear, hole, knock, solid } from '../solid'

// 卷纸：左上一卷（侧面的圆，圆心 (9, 9.5)、半径 6）+ 正中的纸芯（半径 2）+ 从卷顶往右拉出来、垂下去的一截纸（13.5–19.5，垂到 20.5）：
// 纸的上沿和卷顶相切，左边那条边往上落在卷的圆上；纸上一道撕线（17.5，细节线）
const roll = circle(9, 9.5, 6)
const core = circle(9, 9.5, 2)
const sheet = 'M9 3.5H17.5A2 2 0 0 1 19.5 5.5V20.5H13.5V13.5'
const tear = { d: 'M13.5 17.5H19.5', detail: true }

export default () => [roll, core, sheet, tear]

// 实心：垂下来的纸一块（撕线整条挖穿，分成两截）；卷在前，纸在卷四周让出缝；纸芯挖成洞
export const fill = ({ stroke }) => [
  solid('M9 3.5H17.5A2 2 0 0 1 19.5 5.5V20.5H13.5V9.5H9Z'),
  knock({ d: 'M11.5 17.5H21.5', detail: true }),
  clear(roll, GAP),
  solid(roll),
  hole(circle(9, 9.5, 2 - stroke / 2)),
]
