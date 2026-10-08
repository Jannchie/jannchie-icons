import { flap, pageTop, wideLabelBox } from '../file'
import { rounded } from '../geometry'
import { label } from '../letters'

// HTML 文件：纸张上半部分 + 下方线条字母（四个字母，横向压窄撑满）
export default ({ radius, stroke }) => [
  rounded(pageTop(stroke, radius), radius, false),
  flap(stroke),
  ...label('html', wideLabelBox),
]
