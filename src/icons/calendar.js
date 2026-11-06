import { base, fillParts } from '../calendar'
import { plainFill } from '../solid'

// 日历：外框 + 表头线 + 两个挂环
export default ({ radius, stroke }) => base(radius, stroke)

// 实心：外框一块，挖掉表头线，挂环照旧是线（见 calendar.js 的 fillParts）
export const fill = ({ radius, stroke }) => plainFill(fillParts(radius, stroke))
