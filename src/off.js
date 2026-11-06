// 「划掉」系列：在原图标上加一条 45° 斜线，原图标在斜线两侧各让出 GAP 的空隙
// 斜线标记为 cut，把其余路径沿斜线挖开；双色变体里斜线是 danger（推荐红色）
import { GAP } from './clearance'
import { clear } from './solid'

export const slash = 'M3 3L21 21'

export const off = draw => opts => [...draw(opts), { d: slash, cut: true, tone: 'danger' }]

// 实心版：原图标的实心版在斜线两侧各让出 GAP，再画上斜线（d 默认是左上 → 右下的 slash）
export const offFill = (fill, d = slash) => opts => [...fill(opts), clear(d, GAP), { d, tone: 'danger' }]
