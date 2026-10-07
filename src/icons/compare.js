import { circle, crisp, rounded } from '../geometry'

// 对比：外框 + 中间分隔线（分隔线在滑块圆圈处断开）+ 圆形滑块
export default ({ radius, stroke }) => [
  // 整体右移半格：外框 3.5–21.5，分隔线落在 12.5 上
  rounded([[3.5, 4.5], [21.5, 4.5], [21.5, 19.5], [3.5, 19.5]], Math.min(radius, 2.5)),
  'M12.5 4.5V19.5',
  { d: circle(12.5, 12, 2.25), cut: true },
]
