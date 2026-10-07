import { STATUS } from '../status'

// 流程状态：积压
export default ({ radius }) => STATUS['backlog'].paths(radius)
