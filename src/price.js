// 价格档位（1–4 档，便宜 → 贵）：两种画法，每种按货币各一套
// - 符号行（price-<货币>-<档>）：Google Maps / Yelp 的「$ $$ $$$ $$$$」——四个字位排成一行，
//   亮着的档画窄高的货币符号，没亮的档只留一个圆点（单色下没有「变灰」，用圆点占位）
// - 硬币堆（price-coins-<货币>-<档>）：底下四层扁硬币，亮着的层画出轮廓，没亮的层只留一排圆点；
//   最上面立一枚正面朝前、带货币符号的硬币，固定在满堆的位置
import { circle, rounded } from './geometry'
import { coin } from './money'
import { snap } from './letters'
import { dot } from './scene'
import { affine } from './transform'

export const LEVELS = [1, 2, 3, 4]

// 符号行：四个字位中心和 signal 的四根竖条一样在 4.5 / 9.5 / 14.5 / 19.5，间距 5；
// 符号只有 3 宽（中线），常规线宽下相邻两个之间还空 0.5。字身 6.5–17.5，$ 的上下短竖出头到 4.5–19.5
const SLOTS = [4.5, 9.5, 14.5, 19.5]
const [T, B] = [6.5, 17.5]
const MID = (T + B) / 2

// 窄字形：以字位中心 c 画，左右各 1.5。₩ 和 ₿ 不做：W 的四笔、B 加四根短竖都挤不进 3 宽
const NARROW = {
  // $：S（上下两段椭圆弧）+ 上下各一小截竖笔；竖笔贯穿的话 3 宽的 S 里塞不下
  dollar: c => [`M${c + 1.5} ${T + 1.5}A1.5 2.75 0 1 0 ${c} ${MID}A1.5 2.75 0 1 1 ${c - 1.5} ${B - 1.5}`, `M${c} ${T - 2}V${T}`, `M${c} ${B}V${B + 2}`],
  // €：C 往右靠，两道横从 C 左边伸出去（横的高度上邻字只有自己的横，可以多伸 0.25）
  euro: c => [`M${c + 1.5} ${T + 1}A2 2 0 0 0 ${c - 1} ${T + 2.5}V${B - 2.5}A2 2 0 0 0 ${c + 1.5} ${B - 1}`, `M${c - 1.75} ${MID - 1.25}H${c + 0.75}`, `M${c - 1.75} ${MID + 1.25}H${c + 0.75}`],
  // ¥：Y 的分叉在中线略上，下面留出两道横的位置
  yen: c => [`M${c - 1.5} ${T}L${c} ${MID - 1}L${c + 1.5} ${T}`, `M${c} ${MID - 1}V${B}`, `M${c - 1.5} ${MID + 0.5}H${c + 1.5}`, `M${c - 1.5} ${MID + 2.75}H${c + 1.5}`],
  // £：上方弯钩落成竖笔，底部向左收尾；中间一道横
  pound: c => [`M${c + 1.5} ${T + 1.5}A2 2 0 0 0 ${c - 1} ${T + 2.5}V${B - 1.5}A1 1.5 0 0 1 ${c - 1.5} ${B}H${c + 1.5}`, `M${c - 1.5} ${MID}H${c + 1}`],
  // ₹：两道横，半圆碗，再一笔斜落
  rupee: c => [`M${c - 1.5} ${T}H${c + 1.5}`, `M${c - 1.5} ${T + 3}H${c + 1.5}`, `M${c - 0.75} ${T}A2.25 2.5 0 0 1 ${c - 0.75} ${T + 5}H${c - 1.5}L${c + 1.5} ${B}`],
  // ₽：P 的竖笔靠左，碗到 1.5，底下一道横
  ruble: c => [`M${c - 0.75} ${B}V${T}A2.25 2.5 0 0 1 ${c - 0.75} ${T + 5}H${c - 1.5}`, `M${c - 1.5} ${T + 7.5}H${c + 1}`],
}
export const ROW_CURRENCIES = Object.keys(NARROW)
export const COIN_CURRENCIES = ['dollar', 'euro', 'yen', 'pound', 'won', 'rupee', 'ruble', 'bitcoin']

export const priceRow = (key, level) => SLOTS.flatMap((c, i) => (i < level ? snap(NARROW[key](c)) : [dot(c, MID)]))

// 硬币堆：四层扁硬币从底边往上叠，每层高 3；外框墨迹左右在 3 / 21、底边在 22，横线跟着线宽往里收，墨迹边缘都落在整数上；
// 立着的硬币直径 11（墨迹 2–13），固定在满堆的位置、挡在堆的前面：被它挡住的横线在硬币两侧断开
const PITCH = 3
const [CY, CR] = [7.5, 5.5] // 硬币圆心、外沿墨迹半径
const S = 0.65
export function priceCoins(key, level, { radius, stroke }) {
  const h = stroke / 2
  const [L, R] = [3 + h, 21 - h]
  const bottom = 22 - h
  const top = bottom - PITCH * 4
  const lit = bottom - PITCH * level
  const r = Math.min(radius, 1)
  // y 处的横线被硬币挡住的半宽：线头（含圆头）离硬币墨迹至少 0.75；不相交时为 0
  const reach = CR + 0.75 + h
  const hidden = y => (Math.abs(y - CY) < reach ? Math.sqrt(reach ** 2 - (y - CY) ** 2) : 0)
  const box = [[R, lit], [R, bottom], [L, bottom], [L, lit]]
  const w = hidden(lit)
  const lines = Array.from({ length: level - 1 }, (_, i) => lit + PITCH * (i + 1))
  const stack = [
    w ? rounded([[12 + w, lit], ...box, [12 - w, lit]], r, false) : rounded(box, r),
    ...lines.map(y => (hidden(y) ? `M${L} ${y}H${12 - hidden(y)}M${12 + hidden(y)} ${y}H${R}` : `M${L} ${y}H${R}`)),
  ]
  // 没亮的层：只在左右两侧各留一个点，竖着连起来像堆的虚线轮廓
  const ghosts = Array.from({ length: 4 - level }, (_, i) => top + PITCH * (i + 0.5)).flatMap(y => [dot(L, y), dot(R, y)])
  // 硬币里放缩小的货币符号：硬币图标里的 0.6 倍再缩 S 倍，细线
  const glyph = snap(coin(key).map(d => affine(d, S, S, 12 - 12 * S, CY - 12 * S))).map(d => ({ d, detail: true }))
  return [...stack, ...ghosts, circle(12, CY, CR - h), ...glyph]
}
