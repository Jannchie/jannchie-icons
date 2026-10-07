import { crisp, rounded } from '../geometry'

// 横分隔条：中间一条横线（y 12.5），上下各一个朝外的 V（尖在 4.5 / 20.5，开口 8–16）
export default ({ radius }) => [
  'M3.5 12.5H20.5',
  rounded([[8, 8.5], [12, 4.5], [16, 8.5]], crisp(radius), false),
  rounded([[8, 16.5], [12, 20.5], [16, 16.5]], crisp(radius), false),
]
