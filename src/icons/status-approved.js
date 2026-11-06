import { STATUS } from '../status'

// 流程状态：已批准
export default ({ radius }) => STATUS['approved'].paths(radius)

// 实心版见 status.js
export const fill = ({ radius }) => STATUS['approved'].fill(radius)
