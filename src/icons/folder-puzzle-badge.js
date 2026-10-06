import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, outlines, puzzle } from '../symbols'

// 文件夹 + 右下角拼图（模组）
const k = cornerScale.puzzle

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.puzzle, badge, k), stroke), radius, false),
  ...puzzle(badge, k, radius),
]
