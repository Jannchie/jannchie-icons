// 日历类图标共用：外框 + 表头线 + 两个挂环
// 墨迹框左右 3–21（方形主体收到 3）、上下 2–22（挂环顶在 2、外框底在 22），以画布中线对称；
// 线宽变粗时外缘不动、往里长（见 docs/design.md），h 是半个线宽
// 外框墨迹 3–21 × 4–22；表头线在外框顶边下 5（线宽 1 时落在 9.5 上）；挂环 x 7.5 / 16.5，从 2 往下穿过顶边，停在离表头线 2.5 处
import { fillDraw, fillSymbol, inkBox, ledgeAbove } from './badge-room'
import { GAP, rectAround } from './clearance'
import { asBadge, fitBadge, roomOnBottom, roomOnRight } from './corner'
import { rounded } from './geometry'
import { badgeFill, cutout, knock, solid } from './solid'

const RINGS = [7.5, 16.5]
const R = 2.5 // 外框圆角上限

function frame(stroke) {
  const h = stroke / 2
  const [l, t, r, b] = [3 + h, 4 + h, 21 - h, 22 - h]
  const head = t + 5
  return { h, l, t, r, b, head, ringEnd: head - 2.5 }
}

const ring = (x, stroke) => `M${x} ${2 + stroke / 2}V${frame(stroke).ringEnd}`

export function base(radius, stroke) {
  const { l, t, r, b, head } = frame(stroke)
  return [rounded([[l, t], [r, t], [r, b], [l, b]], Math.min(radius, R)), `M${l} ${head}H${r}`, ...RINGS.map(x => ring(x, stroke))]
}

// 格子区（表头线到底边）的中心，放居中符号用：表头线和底边都随线宽各收半个线宽，中点不变（15.5）
export const center = [12, 15.5]
// 格子区比文件夹本体矮（常规线宽下中心线高 11.5，文件夹本体 13.5），符号缩到 0.9，粗线宽下才不顶到表头线和底边
export const centerScale = 1.05

// 角标：符号墨迹的右缘、下缘贴到外框右下角的外缘（21, 22）；右边和底边在离符号 GAP 处断开
// 角标比普通角标大 GROW 倍，和文件夹一样（16px 下也认得出符号）；放不下时 fitBadge 再缩回去
const GROW = 1.3

export function withBadge(name, draw, tone, radius, stroke, { fill = false } = {}) {
  const { h, l, t, r, b, head } = frame(stroke)
  const fit = (n, d, more = () => true) => fitBadge(n, d, radius, stroke, { right: 21, bottom: 22 }, s => roomOnRight(stroke, r, head)(s) && roomOnBottom(stroke, b, l)(s) && more(s), GROW)
  // 实心版：主体在角标四周让出一圈缝、朝右下整片让掉，角标画回去；角标上面到表头线挖出的缝（格子区墨迹上缘 head + h）
  // 要留一段够厚的格子区，不然表头下面只剩一道细条（见 badge-room.js）。
  // 缩到最小还差得多的（锁、拼图这类缩放吸在网格上、缩不下去的符号，粗线宽下的大符号），那一条整个让掉：
  // 从角标让位的左缘往右、表头线的缝往下全部挖空，格子区收成左边完整的一块，角标单独占右下
  if (fill) {
    const { k, at, shape } = fit(...fillSymbol(name, draw), ledgeAbove(stroke, head + h))
    const parts = fillParts(radius, stroke)
    if (!ledgeAbove(stroke, head + h, 0.5)(shape)) {
      const x = inkBox(shape, stroke)[0] - GAP
      parts.body.push(cutout(`M${x} ${head}H${r + stroke}V${b + stroke}H${x}Z`))
    }
    return badgeFill(parts, asBadge(tone(fillDraw(name, draw)(at, k, radius)), name), 'bottom')
  }
  const { k, at, shape } = fit(name, draw)
  const outline = rectAround(shape, stroke, [l, t, r, b])
  // 高的符号（插头、拼图）让右边断到表头线下面不远处：剩下不到 1.5 的一小截像表头线下挂的毛刺，
  // 右边就停在表头线上，并和表头线连成一笔拐过去（分开画的话，尖角模式下表头线的方头会从右边外侧冒出来）
  const end = outline.at(-1)
  const turn = end[1] < head + 1.5
  if (turn)
    end[1] = head
  return [
    ...(turn ? [`${rounded(outline, Math.min(radius, R), false)}H${l}`] : [rounded(outline, Math.min(radius, R), false), `M${l} ${head}H${r}`]),
    ...RINGS.map(x => ring(x, stroke)),
    ...asBadge(tone(draw(at, k, radius)), name),
  ]
}

// 实心版（见 solid.js 的 plainFill / badgeFill / centerFill）：外框一块，表头线整条挖穿，表头和格子区分成两块。挂环照旧是线
export function fillParts(radius, stroke) {
  const { l, t, r, b, head } = frame(stroke)
  return {
    body: [solid(rounded([[l, t], [r, t], [r, b], [l, b]], Math.min(radius, R))), knock(`M${l - stroke} ${head}H${r + stroke}`)],
    lines: RINGS.map(x => ring(x, stroke)),
  }
}
