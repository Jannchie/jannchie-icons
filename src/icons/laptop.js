import { rounded } from '../geometry'

// 笔记本：屏幕 + 底座横线
export default ({ radius }) => [
  rounded([[5.5, 5.5], [18.5, 5.5], [18.5, 15.5], [5.5, 15.5]], Math.min(radius, 2)),
  'M2.5 18.5H21.5',
]
