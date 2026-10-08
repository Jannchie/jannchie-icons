import { rounded } from '../geometry'

// 裤子：腰头 + 门襟线 + 两条笔直的裤腿（中间开叉到裆部）
export default ({ radius }) => [
  rounded([[5.5, 3.5], [18.5, 3.5], [19, 20.5], [13.75, 20.5], [12, 11], [10.25, 20.5], [5, 20.5]], Math.min(radius, 1)),
  'M5.41 6.5H18.59',
  'M12 6.5V10',
]
