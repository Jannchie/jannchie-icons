import { glyphRing } from '../marks'
import { GLYPHS } from '../marks-cn'
import { knock, solid } from '../solid'

// 批阅标记：圈里一个手绘线条字「优」（字形见 marks-cn.js）
export default ({ radius, stroke }) => [glyphRing(stroke), ...GLYPHS.you(Math.min(radius, 0.5))]

// 实心：圆片上挖出字
export const fill = ({ radius, stroke }) => [solid(glyphRing(stroke)), knock(GLYPHS.you(Math.min(radius, 0.5)))]
