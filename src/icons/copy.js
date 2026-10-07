import { GAP } from '../clearance'
import { rounded } from '../geometry'

// 复制：前后两张卡片；后卡被前卡挡住的部分不画，断口离前卡 GAP
export default ({ radius, stroke }) => {
  const g = GAP + stroke
  const r = Math.min(radius, 2)
  return [
    rounded([[8.5, 8.5], [20.5, 8.5], [20.5, 20.5], [8.5, 20.5]], r),
    rounded([[8.5 - g, 15.5], [3.5, 15.5], [3.5, 3.5], [15.5, 3.5], [15.5, 8.5 - g]], r, false),
  ]
}
