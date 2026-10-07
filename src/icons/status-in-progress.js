import { STATUS } from '../status'

// 流程状态：进行中
export default ({ radius }) => STATUS['in-progress'].paths(radius)
