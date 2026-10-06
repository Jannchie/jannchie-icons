// 日历类图标共用：外框 3.5–20.5 × 5–20.5，表头线 y = 10，两个挂环
import { rectAround } from './clearance'
import { rounded } from './geometry'

const [l, t, r, b] = [3.5, 5, 20.5, 20.5]
export const frame = [[l, t], [r, t], [r, b], [l, b]]
export const header = 'M3.5 10H20.5'
export const rings = ['M8 3V7', 'M16 3V7']
export const base = radius => [rounded(frame, Math.min(radius, 2.5)), header, ...rings]

// 居中符号放在表头下面的格子里（10–20.5 的中点）；格子比文件夹本体矮，符号缩到 0.85
export const center = [12, 15.25]
export const centerScale = 0.85

// 角标：符号中心从右下角往内收 2.5（与文件夹规则相同），右边和底边在离符号 GAP 处断开
export const badge = [r - 2.5, b - 2.5]
export const calendarAround = (shape, stroke) => rectAround(shape, stroke, [l, t, r, b])
export const aroundBase = (shape, radius, stroke) => [rounded(calendarAround(shape, stroke), Math.min(radius, 2.5), false), header, ...rings]
