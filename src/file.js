// 文件类图标共用：纸张 + 右上 45° 折角
// 墨迹框左右 4–20、上下 2–22：竖向贴到 2，横向 16 宽、以画布中线对称；线宽变粗时外缘不动、往里长（见 docs/design.md），h 是半个线宽
// 线宽 1 时纸张四边的中心线是 4.5 / 19.5 / 2.5 / 21.5，都落在 .5 上
// 折角：翻折线（竖线 x FOLD_X、横线 y FOLD_Y）是固定的中心线，不随线宽动；纸张的斜边从 (FOLD_X, 顶边) 连到 (右边, FOLD_Y)，
// 两端各随线宽收半个线宽，所以始终是 45°（线宽 1 时折角 5）
import { blocked, place } from './clearance'
import { cornerCenter } from './corner'
import { crisp, rounded } from './geometry'
import { cornerScale, outlines } from './symbols'

const FOLD_X = 14.5
const FOLD_Y = 7.5

export function frame(stroke) {
  const h = stroke / 2
  return { h, l: 4 + h, t: 2 + h, r: 20 - h, b: 22 - h }
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

// 居中符号的中心：折角以下纸张部分（7.5–22）的中点偏上一点，和整张纸的中点 12 之间取 13.5，
// 上下看起来都不挤（和文件夹的 center 同高）
export const center = [12, 13.5]

// 角标：符号墨迹的右缘贴到纸张外缘 20、下缘贴到 22；右边和底边在离符号 GAP 处断开，轮廓从底边的断口出发绕一圈到右边的断口
export function withBadge(name, draw, tone, radius, stroke) {
  const { l, t, r, b } = frame(stroke)
  const k = cornerScale[name]
  const at = cornerCenter(draw, k, radius, stroke, { right: 20, bottom: 22 })
  const shape = place(outlines[name], at, k)
  const right = blocked(shape, 'y', r, stroke)
  const bottom = blocked(shape, 'x', b, stroke)
  const outline = [[bottom ? bottom[0] : r, b], [l, b], [l, t], ...corner(stroke, radius), [r, right ? right[0] : b]]
  return [rounded(outline, radius, false), flap(stroke), ...tone(draw(at, k, radius))]
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
