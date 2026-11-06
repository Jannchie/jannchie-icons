import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 鸡尾酒：45° 斜边的三角杯 + 液面 + 杯脚 + 底座
export default ({ radius }) => [
  // 杯脚在中轴 12 上；杯口半宽 8，保持 45°
  rounded([[4, 3.5], [20, 3.5], [12, 11.5]], Math.min(radius, 1)),
  'M7 6.5H17',
  'M12 11.5V20.5',
  'M8 20.5H16',
]

// 实心：杯身一块，挖掉液面线（两端各缩一个线宽，杯口那截不被切下来）；杯脚、底座照旧是线
export const fill = ({ radius, stroke }) => [
  solid(rounded([[4, 3.5], [20, 3.5], [12, 11.5]], Math.min(radius, 1))),
  knock(`M${7 + stroke} 6.5H${17 - stroke}`),
  'M12 11.5V20.5',
  'M8 20.5H16',
]
