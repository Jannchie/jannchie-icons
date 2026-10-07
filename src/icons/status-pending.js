import { STATUS } from '../status'

// 流程状态：待处理
export default ({ radius }) => STATUS['pending'].paths(radius)
