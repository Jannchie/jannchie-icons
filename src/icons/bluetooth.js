import { rounded } from '../geometry'

// 蓝牙：中间一根竖线 + 两侧 45° 折线（右上、右下两个尖，左边两条斜线交叉穿过竖线）
export default ({ radius }) => [
  rounded([[7.5, 7.5], [16.5, 16.5], [12, 21], [12, 3], [16.5, 7.5], [7.5, 16.5]], Math.min(radius, 1), false),
]
