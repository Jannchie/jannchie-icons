import { place } from '../clearance'
import { arrowUp, cornerScale, outlines } from '../symbols'
import { info } from '../tone'
import base from './database'

// 数据库 + 右下角上箭头：箭头外形的方框作为隐藏的遮挡刀，圆柱在角标附近断开；箭头自己也是刀（不被方框删掉）
const k = cornerScale.arrowUp
const at = [18, 17.5]

export default (opts) => {
  const { radius } = opts
  const { box: [x0, y0, x1, y1] } = place(outlines.arrowUp, at, k)
  return [
    ...base({ radius }),
    { d: `M${x0} ${y0}H${x1}V${y1}H${x0}Z`, cut: true, hidden: true, occlude: true },
    ...info(arrowUp(at, k, radius)).map(p => ({ ...p, cut: true })),
  ]
}
