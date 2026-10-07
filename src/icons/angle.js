import { crisp, rounded } from '../geometry'

// 角 ∠：水平底边 + 45° 斜边 + 角里的小弧标记
export default ({ radius }) => [
  rounded([[19.5, 19.5], [4.5, 19.5], [16.5, 7.5]], crisp(radius), false),
  'M9.5 19.5A5 5 0 0 0 8.04 15.96',
]
