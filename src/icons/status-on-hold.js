import { STATUS } from '../status'

// 流程状态：搁置
export default ({ radius }) => STATUS['on-hold'].paths(radius)

// 实心版见 status.js
export const fill = ({ radius }) => STATUS['on-hold'].fill(radius)
