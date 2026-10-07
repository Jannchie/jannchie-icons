// 日历类图标共用：外框 3.5–20.5 × 4.5–20.5，表头线 y = 9.5，两个挂环 x = 7.5 / 16.5
import { blocked, rectAround, rectAroundTop } from './clearance'
import { rounded } from './geometry'

const [l, t, r, b] = [3.5, 4.5, 20.5, 20.5]
export const frame = [[l, t], [r, t], [r, b], [l, b]]
export const header = 'M3.5 9.5H20.5'
export const rings = ['M7.5 3V7', 'M16.5 3V7']
export const base = radius => [rounded(frame, Math.min(radius, 2.5)), header, ...rings]

// 居中符号放在表头下面的格子里（9.5–20.5 的中点）；格子比文件夹本体矮，符号缩到 0.9（对齐网格后相框取 7、书签 5，与其他系列观感一致）
export const center = [12, 15]
export const centerScale = 0.9

// 角标：符号中心从右下角往内收 2.5（与文件夹规则相同），右边和底边在离符号 GAP 处断开
export const badge = [r - 2.5, b - 2.5]
export const calendarAround = (shape, stroke) => rectAround(shape, stroke, [l, t, r, b])
export const aroundBase = (shape, radius, stroke) => [rounded(calendarAround(shape, stroke), Math.min(radius, 2.5), false), header, ...rings]

// 右上角标变体（-badge-top）：和其他系列一样从外框右上角往内收 2.5；外框顶边、右边、表头线在离符号 GAP 处断开。
// 右边那根挂环正好在角标里，不画（放到表头下面的格子里时，挂环会直插进角标上方，外框右上还剩一截，很乱）；
// 只剩左边一根挂环 + 表头，仍然认得出是日历
const HEADER = 9.5
export const badgeTop = [r - 2.5, t + 2.5]
export function aroundTop(shape, radius, stroke) {
  const head = blocked(shape, 'x', HEADER, stroke)
  return [
    rounded(rectAroundTop(shape, stroke, [l, t, r, b]), Math.min(radius, 2.5), false),
    `M${l} ${HEADER}H${head ? head[0] : r}`,
    rings[0],
  ]
}
