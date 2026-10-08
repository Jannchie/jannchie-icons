import { check } from '../symbols'
import { success } from '../tone'
import base from './clipboard'

// 剪贴板 + 勾：板面 5.5–18.5 × 6.5–20.5（夹子以下），勾放在这块的中心 (12, 13.5)，外框 7.8 × 5.2（离板子两侧还有 2.6，粗字重下不挤）
export default opts => [
  ...base(opts),
  ...success(check([12, 13.5], 1.3, opts.radius)),
]
