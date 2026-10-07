import { STATUS } from '../status'

// 流程状态：搁置
export default ({ radius }) => STATUS['on-hold'].paths(radius)
