import { circle } from '../geometry'

// 日间：圆 + 8 道间隔 45° 的光线
const [cx, cy] = [12, 12]
const rays = Array.from({ length: 8 }, (_, i) => {
  const a = i * Math.PI / 4
  const [c, s] = [Math.cos(a), Math.sin(a)]
  return `M${cx + 6.5 * c} ${cy + 6.5 * s}L${cx + 9 * c} ${cy + 9 * s}`
})

export default () => [circle(cx, cy, 4), ...rays]
