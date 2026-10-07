import { circle } from '../geometry'
import { glyph } from '../letters'

// 相机模式 P（程序自动）：模式转盘的圆 + 居中放大 1.6 倍的线条字母
const scale = 1.6
// 竖向按 12/7 放大：竖笔落在 9.5、顶和中间横笔落在 6.5 / 12.5 上（字身略高、略偏上）
const sy = 12 / 7
export default () => [
  circle(12, 12, 9),
  glyph('P', 9.5, 6.5, scale, sy),
]
