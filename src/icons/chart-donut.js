import { circle } from '../geometry'
import { hole, knock, solid } from '../solid'

// 环形图：内外两个圆 + 三道分隔线（-90°、30°、150°）
const C = 12
const seps = [-90, 30, 150].map((deg) => {
  const [c, s] = [Math.cos(deg * Math.PI / 180), Math.sin(deg * Math.PI / 180)]
  return `M${C + 4 * c} ${12 + 4 * s}L${C + 8.5 * c} ${12 + 8.5 * s}`
})

export default () => [circle(C, 12, 8.5), circle(C, 12, 4), ...seps]

// 实心：圆环一块（内洞外扩半个线宽后正好是描边版内圆的内缘），分隔线两头各伸出一个线宽，把圆环切成三段
export const fill = ({ stroke }) => [
  solid(circle(C, 12, 8.5)),
  hole(circle(C, 12, 4 - stroke)),
  knock([-90, 30, 150].map((deg) => {
    const [c, s] = [Math.cos(deg * Math.PI / 180), Math.sin(deg * Math.PI / 180)]
    const [r0, r1] = [4 - stroke, 8.5 + stroke]
    return `M${C + r0 * c} ${12 + r0 * s}L${C + r1 * c} ${12 + r1 * s}`
  })),
]
