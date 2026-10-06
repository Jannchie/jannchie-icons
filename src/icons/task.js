import { check } from '../symbols'
import clipboard from './clipboard'

// 任务：剪贴板 + 勾
export default opts => [...clipboard(opts), ...check([12, 13.5], 1.1, opts.radius).map(p => p.d ?? p)]
