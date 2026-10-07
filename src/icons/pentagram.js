import { crisp, rounded } from '../geometry'

// 五角星（一笔画）：圆上每隔 144° 取一个点连起来，线条互相穿过
// 圆心 y 取值让上方那条水平边落在 9.5
const cy = 9.5 + 9.5 * Math.sin(18 * Math.PI / 180)
const at = i => [12 + 9.5 * Math.cos((-90 + 144 * i) * Math.PI / 180), cy + 9.5 * Math.sin((-90 + 144 * i) * Math.PI / 180)]
export default ({ radius }) => [rounded([0, 1, 2, 3, 4].map(at), crisp(radius))]
