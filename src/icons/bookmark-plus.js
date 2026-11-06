import { GAP } from '../clearance'
import { clear, solid } from '../solid'
import { bookmark, plus } from '../symbols'

// 添加书签（存为预设）：书签居中（同 bookmark-list）+ 右下角一个加号；加号作为 cut，书签在它附近断开
export default ({ radius }) => [
  ...bookmark([12, 12], 2, radius),
  ...plus([18.5, 18.5], 1.2).map(p => ({ d: p.d ?? p, cut: true, tone: 'success' })),
]

// 实心：书签一块，在加号四周让出缝，再画加号
export const fill = ({ radius }) => {
  const sign = plus([18.5, 18.5], 1.2).map(p => ({ d: p.d ?? p, tone: 'success' }))
  return [solid(bookmark([12, 12], 2, radius)), clear(sign, GAP), ...sign]
}
