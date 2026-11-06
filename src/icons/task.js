import { knock } from '../solid'
import { check } from '../symbols'
import clipboard, { fill as clipboardFill } from './clipboard'

// 任务：剪贴板 + 勾
export default opts => [...clipboard(opts), ...check([12, 13.5], 1.1, opts.radius).map(p => p.d ?? p)]

// 实心：剪贴板的实心版，板面挖掉勾
export const fill = opts => [...clipboardFill(opts), knock(check([12, 13.5], 1.1, opts.radius).map(p => p.d ?? p))]
