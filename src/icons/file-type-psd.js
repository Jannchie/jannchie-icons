import { flap, labelBox, pageTop } from '../file'
import { rounded } from '../geometry'
import { label } from '../letters'
import { knock, solid } from '../solid'

// PSD 文件：纸张上半部分 + 下方线条字母
export default ({ radius, stroke }) => [
  rounded(pageTop(stroke, radius), radius, false),
  flap(stroke),
  ...label('psd', labelBox),
]

// 实心：纸张上半部分是一块（下沿是直的），挖掉翻折线，字母照旧是线
export const fill = ({ radius, stroke }) => [
  solid(rounded(pageTop(stroke, radius), radius, false)),
  knock(flap(stroke)),
  ...label('psd', labelBox),
]
