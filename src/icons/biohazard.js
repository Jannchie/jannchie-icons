import { circle } from '../geometry'

// 生物危害：三个朝外开口的 C 形圆弧（圆心离中心 6.25、半径 4.75、开口半角 40°），在中心互相交叠，中间一个小圆
// 真实标志的月牙在 24 格里太窄，描不出内外两条边，这里每片月牙只画一条中线；交叠处的断线交给 finalize
// 圆心 y 取 13：上下端点 3.1–20.9，图形上下居中
const cy = 13
const [a, r, open] = [6.25, 4.75, 40]
const rad = deg => deg * Math.PI / 180
const at = (cx, cy, r, deg) => `${cx + r * Math.cos(rad(deg))} ${cy + r * Math.sin(rad(deg))}`
const blade = (mid) => {
  const [cx, cy0] = [12 + a * Math.cos(rad(mid)), cy + a * Math.sin(rad(mid))]
  return `M${at(cx, cy0, r, mid + open)}A${r} ${r} 0 1 1 ${at(cx, cy0, r, mid - open)}`
}
export default () => [blade(-90), blade(30), blade(150), circle(12, cy, 1.5)]
