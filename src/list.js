// 列表类图标共用：三个圆点 + 三行线
import { blocked, GAP, place } from './clearance'
import { dot } from './scene'

// 外框居中：三行 5.5 / 12 / 18.5，圆点 3.5，线 7–20.5（算上线宽，左右上下留白相同）
const rows = [5.5, 12, 18.5]
const [start, end] = [7, 20.5]
const dots = rows.map(y => dot(3.5, y))

export const list = [...dots, ...rows.map(y => `M${start} ${y}H${end}`)]

// 带符号的变体（参考 Tabler 的 playlist-add）：去掉圆点，三行往左上收紧（4 / 9.5 / 15），
// 符号放在右下角 (17.5, 17.5)；每行在离符号 GAP 处截断，碰不到符号的行保持全长
const badgeRows = [4, 9.5, 15]
const from = 3.5
const center = [17.5, 17.5]
export function listBadge(outline, k, stroke) {
  const shape = place(outline, center, k)
  return {
    center,
    lines: badgeRows.map((y) => {
      const b = blocked(shape, 'x', y, stroke)
      return `M${from} ${y}H${b && b[0] < end ? Math.max(b[0], from) : end}`
    }),
  }
}

// 主次反过来：符号为主时右下角的小列表（圆点 + 三行线，约 7 × 7），作为 cut 让主符号在附近断开
export const listMark = ([cx, cy]) => [
  ...[-2.5, 0, 2.5].map(y => dot(cx - 3.25, cy + y, 1.5)),
  ...[-2.5, 0, 2.5].map((y, i) => `M${cx - 1.25} ${cy + y}H${cx + (i === 2 ? 1.5 : 3.5)}`),
]
