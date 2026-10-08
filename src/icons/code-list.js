import { listMark } from '../list'
import { code } from '../symbols'

// 代码为主（左上）+ 右下角小列表；小列表作为 cut，主符号在附近断开
// 代码符号放在 (10, 8.5)、2 倍（这个大小只画 < >，见 symbols.js 的 drawCode），右括号下端离列表第一个点约 2.7，不和列表相交
export default ({ radius }) => [
  ...code([10, 8.5], 2, radius),
  ...listMark([18, 18]).map(p => (typeof p === 'string' ? { d: p, cut: true } : { ...p, cut: true })),
]
