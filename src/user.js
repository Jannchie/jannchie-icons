// 用户类图标共用：人像（和添加用户同一个造型，往左挪）+ 右下角标
// 角标中心 BADGE = (18, 17)；一个隐藏的遮挡圆（半径 HOLE）让肩膀在角标附近断开（同 user-cog / server-cog 的做法），
// 角标自己也标成刀，不会被遮挡圆删掉
import { place } from './clearance'
import { circle } from './geometry'
import { cornerScale, outlines } from './symbols'
import { affine } from './transform'

export const BADGE = [18, 17]
const HOLE = 4.25

export const figure = () => [
  circle(9, 8, 3.5),
  'M2.5 20A6.5 6 0 0 1 15.5 20',
]

const hole = r => ({ d: circle(BADGE[0], BADGE[1], r), cut: true, hidden: true, occlude: true })
const asBadge = p => (typeof p === 'string' ? { d: p, cut: true } : { ...p, cut: true })

// 符号角标：symbols.js 里的符号（时钟、盾牌……），大小和各系列的角标一致
export function withSymbol(name, draw, tone, radius) {
  const k = cornerScale[name]
  const shape = place(outlines[name], BADGE, k)
  const r = shape.circle ?? Math.max(shape.box[2] - shape.box[0], shape.box[3] - shape.box[1]) / 2 * Math.SQRT2
  return [...figure(), hole(Math.min(r, HOLE + 0.5)), ...tone(draw(BADGE, k, radius)).map(asBadge)]
}

// 图标角标：把一个完整的 24 格图标缩到 K 倍放进角标（学士帽、房子、沙漏……），用细线（主线的 0.7 倍）：
// 缩小的图标和人像一样粗会糊成一团（细节 detail 的线宽上限 1.5 正好等于常规线宽，起不到变细的作用）
const K = 0.4
export function withIcon(draw, opts, tone = p => p) {
  const paths = draw(opts).map(p => (typeof p === 'string' ? { d: p } : p))
  const scaled = paths.map(p => ({ ...p, d: affine(p.d, K, K, BADGE[0] - 12 * K, BADGE[1] - 12 * K), thin: true, ...(p.dot ? { dot: p.dot * 0.75 } : {}) }))
  return [...figure(), hole(HOLE), ...tone(scaled).map(asBadge)]
}

// 自画角标：paths 直接按 BADGE 附近的坐标画
export const withPaths = (paths, tone = p => p) => [...figure(), hole(HOLE), ...tone(paths).map(asBadge)]
