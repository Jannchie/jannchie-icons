import { glyphRing } from '../marks'
import { GLYPHS } from '../marks-cn'

// 批阅标记：圈里一个手绘线条字「准」（字形见 marks-cn.js）
export default ({ radius, stroke }) => [glyphRing(stroke), ...GLYPHS.zhun(Math.min(radius, 0.5))]
