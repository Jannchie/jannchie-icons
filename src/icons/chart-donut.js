import { circle } from '../geometry'

// 环形图：内外两个圆 + 三道分隔线（-90°、30°、150°）
const C = 12
const seps = [-90, 30, 150].map((deg) => {
  const [c, s] = [Math.cos(deg * Math.PI / 180), Math.sin(deg * Math.PI / 180)]
  return `M${C + 4 * c} ${12 + 4 * s}L${C + 8.5 * c} ${12 + 8.5 * s}`
})

export default () => [circle(C, 12, 8.5), circle(C, 12, 4), ...seps]
