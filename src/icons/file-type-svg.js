import { flap, labelBox, pageTop } from '../file'
import { rounded } from '../geometry'
import { label } from '../letters'

// SVG 文件：纸张上半部分 + 下方线条字母
export default ({ radius }) => [
  rounded(pageTop(radius), radius, false),
  flap,
  ...label('svg', labelBox),
]
