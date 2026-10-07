import { circle } from '../geometry'
import { glyph, LABEL, snap } from '../letters'

// Rust：一圈细齿的齿轮 + 中间的 R
// 齿轮圈半径 7；16 个短齿从半径 7 伸到 9，整圈错开半个齿距（11.25°），没有正横正竖的齿，不用对网格
// R 用切角标签字形放大到 4.2 × 7.8，居中；四个角离齿轮圈约 2.5
const [cx, cy] = [12, 12]
const teeth = Array.from({ length: 16 }, (_, i) => {
  const a = (i + 0.5) * Math.PI / 8
  const p = r => `${+(cx + r * Math.sin(a)).toFixed(3)} ${+(cy - r * Math.cos(a)).toFixed(3)}`
  return `M${p(7)}L${p(9)}`
}).join('')
export default () => [
  circle(cx, cy, 7),
  teeth,
  snap(glyph('R', cx - 2.1, cy - 3.9, 1.2, 1.3, LABEL)),
]
