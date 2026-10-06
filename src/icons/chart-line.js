import { rounded } from '../geometry'

// 折线图：坐标轴 + 45° 起伏的折线
export default ({ radius }) => [
  rounded([[3.5, 3.5], [3.5, 20.5], [20.5, 20.5]], Math.min(radius, 1), false),
  rounded([[7, 15], [10.5, 11.5], [14, 15], [19, 10]], Math.min(radius, 1), false),
]
