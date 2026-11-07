import { listBadge } from '../list'
import { solid } from '../solid'
import { cornerScale, outlines, plug } from '../symbols'
import { accent } from '../tone'

// 列表 + 插头
const k = cornerScale.plug

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.plug, k, stroke, plug, radius)
  return [...lines, ...accent(plug(center, size, radius))]
}

// 实心：行线照旧，插头主体填实（电线和插脚照旧是线，同 plug）
export const fill = ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.plug, k, stroke, plug, radius)
  const [a, b, body] = plug(center, size, radius)
  return [...lines, ...accent([a, b, solid(body), body])]
}
