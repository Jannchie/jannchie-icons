// 定位针类图标共用（系列）：水滴形针体 + 中心小圆；线宽变粗时外缘不动、往里长（h 是半个线宽）
// 针体：头部是外缘半径 ro 的圆（顶点外缘贴 2），两侧用三次曲线收到针尖，针尖墨迹（圆角接头往外 h）贴 22；中心小圆中心线固定
// 单独的 map-pin：头部外缘半径 8、圆心 (12, 10)，墨迹框 4–20 × 2–22（线宽 1 时左右切线落在整数外缘上，两侧都清晰）
// 带角标的：针体小一圈、往左挪（头部外缘半径 7、圆心 (9, 9)，墨迹左缘贴 2），给右下角标让出地方，
// 角标墨迹贴到右缘 22、下缘 22（和针尖同高），整体墨迹框 2–22 × 2–22；角标的遮挡框只切到针体右下的曲线，碰不到中心小圆
// 右下角标：针体右下是一段收向针尖的曲线，没有横平竖直的边可以按区间断开，和盾牌系列一样
// 用一个隐藏的遮挡框：角标外形外扩一圈，框里的针线删掉、框边附近的线断开（clip 按 GAP + 线宽留缝），断口比只让符号本身去切宽得多
import { fillDraw, fillSymbol, leftOf } from './badge-room'
import { GAP } from './clearance'
import { asBadge, fitBadge } from './corner'
import { circle } from './geometry'
import { badgeFill, hole, solid } from './solid'

const fmt = v => +v.toFixed(3)

// 针体轮廓：x 是中线，top 是头部顶点的外缘，ro 是头部外缘半径
function body(x, top, ro, stroke) {
  const h = stroke / 2
  const r = ro - h
  const cy = top + ro
  const tip = 22 - h
  // 从针尖出发，第一控制点就在针尖上（尖端收得利落），第二控制点在头部竖直切线上、圆心往下约 0.46 倍针尖距离
  const c = fmt(cy + (tip - cy) * 0.46)
  const [l, rr] = [fmt(x - r), fmt(x + r)]
  return `M${x} ${fmt(tip)}C${x} ${fmt(tip)} ${l} ${c} ${l} ${cy}A${fmt(r)} ${fmt(r)} 0 0 1 ${rr} ${cy}C${rr} ${c} ${x} ${fmt(tip)} ${x} ${fmt(tip)}Z`
}

export const pin = stroke => [body(12, 2, 8, stroke), circle(12, 10, 2.5)]

// 带角标版本的小针
export const plain = stroke => [body(9, 2, 7, stroke), circle(9, 9, 2.25)]

// 角标版：针 + 遮挡框 + 角标符号（符号本身也是刀，不会被遮挡框删掉）
// 角标比普通角标大 GROW 倍，和文件夹等系列一样（16px 下也认得出符号）；遮挡框离中心小圆不到 GAP + 线宽时缩回一点
const GROW = 1.3
const clearOfDot = stroke => (shape) => {
  const x0 = Math.min(...shape.pts.map(q => q[0]))
  const y0 = Math.min(...shape.pts.map(q => q[1]))
  const [dx, dy] = [Math.max(0, x0 - 9), Math.max(0, y0 - 9)]
  return Math.hypot(dx, dy) >= 2.25 + GAP + stroke
}
export function withBadge(name, draw, tone, radius, stroke, { fill = false } = {}) {
  const fit = (n, d, more = () => true) => fitBadge(n, d, radius, stroke, { right: 22, bottom: 22 }, s => clearOfDot(stroke)(s) && more(s), GROW)
  // 实心版：小针填实、中心挖洞，角标四周让出一圈缝、朝右下整片让掉。让掉的部分从角标最左的墨迹一直拖到底，
  // 角标左缘的让位要停在针尖（x 9）右边至少 1，针尖才完整（见 badge-room.js）
  if (fill) {
    const { k, at } = fit(...fillSymbol(name, draw), leftOf(stroke, 9 + stroke / 2 + 1))
    return badgeFill(plainFillParts(stroke), asBadge(tone(fillDraw(name, draw)(at, k, radius)), name), 'bottom')
  }
  const { k, at, shape } = fit(name, draw)
  // 遮挡框取符号实际墨迹（中心线）的外接框：按 outlines 的近似外形会比墨迹大（对勾、云），线断得太早
  const xs = shape.pts.map(q => q[0])
  const ys = shape.pts.map(q => q[1])
  const [x0, y0, x1, y1] = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]
  const hole = { d: `M${x0} ${y0}H${x1}V${y1}H${x0}Z`, cut: true, hidden: true, occlude: true }
  return [...plain(stroke), hole, ...asBadge(tone(draw(at, k, radius)), name).map(p => (typeof p === 'string' ? { d: p, cut: true } : { ...p, cut: true }))]
}

// 实心版（见 solid.js 的 badgeFill）：小针填实，中心挖一个圆洞（外扩半个线宽后和描边版中心圆的中心线一样大，同 map-pin）
export const plainFillParts = (stroke) => {
  const [drop, dot] = [body(9, 2, 7, stroke), circle(9, 9, 2.25 - stroke / 2)]
  return { body: [solid(drop), hole(dot)], lines: [] }
}
