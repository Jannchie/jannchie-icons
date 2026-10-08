import { rounded } from '../geometry'
import { star } from '../symbols'

// 半星（评分里的半颗）：和 star 同一颗星（star 符号 k = 2.4，外半径 8.64、内半径 0.48 倍），左半边填实
// 填实的部分沿星的左半轮廓走（顶尖 → 左侧三个内角、两个外角 → 底部内角），再沿中线 x = 12 回到顶尖；
// 圆角取法和 star 一样（内角 corner、外角放宽一倍），填色的边和外轮廓重合
const k = 2.4
const R = 3.6 * k
const r = R * 0.48
const dy = R * (1 - Math.cos(Math.PI / 5)) / 2

export default ({ radius }) => {
  const corner = Math.min(radius, k * 0.75)
  const pt = (i) => {
    const a = -Math.PI / 2 + i * Math.PI / 5
    const d = i % 2 ? r : R
    return [12 + Math.cos(a) * d, 12 + dy + Math.sin(a) * d, i % 2 ? corner : corner * 2]
  }
  // 顶尖（i = 0）逆时针走到底部内角（i = 5）：i = 10, 9, 8, 7, 6, 5
  const half = [10, 9, 8, 7, 6, 5].map(pt)
  // 中线两端（顶尖、底部内角）不做圆角，让填色贴着外轮廓的尖收住
  half[0][2] = 0
  half[5][2] = 0
  return [
    ...star([12, 12], k, radius),
    { d: rounded(half, corner), fill: true },
  ]
}
