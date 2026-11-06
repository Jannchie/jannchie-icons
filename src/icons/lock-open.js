import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 解锁：锁身 + 打开的锁梁
export default ({ radius }) => [
  rounded([[5, 10.5], [19, 10.5], [19, 20.5], [5, 20.5]], Math.min(radius, 2.5)),
  'M8 10.5V7A4 4 0 0 1 15.75 5.75',
  'M12 14.5V16.5',
]

// 实心：锁身一块，挖掉锁孔；锁梁照旧是线
export const fill = ({ radius }) => [
  solid(rounded([[5, 10.5], [19, 10.5], [19, 20.5], [5, 20.5]], Math.min(radius, 2.5))),
  knock('M12 14.5V16.5'),
  'M8 10.5V7A4 4 0 0 1 15.75 5.75',
]
