import { crisp, rounded } from '../geometry'

// 横分隔条：中间一条横线（y 12），上下各一个朝外的 V（尖在 4 / 20，开口 8–16）
export default ({ radius }) => [
  'M3.5 12H20.5',
  rounded([[8, 8], [12, 4], [16, 8]], crisp(radius), false),
  rounded([[8, 16], [12, 20], [16, 16]], crisp(radius), false),
]
