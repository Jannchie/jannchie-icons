// 盾牌类图标共用（系列，和文件夹、公文包一样）：盾形 = symbols.js 的 shield 放大 2.3 倍、以 (12, 12) 为中心
// 盾下半收窄成尖，居中符号放在中心偏上（12, 11.25）
// 右下角标：盾的右下是一段收向底尖的曲线，没有横平竖直的边可以按区间断开（各系列用的 blocked 只处理轴对齐的边），
// 所以改用一个隐藏的遮挡框：角标外形外扩一圈，框里的盾线删掉、框边附近的线断开（clip 按 GAP + 线宽留缝）
import { place } from './clearance'
import { badge } from './folder'
import { cornerScale, outlines, shield } from './symbols'

export { badge }
export const center = [12, 11.25]
export const centerScale = 1
export const plain = radius => shield([12, 12], 2.3, radius)

// 角标版：盾 + 遮挡框 + 角标符号（符号本身也是刀，不会被遮挡框删掉）
export function withBadge(name, draw, tone, radius) {
  const k = cornerScale[name]
  const shape = place(outlines[name], badge, k)
  const [x0, y0, x1, y1] = shape.circle
    ? [shape.c[0] - shape.circle, shape.c[1] - shape.circle, shape.c[0] + shape.circle, shape.c[1] + shape.circle]
    : shape.box
  const hole = { d: `M${x0} ${y0}H${x1}V${y1}H${x0}Z`, cut: true, hidden: true, occlude: true }
  return [...plain(radius), hole, ...tone(draw(badge, k, radius)).map(p => (typeof p === 'string' ? { d: p, cut: true } : { ...p, cut: true }))]
}
