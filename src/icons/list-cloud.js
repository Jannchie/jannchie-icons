import { listBadge } from '../list'
import { cornerScale, outlines, cloud } from '../symbols'

// 列表 + 云
const k = cornerScale.cloud

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.cloud, k, stroke)
  return [...lines, ...cloud(center, k, radius)]
}
