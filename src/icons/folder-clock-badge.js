import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, outlines, clock } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右下角时钟
const k = cornerScale.clock

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.clock, badge, k), stroke), radius, false),
  ...info(clock(badge, k, radius)),
]
