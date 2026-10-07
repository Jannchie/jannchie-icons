// 倍率文字（×0.5、×2 …）：乘号 + 数字 + 小数点，整体居中
// 整组共用同一个字高、基线和乘号大小，放在一起高低一致；放不下时只把数字横向压窄，不缩字高
// 字形只有字母和数字，乘号是一个小叉、小数点是一个点，单独画
import { advance, glyph, shift, snap } from './letters'
import { dot } from './scene'

const H = 7 // 字高：数字占 8.5–15.5，竖直居中
const TOP = 12 - H / 2
const CROSS = 4.2 // 乘号边长，中心对齐数字的半高
const GAP = 1.75 // 字符间距：粗字重（线宽 2）下也不粘连
const POINT = 1 // 小数点占的宽度；两边的间距放宽到 POINT_GAP，粗字重下的大圆点也不贴数字
const POINT_GAP = 2
const MAX_WIDTH = 21 // 最宽的 ×1.25 撑满 1.5–22.5
const ASPECT = 0.95 // 数字不压窄时的宽高比，和分级图标一样

export function rate(text) {
  const chars = ['x', ...text]
  const gapAfter = i => (chars[i] === '.' || chars[i + 1] === '.' ? POINT_GAP : GAP)
  const fixed = chars.reduce((w, c, i) => w + (c === 'x' ? CROSS : c === '.' ? POINT : 0) + (i < chars.length - 1 ? gapAfter(i) : 0), 0)
  const units = chars.reduce((w, c) => w + (c === 'x' || c === '.' ? 0 : advance(c)), 0)
  const sy = H / 6
  const sx = Math.min(sy * ASPECT, (MAX_WIDTH - fixed) / units)
  let x = 12 - (fixed + units * sx) / 2
  const out = []
  chars.forEach((c, i) => {
    if (c === 'x') {
      const [cx, cy, h] = [x + CROSS / 2, 12, CROSS / 2]
      out.push(`M${cx - h} ${cy - h}L${cx + h} ${cy + h}`, `M${cx + h} ${cy - h}L${cx - h} ${cy + h}`)
      x += CROSS
    }
    else if (c === '.') {
      out.push(dot(x + POINT / 2, TOP + H - 0.25))
      x += POINT
    }
    else {
      out.push(glyph(c, x - shift(c) * sx, TOP, sx, sy))
      x += advance(c) * sx
    }
    x += gapAfter(i)
  })
  // 数字的横竖笔画整组对齐像素网格（乘号、小数点跟着一起挪）
  return snap(out)
}
