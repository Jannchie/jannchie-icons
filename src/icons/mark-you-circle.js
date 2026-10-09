import { glyphRing } from '../marks'
import { GLYPHS } from '../marks-cn'

// 批阅标记：圈里一个手绘线条字「优」（字形见 marks-cn.js）
export default ({ radius, stroke }) => [glyphRing(stroke), ...GLYPHS.you(Math.min(radius, 0.5))]
