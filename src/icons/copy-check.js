import { check } from '../symbols'
import { success } from '../tone'
import base from './copy'

// 已复制：copy 的前后两张卡片 + 前卡（8.5–20.5，中心 (14.5, 14.5)）里一个勾，外框 7.2 × 4.8（离前卡右边 2.4，粗字重下不挤）
export default opts => [
  ...base(opts),
  ...success(check([14.5, 14.5], 1.2, opts.radius)),
]
