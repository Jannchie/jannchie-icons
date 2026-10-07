import { glyph } from '../letters'

// 上标：大写 X（字形放大 2 倍，3–10 × 7–19）+ 右上缩小的 2（0.75 倍，标成细节）
export default () => [
  glyph('X', 3, 7, 2),
  { d: glyph('2', 14, 4.5, 0.75), detail: true },
]
