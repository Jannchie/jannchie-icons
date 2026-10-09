import { rounded } from '../geometry'

// 衣架：顶上的挂钩 + 扁平的圆角三角衣架身（底边 2–22 × 18.75，宽而扁，底角圆角让墨迹收在 2 以内）；墨迹上下居中
export default ({ radius }) => [
  // 挂钩竖段在中线 12 上
  'M12 10.75V9.25A2 2 0 1 1 14 7.25',
  rounded([[12, 10.75], [22, 18.75], [2, 18.75]], Math.min(radius, 1.5)),
]
