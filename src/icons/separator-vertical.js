import { crisp, rounded } from '../geometry'

// 竖分隔条：中间一条竖线（x 12.5），两侧各一个朝外的 V（尖在 4.5 / 20.5，开口 8–16）
export default ({ radius }) => [
  'M12.5 3.5V20.5',
  rounded([[8.5, 8], [4.5, 12], [8.5, 16]], crisp(radius), false),
  rounded([[16.5, 8], [20.5, 12], [16.5, 16]], crisp(radius), false),
]
