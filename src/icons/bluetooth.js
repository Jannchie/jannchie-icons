import { rounded } from '../geometry'

// 蓝牙：中间一根竖线 + 两侧 45° 折线（右上、右下两个尖，左边两条斜线交叉穿过竖线）；右侧尖角比左端伸得远，竖线略偏右让整体居中
export default ({ radius }) => [
  rounded([[7.75, 7.5], [16.75, 16.5], [12.25, 21], [12.25, 3], [16.75, 7.5], [7.75, 16.5]], Math.min(radius, 1), false),
]
