import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, outlines, image } from '../symbols'

// 文件夹 + 右下角图片
const k = cornerScale.image

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.image, badge, k), stroke), radius, false),
  ...image(badge, k, radius),
]
