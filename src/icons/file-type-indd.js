import { flap, labelBox, pageTop } from '../file'
import { rounded } from '../geometry'
import { label } from '../letters'

// INDD 文件：纸张上半部分 + 下方线条字母
// 四个字母挤在默认的 5–19 里会粘连；排版区放宽到 3–21，字距和三字母的格式一样（GAP）
export default ({ radius }) => [
  rounded(pageTop(radius), radius, false),
  flap,
  ...label('indd', { ...labelBox, left: 3, right: 21 }),
]
