import { GAP } from '../clearance'
import { frame } from '../mail'
import { off, offFill } from '../off'
import { cutout } from '../solid'
import base, { fill as baseFill } from './mail'

// 无邮件
export default off(base)

// 实心：斜线在左上角从封口线的左端旁边擦过，斜线让出的缝和封口线挖出的缝之间只剩一小片发丝似的三角——
// 把这片连同外面挖掉：三角两边分别平行于斜线的缝（y = x + c）和封口线的上缘（30°），切口和两道缝对齐
export const fill = offFill((opts) => {
  const { l } = frame(opts.stroke)
  const t = Math.tan(Math.PI / 6)
  const c = (opts.stroke / 2 + GAP) * Math.SQRT2
  const f = 6 - opts.stroke / 2 / Math.cos(Math.PI / 6)
  const x = (f - t * l - c) / (1 - t)
  return [...baseFill(opts), cutout(`M-2 ${-2 + c}L${x} ${x + c}L-2 ${f + t * (-2 - l)}Z`)]
})
