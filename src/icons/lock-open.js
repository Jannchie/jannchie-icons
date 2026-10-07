import { rounded } from '../geometry'

// 解锁：锁身 + 打开的锁梁
export default ({ radius }) => [
  // 整体右移半格，锁孔落在 12.5 上
  rounded([[5.5, 10.5], [19.5, 10.5], [19.5, 20.5], [5.5, 20.5]], Math.min(radius, 2.5)),
  'M8.5 10.5V7A4 4 0 0 1 16.25 5.75',
  'M12.5 14.5V16.5',
]
