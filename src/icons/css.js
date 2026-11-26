import { quality, qualityFill } from '../quality'

// CSS 样式表：和 gif、sql、yaml、画质标识同一套横向圆角外框 + 框里切角线条字母 CSS
// 不用 CSS3 盾牌徽标（品牌图形），也不用花括号（json 已经是花括号）
export default ({ radius }) => quality('CSS', radius)

// 实心：外框一块，字母挖空
export const fill = ({ radius }) => qualityFill('CSS', radius)
