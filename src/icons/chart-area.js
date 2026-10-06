import { rounded } from '../geometry'

// 面积图：坐标轴 + 折线下方一直落到横轴的面积
export default ({ radius }) => [
  rounded([[3.5, 3.5], [3.5, 20.5], [20.5, 20.5]], Math.min(radius, 1), false),
  'M7 20.5V15L10.5 10.5L14 13.5L18.5 7V20.5',
]
