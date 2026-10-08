// 书类图标共用：封面（左边是圆弧收口的书脊）+ 书脊下方一道页线
// 墨迹框左右 4–20、上下 2–22，以画布中线对称；线宽变粗时外缘不动、往里长（见 docs/design.md），h 是半个线宽
// 页线在封面底边上方 5（线宽 1 时落在 16.5 上）；封面左上角是半径 2.5 的书脊圆弧，左下角圆角 1.5
// 页线从书脊处顺着竖边起笔（起点切线朝上，比左下圆角的起点高 1），线头落在竖边的直段里，尖角模式下不会从左下圆角外侧冒出来
import { blocked, place } from './clearance'
import { cornerCenter, fitBadge, roomOnRight } from './corner'
import { cornerScale, outlines } from './symbols'

function frame(stroke) {
  const h = stroke / 2
  const [l, t, r, b] = [4 + h, 2 + h, 20 - h, 22 - h]
  return { l, t, r, b, page: b - 5 }
}

// 封面轮廓的各段：左下圆角 → 左边 → 书脊圆弧 → 顶边（不含终点），以及从左下圆角起笔的底边
const spine = ({ l, t, b }) => `H${l + 1.5}A1.5 1.5 0 0 1 ${l} ${b - 1.5}V${t + 2.5}A2.5 2.5 0 0 1 ${l + 2.5} ${t}`
const pageLine = ({ l, page }, to) => `M${l} ${page + 2.5}A2.5 2.5 0 0 1 ${l + 2.5} ${page}H${to}`

export function cover(stroke) {
  const f = frame(stroke)
  return `M${f.r} ${f.b}${spine(f)}H${f.r}Z`
}
export const pageY = stroke => frame(stroke).page
export const page = (stroke, to) => pageLine(frame(stroke), to ?? frame(stroke).r)
// 封面不跟随圆角设置（书脊本身就是圆弧），radius 只为和其他系列的 base 同签名
export const plain = (radius, stroke) => [cover(stroke), page(stroke)]

// 封面（页线以上）的中心，放居中符号用：顶边和页线都随线宽各收半个线宽，中点不变（9.5）
export const center = [12, 9.5]
// 封面中心线约 14.5 × 13.5，比文件夹本体还宽裕，符号和文件夹里一样大
export const centerScale = 1

// 角标：符号墨迹的右缘、下缘贴到封面右下角的外缘（20, 22）；右边、底边、页线在离符号 GAP 处断开（碰不到就画满）
export function withBadge(name, draw, tone, radius, stroke) {
  const f = frame(stroke)
  const { k, at, shape } = fitBadge(name, draw, radius, stroke, { right: 20, bottom: 22 }, roomOnRight(stroke, f.r, f.t))
  const right = blocked(shape, 'y', f.r, stroke)
  const bottom = blocked(shape, 'x', f.b, stroke)
  const cut = blocked(shape, 'x', f.page, stroke)
  return [
    `M${bottom ? bottom[0] : f.r} ${f.b}${spine(f)}H${f.r}V${right ? right[0] : f.b}`,
    pageLine(f, cut ? cut[0] : f.r),
    ...tone(draw(at, k, radius)),
  ]
}

// 右上角标（-badge-top）：符号墨迹的右缘贴到封面右边的外缘 20，上缘贴到封面顶边的外缘 2；顶边、右边在离符号 GAP 处断开，页线不受影响
export function withBadgeTop(name, draw, tone, radius, stroke) {
  const f = frame(stroke)
  const k = cornerScale[name]
  const at = cornerCenter(draw, k, radius, stroke, { right: 20, top: 2 })
  const shape = place(outlines[name], at, k)
  const right = blocked(shape, 'y', f.r, stroke)
  const top = blocked(shape, 'x', f.t, stroke)
  return [
    `M${f.r} ${right ? right[1] : f.t}V${f.b}${spine(f)}H${top ? top[0] : f.r}`,
    pageLine(f, f.r),
    ...tone(draw(at, k, radius)),
  ]
}
