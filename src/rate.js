// 倍率文字（×0.5、×2 …）：乘号 + 数字 + 小数点，按总宽自动缩放，整体居中
// 字形只有字母和数字，乘号是一个小叉、小数点是一个点，单独画
import { glyph } from './letters'
import { dot } from './scene'

const CROSS = 0.65 // 乘号宽度（相对字高）
const POINT = 0.3 // 小数点占的宽度（相对字高）
const GAP = 0.18 // 字符间距（相对字高）

export function rate(text) {
  const chars = ['x', ...text]
  // 字高 h 时的总宽
  const widthAt = h => chars.reduce((w, c) => w + (c === 'x' ? CROSS : c === '.' ? POINT : 3.5 / 6) * h, 0) + GAP * h * (chars.length - 1)
  const h = Math.min(9.5, 19 / (widthAt(1)))
  let x = 12 - widthAt(h) / 2
  const top = 12 - h / 2
  const out = []
  for (const c of chars) {
    if (c === 'x') {
      const s = CROSS * h
      const [cx, cy] = [x + s / 2, top + h * 0.6]
      out.push(`M${cx - s / 2} ${cy - s / 2}L${cx + s / 2} ${cy + s / 2}`, `M${cx + s / 2} ${cy - s / 2}L${cx - s / 2} ${cy + s / 2}`)
      x += s
    }
    else if (c === '.') {
      out.push(dot(x + POINT * h / 2, top + h - 0.25))
      x += POINT * h
    }
    else {
      out.push(glyph(c, x, top, h / 6))
      x += 3.5 / 6 * h
    }
    x += GAP * h
  }
  return out
}
