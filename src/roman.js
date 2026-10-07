// 罗马数字 Ⅰ–Ⅻ：竖线 I、两撇 V、交叉 X 拼成，上下各一道贯通整个数字的横线（钟面、Unicode Ⅰ–Ⅻ 的样式）
// 字形之间统一隔 3（整数间距，竖线才能都落在 .5 上）；整体以 12 为中心，起点吸到 .5 上，竖线和上下横线都落在 .5 网格
const [TOP, BOTTOM] = [5.5, 18.5]
const WIDTH = { I: 0, V: 6, X: 6 }
const OVERHANG = 1 // 横线两端伸出字形外的长度
const GAP = 3

const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
const ROMAN = Object.fromEntries(NUMERALS.map((s, i) => [i + 1, s]))

function stroke(c, x) {
  if (c === 'I')
    return [`M${x} ${TOP}V${BOTTOM}`]
  if (c === 'V')
    return [`M${x} ${TOP}L${x + 3} ${BOTTOM}L${x + 6} ${TOP}`]
  return [`M${x} ${TOP}L${x + 6} ${BOTTOM}`, `M${x + 6} ${TOP}L${x} ${BOTTOM}`]
}

export function roman(n) {
  const chars = [...ROMAN[n]]
  const width = chars.reduce((w, c) => w + WIDTH[c], 0) + GAP * (chars.length - 1)
  const left = Math.floor(12 - width / 2) + 0.5
  let x = left
  const paths = chars.flatMap((c) => {
    const out = stroke(c, x)
    x += WIDTH[c] + GAP
    return out
  })
  const [l, r] = [left - OVERHANG, left + width + OVERHANG]
  return [`M${l} ${TOP}H${r}`, `M${l} ${BOTTOM}H${r}`, ...paths]
}
