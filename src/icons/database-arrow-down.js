import { place } from '../clearance'
import { badgeFill } from '../solid'
import { arrowDown, cornerScale, outlines } from '../symbols'
import { info } from '../tone'
import base, { fill as databaseFill } from './database'

// 数据库 + 右下角下箭头：箭头外形的方框作为隐藏的遮挡刀，圆柱在角标附近断开；箭头自己也是刀（不被方框删掉）
const k = cornerScale.arrowDown
const at = [18, 17.5]

export default (opts) => {
  const { radius } = opts
  const { box: [x0, y0, x1, y1] } = place(outlines.arrowDown, at, k)
  return [
    ...base({ radius }),
    { d: `M${x0} ${y0}H${x1}V${y1}H${x0}Z`, cut: true, hidden: true, occlude: true },
    ...info(arrowDown(at, k, radius)).map(p => ({ ...p, cut: true })),
  ]
}

// 实心：和角标系列一样（见 solid.js 的 badgeFill）：圆柱在箭头四周让出缝、朝右下外角让开，再把箭头画回去
export const fill = (opts) => {
  const arrow = info(arrowDown(at, k, opts.radius))
  return badgeFill({ body: databaseFill(opts), lines: [] }, arrow, 'bottom')
}
