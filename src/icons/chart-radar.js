import { crisp, rounded, through } from '../geometry'
import { solid } from '../solid'

// 雷达图：正六边形网 + 三根穿过中心的辐条 + 半径各不相同的数据多边形
// 网的半径取 8 / cos30°，左右竖边落在 4 / 20 上
const polar = (r, i) => [12 + r * Math.cos((-90 + 60 * i) * Math.PI / 180), 12 + r * Math.sin((-90 + 60 * i) * Math.PI / 180)]
const web = Array.from({ length: 6 }, (_, i) => polar(8 / Math.cos(Math.PI / 6), i))
const data = [6.5, 4, 7, 3.5, 5.5, 4.5].map((r, i) => polar(r, i))
export default ({ radius }) => [
  rounded(web, crisp(radius)),
  ...[0, 1, 2].map(i => `M${web[i].join(' ')}L${web[i + 3].join(' ')}`),
  rounded(data, crisp(radius)),
]

// 实心：数据多边形填实（盖住中间的辐条），网和辐条照旧是线；辐条两端各缩半个线宽，线帽停在网的顶点上
// （描边版由 finalize 把接在别的线上的线头缩进去，实心版不缩，尖角模式下方头会从网的顶点外戳出一个尖）
export const fill = ({ radius, stroke }) => [
  rounded(web, crisp(radius)),
  ...[0, 1, 2].map(i => through(web[i], web[i + 3], -stroke / 2)),
  solid(rounded(data, crisp(radius))),
]
