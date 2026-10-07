import { crisp, rounded } from '../geometry'

// 雷达图：正六边形网 + 三根穿过中心的辐条 + 半径各不相同的数据多边形
// 中心右移半格到 12.5（竖辐条落在 12.5 上），网的半径取 8 / cos30°，左右竖边落在 4.5 / 20.5 上
const polar = (r, i) => [12.5 + r * Math.cos((-90 + 60 * i) * Math.PI / 180), 12 + r * Math.sin((-90 + 60 * i) * Math.PI / 180)]
const web = Array.from({ length: 6 }, (_, i) => polar(8 / Math.cos(Math.PI / 6), i))
const data = [6.5, 4, 7, 3.5, 5.5, 4.5].map((r, i) => polar(r, i))
export default ({ radius }) => [
  rounded(web, crisp(radius)),
  ...[0, 1, 2].map(i => `M${web[i].join(' ')}L${web[i + 3].join(' ')}`),
  rounded(data, crisp(radius)),
]
