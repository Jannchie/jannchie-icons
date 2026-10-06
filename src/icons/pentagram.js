import { crisp, rounded } from '../geometry'

// 五角星（一笔画）：圆上每隔 144° 取一个点连起来，线条互相穿过
const at = i => [12 + 9.5 * Math.cos((-90 + 144 * i) * Math.PI / 180), 12.5 + 9.5 * Math.sin((-90 + 144 * i) * Math.PI / 180)]
export default ({ radius }) => [rounded([0, 1, 2, 3, 4].map(at), crisp(radius))]
