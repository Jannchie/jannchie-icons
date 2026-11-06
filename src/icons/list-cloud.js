import { listBadge, symbolFill } from '../list'
import { cornerScale, outlines, cloud } from '../symbols'
import { info } from '../tone'

// 列表 + 云
const k = cornerScale.cloud

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.cloud, k, stroke, cloud, radius)
  return [...lines, ...info(cloud(center, size, radius))]
}

// 实心：行线照旧，符号填实
export const fill = ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.cloud, k, stroke, cloud, radius)
  return [...lines, ...info(symbolFill('cloud', cloud(center, size, radius), stroke))]
}
