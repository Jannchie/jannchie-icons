import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, lock, outlines } from '../symbols'
import { warning } from '../tone'

// 文件夹 + 右下角锁
const k = cornerScale.lock

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.lock, badge, k), stroke), radius, false),
  ...warning(lock(badge, k, radius)),
]
