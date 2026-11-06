import { danger } from '../tone'
import phone, { fill as phoneFill } from './phone'

// 未接来电：听筒 + 右上一个叉（15–20 × 4–9，同一条路径里交叉）
export default () => [
  ...phone(),
  ...danger(['M15 4L20 9M20 4L15 9']),
]

// 实心：听筒填实，叉照旧是线
export const fill = () => [...phoneFill(), ...danger(['M15 4L20 9M20 4L15 9'])]
