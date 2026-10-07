import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, outlines, cloud } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右下角云
const k = cornerScale.cloud

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.cloud, badge, k), stroke), radius, false),
  ...info(cloud(badge, k, radius)),
]
