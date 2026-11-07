// 书类图标共用：封面（左边是圆弧收口的书脊）+ 书脊下方一道页线
// 墨迹框左右 4–20、上下 2–22，以画布中线对称；线宽变粗时外缘不动、往里长（见 docs/design.md），h 是半个线宽
// 页线在封面底边上方 5（线宽 1 时落在 16.5 上）；封面左上角是半径 2.5 的书脊圆弧，左下角圆角 1.5
// 页线从书脊处顺着竖边起笔（起点切线朝上，比左下圆角的起点高 1），线头落在竖边的直段里，尖角模式下不会从左下圆角外侧冒出来
import { fillDraw, fillSymbol, ledgeBelow } from './badge-room'
import { blocked } from './clearance'
import { asBadge, fitBadge, roomOnBottom } from './corner'
import { badgeFill, solid } from './solid'

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
export const centerScale = 1.25

// 右上角标比普通角标大 GROW 倍，和文件夹等系列一样（16px 下也认得出符号）；放不下时 fitBadge 再缩回去
const GROW = 1.3

// 右上角标（-badge-top）：符号墨迹的右缘贴到封面右边的外缘 20，上缘贴到封面顶边的外缘 2；顶边、右边在离符号 GAP 处断开，页线不受影响
export function withBadgeTop(name, draw, tone, radius, stroke, { fill = false } = {}) {
  const f = frame(stroke)
  const fit = (n, d, more = () => true) => fitBadge(n, d, radius, stroke, { right: 20, top: 2 }, s => roomOnBottom(stroke, f.t, f.l + 2.5)(s) && more(s), GROW)
  // 实心版：主体在角标四周让出一圈缝、朝右上整片让掉，角标画回去；角标下面到页线挖出的缝（封面墨迹下缘 page − h）
  // 要留一段够厚的封面，不然页线上面只剩一道细条（见 badge-room.js）
  if (fill) {
    const { k, at } = fit(...fillSymbol(name, draw), ledgeBelow(stroke, f.page - stroke / 2))
    return badgeFill(fillParts(radius, stroke), asBadge(tone(fillDraw(name, draw)(at, k, radius)), name), 'top')
  }
  const { k, at, shape } = fit(name, draw)
  const right = blocked(shape, 'y', f.r, stroke)
  const top = blocked(shape, 'x', f.t, stroke)
  return [
    `M${f.r} ${right ? right[1] : f.t}V${f.b}${spine(f)}H${top ? top[0] : f.r}`,
    pageLine(f, f.r),
    ...asBadge(tone(draw(at, k, radius)), name),
  ]
}

// 实心版（见 solid.js 的 plainFill / badgeFill / centerFill）：封面和书页各画一块，中间隔一道线宽的缝（和描边版页线挖空的宽度一样）。
// 不再沿页线挖：页线在书脊处顺着竖边起笔，挖出来的缝贴着左边的外缘收尖，封面左下剩一根细尖、书页左上剩一道发丝；
// 改成缝从左到右整条穿过：封面墨迹到 page − h，下面两角是直角；书页墨迹 page + h 到 22（高 5），
// 左上角墨迹半径 2.5（呼应描边版页线的卷边）、左下角和描边版一样 1.5 + h，右边两角是直角
export function fillParts(radius, stroke) {
  const { l, t, r, b, page: y } = frame(stroke)
  const h = stroke / 2
  const top = `M${r} ${y - stroke}H${l}V${t + 2.5}A2.5 2.5 0 0 1 ${l + 2.5} ${t}H${r}Z`
  const q = 2.5 - h
  const pages = `M${r} ${y + stroke}V${b}H${l + 1.5}A1.5 1.5 0 0 1 ${l} ${b - 1.5}V${y + stroke + q}A${q} ${q} 0 0 1 ${l + q} ${y + stroke}Z`
  return { body: [solid(top), solid(pages)], lines: [] }
}
