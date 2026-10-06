import { glyph } from '../letters'
import { ring } from '../marks'

// 注册商标 ®：圆环 + 中间的 R
export default () => [ring(), { d: glyph('R', 10.25, 9, 1), detail: true }]
