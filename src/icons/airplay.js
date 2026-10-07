import { crisp, rounded } from '../geometry'

// 隔空播放：底边中间开口的屏幕（3.5–20.5 × 4.5–17.5，开口 7–17）+ 开口处立着的实心三角（尖 (12, 14.5)，底 8–16 落在 19.5）
export default ({ radius }) => [
  rounded([[7, 17.5], [3.5, 17.5], [3.5, 4.5], [20.5, 4.5], [20.5, 17.5], [17, 17.5]], Math.min(radius, 2.5), false),
  { d: rounded([[12, 14.5, crisp(radius)], [16, 19.5], [8, 19.5]], Math.min(radius, 0.5)), fill: true },
]
