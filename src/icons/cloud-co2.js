import { glyph, snap } from '../letters'
import { cloud } from '../symbols'

// 碳排放：上面一朵云（缩放 2.2），下面一行 CO₂（C、O 字高 5.4；下标 2 字高 3.6，底边和 C、O 对齐），字距 2，整行居中
const s = 0.9
const t = 0.6
export default ({ radius }) => [
  ...cloud([12, 7.5], 2.2, radius),
  ...snap([
    { d: glyph('C', 6, 15, s), thin: true },
    { d: glyph('O', 11.15, 15, s), thin: true },
    { d: glyph('2', 16.2, 16.8, t), thin: true },
  ]),
]
