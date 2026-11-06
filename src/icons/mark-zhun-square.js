import { glyphSquare } from '../marks'
import { GLYPHS } from '../marks-cn'
import { knock, solid } from '../solid'

// 批阅标记：圆角方框里一个手绘线条字「准」（字形和 mark-zhun-circle 相同，见 marks-cn.js）
export default ({ radius, stroke }) => [glyphSquare(radius, stroke), ...GLYPHS.zhun(Math.min(radius, 0.5))]

// 实心：方块上挖出字
export const fill = ({ radius, stroke }) => [solid(glyphSquare(radius, stroke)), knock(GLYPHS.zhun(Math.min(radius, 0.5)))]
