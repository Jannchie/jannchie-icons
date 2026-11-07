import { off, offFill } from '../off'
import { cutout } from '../solid'
import base, { fill as baseFill } from './bookmark'

// 无书签
export default off(base)

// 实心：书签的实心版在斜线两侧让出缝，再画斜线。书签底部 V 形缺口的右边和斜线平行（都是 45°），
// 斜线下方、缺口右边那一溜只剩 1.3 宽、贴着斜线的细条，像多画了一道斜线：沿过缺口尖、垂直于斜线的线把它切掉。
// 缺口尖的中心线在 (12, 15.2)，墨迹外缘往上让开半个线宽的 √2 倍
export const fill = offFill((opts) => {
  const k = (27.2 + opts.stroke / Math.SQRT2) / 2
  return [...baseFill(opts), cutout(`M${k} ${k}L${k + 15} ${k + 15}L${k} ${k + 30}L${k - 15} ${k + 15}Z`)]
})
