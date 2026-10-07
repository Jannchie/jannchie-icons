import { danger } from '../tone'
import phone from './phone'

// 未接来电：听筒 + 右上一个叉（15–20 × 4–9，同一条路径里交叉）
export default () => [
  ...phone(),
  ...danger(['M15 4L20 9M20 4L15 9']),
]
