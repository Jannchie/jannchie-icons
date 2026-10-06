import { rounded } from '../geometry'

// 笔记本：屏幕 + 底座横线
export default ({ radius }) => [
  rounded([[5, 5], [19, 5], [19, 15.5], [5, 15.5]], Math.min(radius, 2)),
  'M2.5 19H21.5',
]
