import { crisp, rounded } from '../geometry'

// 终端：窗口 + > 提示符 + 下划线光标
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], radius),
  rounded([[7, 9], [10, 12], [7, 15]], crisp(radius), false),
  'M12 15.5H16.5',
]
