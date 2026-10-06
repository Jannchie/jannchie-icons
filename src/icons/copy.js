import { GAP } from '../clearance'
import { rounded } from '../geometry'

// 复制：前后两张卡片；后卡被前卡挡住的部分不画，断口离前卡 GAP
export default ({ radius, stroke }) => {
  const g = GAP + stroke
  const r = Math.min(radius, 2)
  return [
    rounded([[8, 8], [20, 8], [20, 20], [8, 20]], r),
    rounded([[8 - g, 16], [4, 16], [4, 4], [16, 4], [16, 8 - g]], r, false),
  ]
}
