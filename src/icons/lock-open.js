import { rounded } from '../geometry'

// 解锁：锁身 + 打开的锁梁
export default ({ radius }) => [
  rounded([[5, 10.5], [19, 10.5], [19, 20.5], [5, 20.5]], Math.min(radius, 2.5)),
  'M8 10.5V7A4 4 0 0 1 15.75 5.75',
  'M12 14.5V16.5',
]
