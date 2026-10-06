// 邮件类图标共用：外框与文件夹一致（3–21 × 5–19），封口是 30° 的 V
import { rectAround } from './clearance'
import { badge } from './folder'
import { rounded } from './geometry'

const [l, t, r, b] = [3, 5, 21, 19]
export const envelope = [[l, t], [r, t], [r, b], [l, b]]

// 封口从两侧墙顶边往下 2.5 处起（避开最大 3 的圆角弧），以 30° 收到中间
const flapY = t + 2.5
const flapDepth = (r - l) / 2 * Math.tan(Math.PI / 6)
export const flap = radius => rounded([[l, flapY], [12, flapY + flapDepth], [r, flapY]], Math.min(radius, 1.5), false)

// 角标变体：右下角与文件夹角标同位置，右边和底边在离符号 GAP 处断开
export { badge }
export const envelopeAround = (shape, stroke) => rectAround(shape, stroke, [l, t, r, b])
