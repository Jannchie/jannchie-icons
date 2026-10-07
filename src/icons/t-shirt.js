import { rounded } from '../geometry'

// T 恤：左右对称；袖子沿 45° 斜出、袖口平齐，衣身直筒，领口是一道浅弧
const body = [[8.75, 3], [3, 5.75], [4.5, 10.5], [6.5, 9.75], [6.5, 20.5], [17.5, 20.5], [17.5, 9.75], [19.5, 10.5], [21, 5.75], [15.25, 3]]
export default ({ radius }) => [
  `${rounded(body, Math.min(radius, 1.5), false)}A4.5 4.5 0 0 1 8.75 3`,
]
