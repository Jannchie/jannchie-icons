import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, outlines, assets } from '../symbols'

// 文件夹 + 右下角素材
const k = cornerScale.assets

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.assets, badge, k), stroke), radius, false),
  ...assets(badge, k, radius),
]
