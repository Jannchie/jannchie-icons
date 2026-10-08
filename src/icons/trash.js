import { trash } from '../trash'

// 删除：垃圾桶 + 桶身里两道竖线（10 / 14，和中线对称）
export default ({ radius, stroke }) => [
  ...trash(radius, stroke),
  'M10 10.5V17.5',
  'M14 10.5V17.5',
]
