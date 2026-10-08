// 公文包类图标共用：箱体 + 提手；基础款有一道腰线，带符号的变体去掉腰线给符号让位
// 墨迹框左右 2–22、上下 3–21，以画布中线对称：箱体外缘 2–22 × 7–21，提手外缘 8–16 × 3–7
// 线宽变粗时外缘不动、往里长（见 docs/design.md），h 是半个线宽；线宽 1 时箱体四边、提手三边都落在 .5 上
import { blocked, rectAround } from './clearance'
import { asBadge, fitBadge, roomOnRight } from './corner'
import { rounded } from './geometry'

function frame(stroke) {
  const h = stroke / 2
  return { h, l: 2 + h, t: 7 + h, r: 22 - h, b: 21 - h, hl: 8 + h, hr: 16 - h, ht: 3 + h }
}

const bodyRadius = radius => Math.min(radius, 2.5)

export function body(stroke) {
  const { l, t, r, b } = frame(stroke)
  return [[l, t], [r, t], [r, b], [l, b]]
}

// 提手：两条竖边从箱体顶边起，上角是半径 1.5 的圆角
export function handle(stroke) {
  const { t, hl, hr, ht } = frame(stroke)
  const q = 1.5
  return `M${hl} ${t}V${ht + q}A${q} ${q} 0 0 1 ${hl + q} ${ht}H${hr - q}A${q} ${q} 0 0 1 ${hr} ${ht + q}V${t}`
}

// 腰线：中心线固定在 13.5（箱体中线 14 往上半格，线宽 1 时落在 .5 上；实物的锁扣线也偏上），两端接到箱体竖边
export const WAIST = 13.5
export function waist(stroke) {
  const { l, r } = frame(stroke)
  return `M${l} ${WAIST}H${r}`
}

export const plain = (radius, stroke) => [rounded(body(stroke), bodyRadius(radius)), handle(stroke)]

// 居中符号放在箱体中间：箱体顶边和底边都随线宽各收半个线宽，中点不变
export const center = [12, 14]
export const centerScale = 1

// 右下角标：符号墨迹的右缘贴到箱体右缘 22，下缘贴到画布留白的边 22（比箱体底缘 21 低 1，和文件夹一样压在外框角上）；右边和底边在离符号 GAP 处断开，腰线碰到符号时也截断
// 角标比普通角标大 GROW 倍，和文件夹一样（16px 下也认得出符号）；放不下时 fitBadge 再缩回去
const GROW = 1.3

export function withBadge(name, draw, tone, radius, stroke) {
  const { l, t, r, b } = frame(stroke)
  const { k, at, shape } = fitBadge(name, draw, radius, stroke, { right: 22, bottom: 22 }, roomOnRight(stroke, r, t), GROW)
  const w = blocked(shape, 'x', WAIST, stroke)
  return [
    rounded(rectAround(shape, stroke, [l, t, r, b]), bodyRadius(radius), false),
    handle(stroke),
    `M${l} ${WAIST}H${w ? w[0] : r}`,
    ...asBadge(tone(draw(at, k, radius))),
  ]
}
