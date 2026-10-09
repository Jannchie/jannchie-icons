import { circle } from '../geometry'
import { dot } from '../scene'

// 定位（GPS）：圆（圆心 (12, 12)、半径 6.5）+ 上下左右四根刻度从圆周向外伸 + 圆心实心点
// 刻度沿径向接在圆周上，外端墨迹停在离画布 2 处（中线 2 + h），字重加粗时向内缩
export default ({ stroke }) => {
  const h = stroke / 2
  const [a, b] = [2 + h, 22 - h]
  return [
    circle(12, 12, 6.5),
    `M12 ${a}V5.5M12 18.5V${b}M${a} 12H5.5M18.5 12H${b}`,
    dot(12, 12, 3),
  ]
}
