import { rounded } from '../geometry'

// 鸡尾酒：45° 斜边的三角杯 + 液面 + 杯脚 + 底座
export default ({ radius }) => [
  rounded([[3.5, 4], [20.5, 4], [12, 12.5]], Math.min(radius, 1)),
  'M6.5 7H17.5',
  'M12 12.5V20.5',
  'M8 20.5H16',
]
