import { listBadge } from '../list'
import { cornerScale, outlines, cloud } from '../symbols'
import { info } from '../tone'

// 列表 + 云
const k = cornerScale.cloud

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.cloud, k, stroke, cloud, radius)
  return [...lines, ...info(cloud(center, size, radius))]
}
