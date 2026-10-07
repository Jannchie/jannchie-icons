import { flap, page } from '../file'
import { rounded } from '../geometry'

// 文本文件：纸张 + 折角 + 三行文字
export default ({ radius, stroke }) => [
  rounded(page(radius), radius),
  flap,
  'M8.5 10.5H15.5',
  'M8.5 14.5H15.5',
  'M8.5 18.5H12.5',
]
