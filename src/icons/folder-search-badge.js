import { place } from '../clearance'
import { badge, folderAround } from '../folder'
import { rounded } from '../geometry'
import { cornerScale, outlines, search } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右下角搜索
const k = cornerScale.search

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.search, badge, k), stroke), radius, false),
  ...info(search(badge, k, radius)),
]
