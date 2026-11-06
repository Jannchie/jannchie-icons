import { STATUS } from '../status'

// 流程状态：待处理
export default ({ radius }) => STATUS['pending'].paths(radius)

// 实心版见 status.js
export const fill = ({ radius }) => STATUS['pending'].fill(radius)
