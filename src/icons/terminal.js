import { crisp, rounded } from '../geometry'

// 终端：窗口 + > 提示符 + 下划线光标
export default ({ radius }) => [
  rounded([[3, 4.5], [21, 4.5], [21, 19.5], [3, 19.5]], radius),
  rounded([[7, 9], [10, 12], [7, 15]], crisp(radius), false),
  'M12 15H16.5',
]
