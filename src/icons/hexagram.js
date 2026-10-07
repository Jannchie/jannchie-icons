import { crisp, rounded } from '../geometry'

// 六芒星：一个尖朝上、一个尖朝下的正三角形叠在一起
// 外接圆半径 9：两条横边离圆心 4.5，落在 7.5 / 16.5 上
const at = deg => [12 + 9 * Math.cos(deg * Math.PI / 180), 12 + 9 * Math.sin(deg * Math.PI / 180)]
export default ({ radius }) => [
  rounded([-90, 30, 150].map(at), crisp(radius)),
  rounded([90, 210, 330].map(at), crisp(radius)),
]
