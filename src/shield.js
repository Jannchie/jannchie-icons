// 盾牌类图标共用（系列，和文件夹、公文包一样）：盾形在这里按外缘直接定义，不再借 symbols.js 的 shield 放大
// （放大的盾以中心为准缩放，线宽变粗时外缘跟着往外长；symbols.js 的 shield 还给别的角标用，不动它）
// 墨迹框左右 3–21、上下 2–22，以画布中线对称：上沿是一段鼓起的弧，顶点外缘贴 2；两侧竖边外缘在 3 和 21
// （线宽 1 时竖边落在 3.5 / 20.5 上）；下半从 y 11 起收成底尖，底尖的墨迹（圆角接头往外 h）贴 22
// 线宽变粗时外缘不动、往里长（h 是半个线宽）
// 右下角标：盾的右下是一段收向底尖的曲线，没有横平竖直的边可以按区间断开（各系列用的 blocked 只处理轴对齐的边），
// 所以改用一个隐藏的遮挡框：角标外形外扩一圈，框里的盾线删掉、框边附近的线断开（clip 按 GAP + 线宽留缝）
import { place } from './clearance'
import { cornerCenter } from './corner'
import { cornerScale, outlines } from './symbols'

const fmt = v => +v.toFixed(3)

function frame(stroke) {
  const h = stroke / 2
  const [l, r] = [3 + h, 21 - h]
  const apex = 2 + h // 上沿弧的顶点
  const shoulder = apex + 1.5 // 上沿弧和竖边的交点
  const side = 11 // 竖边到这里为止，往下收成尖
  const tip = 22 - h
  return { h, l, r, apex, shoulder, side, tip }
}

// 盾的轮廓（一条闭合路径）
export function outline(stroke) {
  const { l, r, apex, shoulder, side, tip } = frame(stroke)
  const w = (r - l) / 2
  const sag = shoulder - apex
  const R = fmt((w * w + sag * sag) / (2 * sag))
  const dy = tip - side
  // 两段三次曲线从竖边下端收到底尖：前一个控制点在竖边延长线上，后一个往中线收到 0.55 倍半宽
  const [c1, c2] = [side + dy * 0.52, side + dy * 0.82]
  const p = (x, y) => `${fmt(x)} ${fmt(y)}`
  return `M${p(l, shoulder)}A${R} ${R} 0 0 1 ${p(r, shoulder)}`
    + `L${p(r, side)}`
    + `C${p(r, c1)} ${p(12 + w * 0.55, c2)} ${p(12, tip)}`
    + `C${p(12 - w * 0.55, c2)} ${p(l, c1)} ${p(l, side)}Z`
}

// 居中符号放在中心偏上：盾下半收窄，视觉重心在 y 11 附近
export const center = [12, 11]
export const centerScale = 1
export const plain = stroke => [outline(stroke)]

// 角标外框的右下角：右缘贴到 22（画布留白 2），下缘贴到底尖的外缘 22
// （盾的外框右缘只到 21，但角标在盾外的空角里，贴到 21 会让遮挡框切进盾身太多）
export const badgeCorner = { right: 22, bottom: 22 }

// 角标版：盾 + 遮挡框 + 角标符号（符号本身也是刀，不会被遮挡框删掉）
export function withBadge(name, draw, tone, radius, stroke) {
  const k = cornerScale[name]
  const at = cornerCenter(draw, k, radius, stroke, badgeCorner)
  const shape = place(outlines[name], at, k)
  const [x0, y0, x1, y1] = shape.circle
    ? [shape.c[0] - shape.circle, shape.c[1] - shape.circle, shape.c[0] + shape.circle, shape.c[1] + shape.circle]
    : shape.box
  const hole = { d: `M${x0} ${y0}H${x1}V${y1}H${x0}Z`, cut: true, hidden: true, occlude: true }
  return [...plain(stroke), hole, ...tone(draw(at, k, radius)).map(p => (typeof p === 'string' ? { d: p, cut: true } : { ...p, cut: true }))]
}
