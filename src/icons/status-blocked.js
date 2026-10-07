import { STATUS } from '../status'

// 流程状态：受阻
export default ({ radius }) => STATUS['blocked'].paths(radius)
