import { STATUS } from '../status'

// 流程状态：已驳回
export default ({ radius }) => STATUS['rejected'].paths(radius)

// 实心版见 status.js
export const fill = ({ radius }) => STATUS['rejected'].fill(radius)
