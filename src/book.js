// 书类图标共用：封面 5.5–19.5 × 3.5–20.5（左边是圆弧收口的书脊），书脊下方一道页线（15.5）
// 页线从书脊 (5.5, 18) 处顺着竖边起笔（起点切线朝上），线头朝下伸半个线宽；封面左下角的圆角取 1.5（竖边直到 19），
// 线头落在竖边的直段里，尖角模式下不会从左下圆角外侧冒出来（原来圆角 2.5，竖边只到 18）
import { blocked } from './clearance'

const [l, t, r, b] = [5.5, 3.5, 19.5, 20.5]
const PAGE = 15.5
export const cover = `M${l} 19V6A2.5 2.5 0 0 1 8 ${t}H${r}V${b}H7A1.5 1.5 0 0 1 ${l} 19Z`
export const page = `M${l} 18A2.5 2.5 0 0 1 8 ${PAGE}H${r}`
export const plain = () => [cover, page]

// 居中符号放在封面（页线以上，5.5–19.5 × 3.5–15.5）的中间
export const center = [12.5, 9.5]
export const centerScale = 0.8

// 角标：符号中心从右下角往内收 2.5；右边、底边、页线在离符号 GAP 处断开（碰不到就画满）
export const badge = [r - 2.5, b - 2.5]
export function aroundBase(shape, radius, stroke) {
  const right = blocked(shape, 'y', r, stroke)
  const bottom = blocked(shape, 'x', b, stroke)
  const cut = blocked(shape, 'x', PAGE, stroke)
  return [
    `M${bottom ? bottom[0] : r} ${b}H7A1.5 1.5 0 0 1 ${l} 19V6A2.5 2.5 0 0 1 8 ${t}H${r}V${right ? right[0] : b}`,
    `M${l} 18A2.5 2.5 0 0 1 8 ${PAGE}H${cut ? cut[0] : r}`,
  ]
}

// 右上角标变体（-badge-top）：符号中心从封面右上角往内收 2.5；顶边、右边在离符号 GAP 处断开，页线不受影响
export const badgeTop = [r - 2.5, t + 2.5]
export function aroundTop(shape, radius, stroke) {
  const right = blocked(shape, 'y', r, stroke)
  const top = blocked(shape, 'x', t, stroke)
  return [
    `M${r} ${right ? right[1] : t}V${b}H7A1.5 1.5 0 0 1 ${l} 19V6A2.5 2.5 0 0 1 8 ${t}H${top ? top[0] : r}`,
    page,
  ]
}
