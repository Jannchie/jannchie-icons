import { STATUS } from '../status'

// 流程状态：受阻
export default ({ radius }) => STATUS['blocked'].paths(radius)

// 实心版见 status.js
export const fill = ({ radius }) => STATUS['blocked'].fill(radius)
