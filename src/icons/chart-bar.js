import { rounded } from '../geometry'

// 柱状图（线条）：坐标轴 + 三根高低不同的竖线
export default ({ radius }) => [
  rounded([[3.5, 3.5], [3.5, 20.5], [20.5, 20.5]], Math.min(radius, 1), false),
  'M8.5 16.5V12',
  'M12.75 16.5V7.5',
  'M17 16.5V10.5',
]
