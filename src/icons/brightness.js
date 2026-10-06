import { circle } from '../geometry'
import { dot } from '../scene'

// 亮度：圆 + 8 个点（区别于 sun 的线条光芒）
const rays = Array.from({ length: 8 }, (_, i) => {
  const a = i * Math.PI / 4
  return dot(12 + 7.75 * Math.cos(a), 12 + 7.75 * Math.sin(a))
})

export default () => [circle(12, 12, 4.5), ...rays]
