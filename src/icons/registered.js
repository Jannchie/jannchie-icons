import { glyph } from '../letters'
import { ring } from '../marks'
import { knock, solid } from '../solid'

// 注册商标 ®：圆环 + 中间的 R
export default () => [ring(), { d: glyph('R', 10.25, 9, 1), detail: true }]

// 实心：圆片上挖出 R
export const fill = () => [solid(ring()), knock({ d: glyph('R', 10.25, 9, 1), detail: true })]
