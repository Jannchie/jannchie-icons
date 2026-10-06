import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, outlines, gauge } from '../symbols'

// 文件夹 + 右下角计速器
const k = cornerScale.gauge

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.gauge, badge, k), stroke), radius, false),
  ...gauge(badge, k, radius),
]
