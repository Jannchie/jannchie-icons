import { glyph } from '../letters'

// 字体：大 A + 小 A，底边对齐（19.5）；两个 A 的横画都落在 .5 上（14.5 / 16.5）
export default () => [
  glyph('A', 3, 4.5, 2.5),
  glyph('A', 14.5, 10.5, 1.5),
]
