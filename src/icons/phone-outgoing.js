import { GAP } from '../clearance'
import { clear } from '../solid'
import { info } from '../tone'
import phone, { fill as phoneFill } from './phone'

// 去电：听筒 + 右上一支指向右上的箭头（箭杆从 (15.5, 8.5) 到 (20.5, 3.5)，箭头是直角折线，尖在 (20.5, 3.5)，横竖落在 .5 上）
export default () => [
  ...phone(),
  ...info(['M15.5 8.5L20.5 3.5', 'M16.5 3.5H20.5V7.5']),
]

// 实心：听筒填实，箭头照旧是线；箭杆停在箭头折角里面（描边版由 finalize 把箭杆缩进尖角，实心版不缩，方头会从折角外戳出一个尖）
// 符号离听筒很近，尖角粗字重下斜接的尖角会戳到听筒上：听筒在符号四周让出 GAP 的缝（按真实距离外扩，不拉出尖刺）
export const fill = () => {
  const arrow = info(['M15.5 8.5L19.75 4.25', 'M16.5 3.5H20.5V7.5'])
  return [...phoneFill(), ...clear(arrow, GAP).map(p => ({ ...p, round: true })), ...arrow]
}
