import { rounded } from '../geometry'

// 停止：方块
export default ({ radius }) => [
  rounded([[6, 6], [18, 6], [18, 18], [6, 18]], radius),
]
