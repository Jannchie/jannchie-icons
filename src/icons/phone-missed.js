import { GAP } from '../clearance'
import { clear } from '../solid'
import { danger } from '../tone'
import phone, { fill as phoneFill } from './phone'

// 未接来电：听筒 + 右上一个叉（15–20 × 4–9，同一条路径里交叉）
export default () => [
  ...phone(),
  ...danger(['M15 4L20 9M20 4L15 9']),
]

// 实心：听筒填实，叉照旧是线
// 符号离听筒很近，尖角粗字重下斜接的尖角会戳到听筒上：听筒在符号四周让出 GAP 的缝（按真实距离外扩，不拉出尖刺）
export const fill = () => {
  const cross = danger(['M15 4L20 9M20 4L15 9'])
  return [...phoneFill(), ...clear(cross, GAP).map(p => ({ ...p, round: true })), ...cross]
}
