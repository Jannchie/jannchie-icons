// 列表类图标共用：三个圆点 + 三行线
import { blocked, GAP, place } from './clearance'
import { dot } from './scene'
import { accent } from './tone'

// 三行 5.5 / 11.5 / 17.5（行线落在 .5 上，整体比几何中心偏上半格），圆点 3.5，线 7–20.5
const rows = [5.5, 11.5, 17.5]
const [start, end] = [7, 20.5]
const dots = rows.map(y => dot(3.5, y))

export const list = [...dots, ...rows.map(y => `M${start} ${y}H${end}`)]

// 带符号的变体（参考 Tabler 的 playlist-add）：去掉圆点，三行往左上收紧（4.5 / 9.5 / 14.5），
// 右下角放一个放大的符号——比文件夹等系列的角标大 BADGE_SCALE 倍，整体读起来是「一半列表、一半符号」，
// 而不是列表上贴一个小角标；每行在离符号 GAP 处截断，碰不到符号的行保持全长
const badgeRows = [4.5, 9.5, 14.5]
const from = 3.5
const BADGE_SCALE = 1.4
// 符号中心最多到 (16.5, 16.5)；符号放大后外形大小不一，大的（如 assets 方块）往左上收，外缘（含半个线宽）不越过离边 2 的安全区
const SAFE = 22
// k：符号在普通角位的缩放（symbols.js 的 cornerScale）；返回实际用的 size 和 center，画符号时用它们
export function listBadge(outline, k, stroke) {
  const size = k * BADGE_SCALE
  const extent = (outline.circle ?? Math.max(outline.box[2], outline.box[3])) * size
  // 按最粗的字重（半线宽 1）算，各字重下符号位置一致
  const c = Math.min(16.5, Math.floor((SAFE - 1 - extent) * 2) / 2)
  const center = [c, c]
  const shape = place(outline, center, size)
  return {
    center,
    size,
    lines: badgeRows.map((y) => {
      const b = blocked(shape, 'x', y, stroke)
      return `M${from} ${y}H${b && b[0] < end ? Math.max(b[0], from) : end}`
    }),
  }
}

// 主次反过来：符号为主时右下角的小列表（圆点 + 三行线，约 7 × 7），作为 cut 让主符号在附近断开
// 行距 3，三行整体比 cy 偏上半格：cy 取整数时行线正好落在 .5 上
const markRows = [-3.5, -0.5, 2.5]
// 它是角标，双色变体里是 accent
export const listMark = ([cx, cy]) => accent([
  ...markRows.map(y => dot(cx - 3.25, cy + y, 1.5)),
  ...markRows.map((y, i) => `M${cx - 1.25} ${cy + y}H${cx + (i === 2 ? 1.5 : 3.5)}`),
])
