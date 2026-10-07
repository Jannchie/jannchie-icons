import { crisp, rounded } from '../geometry'

// Kotlin：方块右边被一个三角形切掉，切口尖端落在中心 (12, 12)，剩下的轮廓就是 Kotlin 的标志
// 外框 3.5–20.5；右上、右下两个角是锐角（约 45°），按全局圆角收小；切口尖端固定小圆角
export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [12, 12, crisp(radius)], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 2.5)),
]
