// 文件类图标共用：纸张 + 右上 45° 折角
// 墨迹框左右 4.5–19.5、上下 3–21，以画布中线对称；线宽变粗时外缘不动、往里长（见 docs/design.md），h 是半个线宽
// 宽 15、高 18 都是 3 的倍数：16px 下（1 单位 = 2/3 像素）四条外缘能同时落在像素边界上，24px 下整体平移半格后左右也同相位
// （原来 4–20 × 2–22，16px 下右边和底边总是发灰）。左右外缘是 .5，细字重下网格审计会提示 x 5 / x 19，是有意的取舍
// 折角：翻折线（竖线 x FOLD_X、横线 y FOLD_Y）是固定的中心线，不随线宽动；纸张的斜边从 (FOLD_X, 顶边) 连到 (右边, FOLD_Y)，
// 两端各随线宽收半个线宽，所以始终是 45°（常规线宽下折角 4.5）。
// 翻折线的中心线取在 .75 上（14.25 / 8.25）：常规线宽 1.5 在 16px 下是 1 像素，中心线在 .75 + 1.5n 上才正好占满一列像素
import { fillDraw, fillSymbol, ledgeAbove } from './badge-room'
import { blocked } from './clearance'
import { asBadge, fitBadge, roomOnBottom, roomOnRight } from './corner'
import { crisp, rounded } from './geometry'
import { badgeFill, knock, solid } from './solid'

const FOLD_X = 14.25
const FOLD_Y = 6.75

export function frame(stroke) {
  const h = stroke / 2
  return { h, l: 4.5 + h, t: 1.5 + h, r: 19.5 - h, b: 22.5 - h }
}

// 折角两处转角固定小圆角
const corner = (stroke, radius) => {
  const { t, r } = frame(stroke)
  return [[FOLD_X, t, crisp(radius)], [r, FOLD_Y, crisp(radius)]]
}

// 完整的纸张轮廓
export function page(stroke, radius) {
  const { l, t, r, b } = frame(stroke)
  return [[l, t], ...corner(stroke, radius), [r, b], [l, b]]
}

// 翻折线：从折角的上端竖直落下，再水平到右边
export function flap(stroke) {
  const { t, r } = frame(stroke)
  return `M${FOLD_X} ${t}V${FOLD_Y}H${r}`
}

// 居中符号的中心：折角以下纸张部分（翻折线墨迹下缘 9 到底边内缘 19.5）的中点 14.25
export const center = [12, 13.5]
// 纸张内部 12 宽、折角以下 10.5 高，符号放大到 1.2 倍（约 8.4 见方），四周各留 1 以上
export const centerScale = 1.3

// 角标：符号墨迹的右缘贴到纸张外缘 20、下缘贴到 22；右边和底边在离符号 GAP 处断开，轮廓从底边的断口出发绕一圈到右边的断口
// 角标比普通角标大 GROW 倍，和文件夹一样（16px 下也认得出符号）；放不下时 fitBadge 再缩回去
const GROW = 1.3

export function withBadge(name, draw, tone, radius, stroke, { fill = false } = {}) {
  const { l, t, r, b } = frame(stroke)
  const fit = (n, d, more = () => true) => fitBadge(n, d, radius, stroke, { right: 20, bottom: 22 }, s => roomOnRight(stroke, r, FOLD_Y)(s) && roomOnBottom(stroke, b, l)(s) && more(s), GROW)
  // 实心版：主体在角标四周让出一圈缝、朝右下整片让掉，角标画回去；角标上面到翻折线挖出的缝（FOLD_Y + h）
  // 要留一段够厚的纸，不然折角下面只剩一道细条（见 badge-room.js）
  if (fill) {
    const { k, at } = fit(...fillSymbol(name, draw), ledgeAbove(stroke, FOLD_Y + stroke / 2))
    return badgeFill(fillParts(radius, stroke), asBadge(tone(fillDraw(name, draw)(at, k, radius)), name), 'bottom')
  }
  const { k, at, shape } = fit(name, draw)
  const right = blocked(shape, 'y', r, stroke)
  const bottom = blocked(shape, 'x', b, stroke)
  const outline = [[bottom ? bottom[0] : r, b], [l, b], [l, t], ...corner(stroke, radius), [r, right ? right[0] : b]]
  return [rounded(outline, radius, false), flap(stroke), ...asBadge(tone(draw(at, k, radius)), name)]
}

// 格式标签：只画纸张上半部分（侧边在 y = 12 收住），下方 14.5–21.5 写扩展名（标签字形 7 高，墨迹底边约在 22）
export function pageTop(stroke, radius) {
  const { l, t, r } = frame(stroke)
  return [[l, 12], [l, t], ...corner(stroke, radius), [r, 12]]
}
// 字母排版区 5–19（label 会按字数再往左右放宽：三个字母以内各放宽 1，四个字母各放宽 2.5）
export const labelBox = { left: 5, right: 19, top: 14.5, bottom: 21.5 }
// 四个字母的扩展名：label 放宽 2.5 后会排到 2.5–21.5，笔画吸附网格后墨迹会到离画布边 1.5；
// 这里把排版区收窄 0.5，放宽后是 3–21，墨迹不越过离边 2
export const wideLabelBox = { ...labelBox, left: 5.5, right: 18.5 }

// 实心版挖的翻折线：两头各穿出外框一个线宽（停在顶边、右边的中心线上的话，线帽只是擦到外缘，切口那里会留一根发丝）
export function flapCut(stroke) {
  const { t, r } = frame(stroke)
  return `M${FOLD_X} ${t - stroke}V${FOLD_Y}H${r + stroke}`
}

// 实心版（见 solid.js 的 plainFill / badgeFill / centerFill）：纸张一块，挖掉翻折线，折角成了单独的一小块三角
export const fillParts = (radius, stroke) => ({ body: [solid(rounded(page(stroke, radius), radius)), knock(flapCut(stroke))], lines: [] })
