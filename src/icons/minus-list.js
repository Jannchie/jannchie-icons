import { listMark } from '../list'

// 减号为主 + 右下角小列表；小列表作为 cut
// 减号不用居中的通用 minus：横线正好压在小列表上方时会被读成列表的第四行
// 改为往左上收的短横（中心线 6–14、y = 10.5，细字重下落在像素上）：右端基本停在列表圆点那一列之前，和列表首行隔开 4.5（中心线）
export default ({ stroke }) => [
  'M6 10.5H14',
  ...listMark([18, 18], stroke).map(p => (typeof p === 'string' ? { d: p, cut: true } : { ...p, cut: true })),
]
