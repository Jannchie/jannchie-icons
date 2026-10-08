import { flap, labelBox, pageTop } from '../file'
import { rounded } from '../geometry'
import { label } from '../letters'

// CR3 文件：纸张上半部分 + 下方线条字母
export default ({ radius, stroke }) => [
  rounded(pageTop(stroke, radius), radius, false),
  flap(stroke),
  ...label('cr3', labelBox),
]
