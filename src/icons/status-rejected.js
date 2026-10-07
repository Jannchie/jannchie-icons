import { STATUS } from '../status'

// 流程状态：已驳回
export default ({ radius }) => STATUS['rejected'].paths(radius)
