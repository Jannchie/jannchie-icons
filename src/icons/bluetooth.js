import { rounded } from '../geometry'

// 蓝牙：中间一根竖线 + 两侧 45° 折线（右上、右下两个尖，左边两条斜线交叉穿过竖线；整体右移半格，竖线落在 12.5 上）
export default ({ radius }) => [
  rounded([[8, 7.5], [17, 16.5], [12.5, 21], [12.5, 3], [17, 7.5], [8, 16.5]], Math.min(radius, 1), false),
]
