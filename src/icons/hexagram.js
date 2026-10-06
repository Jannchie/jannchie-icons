import { crisp, rounded } from '../geometry'

// 六芒星：一个尖朝上、一个尖朝下的正三角形叠在一起
const at = deg => [12 + 9.5 * Math.cos(deg * Math.PI / 180), 12 + 9.5 * Math.sin(deg * Math.PI / 180)]
export default ({ radius }) => [
  rounded([-90, 30, 150].map(at), crisp(radius)),
  rounded([90, 210, 330].map(at), crisp(radius)),
]
