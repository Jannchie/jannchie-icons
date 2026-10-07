import { STATUS } from '../status'

// 流程状态：已取消
export default ({ radius }) => STATUS['cancelled'].paths(radius)
