import { rounded } from '../geometry'

// 粘贴：剪贴板；顶部的夹子作为 cut，把板子上沿真正断开
export default ({ radius }) => [
  rounded([[5.5, 4.5], [18.5, 4.5], [18.5, 20.5], [5.5, 20.5]], Math.min(radius, 2)),
  { d: rounded([[9.5, 3.5], [14.5, 3.5], [14.5, 6.5], [9.5, 6.5]], Math.min(radius, 1)), cut: true },
]
