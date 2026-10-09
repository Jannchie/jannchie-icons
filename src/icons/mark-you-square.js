import { glyphSquare } from '../marks'
import { GLYPHS } from '../marks-cn'

// 批阅标记：圆角方框里一个手绘线条字「优」（字形和 mark-you-circle 相同，见 marks-cn.js）
export default ({ radius, stroke }) => [glyphSquare(radius, stroke), ...GLYPHS.you(Math.min(radius, 0.5))]
