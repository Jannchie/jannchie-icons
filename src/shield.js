// 盾牌类图标共用（系列，和文件夹、公文包一样）：盾形在这里按外缘直接定义，不再借 symbols.js 的 shield 放大
// （放大的盾以中心为准缩放，线宽变粗时外缘跟着往外长；symbols.js 的 shield 还给别的角标用，不动它）
// 墨迹框左右 3–21、上下 2–22，以画布中线对称：上沿是一段鼓起的弧，顶点外缘贴 2；两侧竖边外缘在 3 和 21
// （线宽 1 时竖边落在 3.5 / 20.5 上）；下半从 y 11 起收成底尖，底尖的墨迹（圆角接头往外 h）贴 22
// 线宽变粗时外缘不动、往里长（h 是半个线宽）
// 右下角标：盾的右下是一段收向底尖的曲线，没有横平竖直的边可以按区间断开（各系列用的 blocked 只处理轴对齐的边），
// 所以改用一个隐藏的遮挡框：角标外形外扩一圈，框里的盾线删掉、框边附近的线断开（clip 按 GAP + 线宽留缝）
import { centerBadge } from './corner'

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

// 角标：中心固定在 BADGE_CENTER，各符号落在同一个位置（盾的右下是曲线，贴墨迹边缘的话圆的、方的、扁的符号中心各不相同，
// 一排看下来位置不统一）；比普通角标大 GROW 倍，墨迹超出 22（画布留白 2）就缩小
// 不像文件夹等系列放大到 1.3：盾的下半收成尖，大角标会把盾的右半边整个吃掉
const BADGE_CENTER = [17, 17]
const GROW = 1.1
export function withBadge(name, draw, tone, radius, stroke) {
  const { k, at, shape } = centerBadge(name, draw, radius, stroke, BADGE_CENTER, 22, GROW)
  // 遮挡框取符号实际墨迹（中心线）的外接框：按 outlines 的近似外形会比墨迹大（对勾、云），线断得太早
  const xs = shape.pts.map(q => q[0])
  const ys = shape.pts.map(q => q[1])
  const [x0, y0, x1, y1] = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]
  const hole = { d: `M${x0} ${y0}H${x1}V${y1}H${x0}Z`, cut: true, hidden: true, occlude: true }
  return [...plain(stroke), hole, ...tone(draw(at, k, radius)).map(p => (typeof p === 'string' ? { d: p, cut: true } : { ...p, cut: true }))]
}
