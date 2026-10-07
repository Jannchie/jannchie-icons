import { image, plus } from '../symbols'

// 插入图片：相框往左上挪，右下角一个加号；加号作为 cut，相框在加号附近真正断开
export default ({ radius }) => [
  ...image([10.5, 10.5], 2.2, radius),
  ...plus([18.5, 18.5], 1.2).map(p => ({ d: p.d ?? p, cut: true, tone: 'success' })),
]
