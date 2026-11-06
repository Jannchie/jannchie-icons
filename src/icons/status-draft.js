import { STATUS } from '../status'

// 流程状态：草稿
export default ({ radius }) => STATUS['draft'].paths(radius)

// 实心版见 status.js
export const fill = ({ radius }) => STATUS['draft'].fill(radius)
