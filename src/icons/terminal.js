import { crisp, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 终端：窗口 + > 提示符 + 下划线光标
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], radius),
  rounded([[7, 9], [10, 12], [7, 15]], crisp(radius), false),
  'M12 15.5H16.5',
]

// 实心：窗口一块，挖掉提示符和光标
export const fill = ({ radius }) => [
  solid(rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], radius)),
  knock([rounded([[7, 9], [10, 12], [7, 15]], crisp(radius), false), 'M12 15.5H16.5']),
]
