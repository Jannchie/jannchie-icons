import { place } from '../clearance'
import { badge, folderAround } from '../folder'
import { rounded } from '../geometry'
import { cornerScale, outlines, search } from '../symbols'

// 文件夹 + 右下角搜索
const k = cornerScale.search

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.search, badge, k), stroke), radius, false),
  ...search(badge, k, radius),
]
