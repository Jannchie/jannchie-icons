import { rounded } from '../geometry'

// 粘贴：剪贴板；顶部的夹子作为 cut，把板子上沿真正断开
export default ({ radius }) => [
  rounded([[5, 4.5], [19, 4.5], [19, 21], [5, 21]], Math.min(radius, 2)),
  { d: rounded([[9, 3], [15, 3], [15, 6.5], [9, 6.5]], Math.min(radius, 1)), cut: true },
]
