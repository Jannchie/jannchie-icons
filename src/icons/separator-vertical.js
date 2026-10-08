import { crisp, rounded } from '../geometry'

// 竖分隔条：中间一条竖线（x 12），两侧各一个朝外的 V（尖在 4 / 20，开口 8–16）
export default ({ radius }) => [
  'M12 3.5V20.5',
  rounded([[8, 8], [4, 12], [8, 16]], crisp(radius), false),
  rounded([[16, 8], [20, 12], [16, 16]], crisp(radius), false),
]
