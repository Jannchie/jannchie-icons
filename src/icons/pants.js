import { rounded } from '../geometry'

// 裤子：腰头 + 门襟线 + 两条笔直的裤腿（中间开叉到裆部）
export default ({ radius }) => [
  rounded([[5.5, 3], [18.5, 3], [19, 21], [13.75, 21], [12, 11], [10.25, 21], [5, 21]], Math.min(radius, 1)),
  'M5.5 6.5H18.5',
  'M12 6.5V10',
]
