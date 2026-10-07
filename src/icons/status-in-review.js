import { STATUS } from '../status'

// 流程状态：审核中
export default ({ radius }) => STATUS['in-review'].paths(radius)
