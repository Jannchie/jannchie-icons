import { circle } from '../geometry'

// 二重丸（◎）：两个同心圆；外圈外缘固定在半径 10（墨迹离边 2，线宽变粗往里长），内圈中心线半径 5
export default ({ stroke }) => [circle(12, 12, 10 - stroke / 2), circle(12, 12, 5)]
