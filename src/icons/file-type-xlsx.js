import { flap, labelBox, pageTop } from '../file'
import { rounded } from '../geometry'
import { label } from '../letters'

// XLSX 文件：纸张上半部分 + 下方线条字母（四个字母，横向压窄撑满）
export default ({ radius }) => [
  rounded(pageTop(radius), radius, false),
  flap,
  ...label('xlsx', labelBox),
]
