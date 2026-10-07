// 双色变体的着色：primary 是主体；角标、划掉的斜杠这类表示状态的叠加记号按语义标一个角色，每个角色有推荐色，用户可以在页面上覆盖
// 不标就是 primary。推荐色分亮色 / 暗色两套，对白底（#fff）和深色底（#0e0e11）的对比度都在 4.5 以上（WCAG 图形元素要求 3:1）
export const ROLES = {
  accent: { light: '#a16207', dark: '#fde047' }, // 没有特定语义的角标（小列表、图片、音乐……），亮黄；白底上亮黄对比度不够，亮色主题用金黄
  danger: { light: '#9f1239', dark: '#fda4af' }, // 划掉、禁止、删除、减号
  success: { light: '#15803d', dark: '#4ade80' }, // 加号、勾、保护
  warning: { light: '#c2410c', dark: '#fb923c' }, // 感叹号、锁、星；用橙色和 accent 的黄区分
  info: { light: '#2563eb', dark: '#60a5fa' }, // 箭头、搜索、时间、云
}

// 把路径（字符串、{ d } 对象，或它们的数组）标成某个角色
const mark = role => p => (Array.isArray(p) ? p.map(mark(role)) : typeof p === 'string' ? { d: p, tone: role } : { ...p, tone: role })
export const danger = mark('danger')
export const success = mark('success')
export const warning = mark('warning')
export const info = mark('info')
export const accent = mark('accent')
