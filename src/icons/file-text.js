import { fillParts, flap, page } from '../file'
import { rounded } from '../geometry'
import { centerFill } from '../solid'

// 文本文件：纸张 + 折角 + 三行文字
// 三行间距 3，以折角以下纸张部分的中点 14.25 为中；中心线在 .75 上，常规线宽在 16px 下各占满一行像素
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  'M8.5 11.25H15.5',
  'M8.5 14.25H15.5',
  'M8.5 17.25H12.5',
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  'M8.5 11.25H15.5',
  'M8.5 14.25H15.5',
  'M8.5 17.25H12.5',
])
