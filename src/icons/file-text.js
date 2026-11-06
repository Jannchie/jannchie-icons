import { fillParts, flap, page } from '../file'
import { rounded } from '../geometry'
import { centerFill } from '../solid'

// 文本文件：纸张 + 折角 + 三行文字
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  'M8.5 10.5H15.5',
  'M8.5 14.5H15.5',
  'M8.5 18.5H12.5',
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  'M8.5 10.5H15.5',
  'M8.5 14.5H15.5',
  'M8.5 18.5H12.5',
])
