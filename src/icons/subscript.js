import { glyph } from '../letters'

// 下标：大写 X（字形放大 2 倍，3–10 × 5–17）+ 右下缩小的 2（0.75 倍，标成细节）
export default () => [
  glyph('X', 3, 5, 2),
  { d: glyph('2', 14, 15, 0.75), detail: true },
]
