import { rounded } from '../geometry'

// 鸡尾酒：45° 斜边的三角杯 + 液面 + 杯脚 + 底座
export default ({ radius }) => [
  // 整体右移半格，杯脚落在 12.5 上；杯口半宽 8，保持 45°
  rounded([[4.5, 3.5], [20.5, 3.5], [12.5, 11.5]], Math.min(radius, 1)),
  'M7.5 6.5H17.5',
  'M12.5 11.5V20.5',
  'M8.5 20.5H16.5',
]
