import { rounded } from '../geometry'
import { screen, stand } from '../monitor'

// 显示器：屏幕 + 立杆 + 底座
export default ({ radius }) => [
  rounded(screen, Math.min(radius, 2.5)),
  ...stand,
]
