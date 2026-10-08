import { circle, crisp, rounded } from '../geometry'

// 对比：外框 + 中间分隔线（分隔线在滑块圆圈处断开）+ 圆形滑块
export default ({ radius, stroke }) => [
  // 外框 3–21，分隔线在中轴 12 上
  rounded([[3, 4.5], [21, 4.5], [21, 19.5], [3, 19.5]], Math.min(radius, 2.5)),
  'M12 4.5V19.5',
  { d: circle(12, 12, 2.25), cut: true },
]
