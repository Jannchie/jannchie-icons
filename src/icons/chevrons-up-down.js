import { crisp, rounded } from '../geometry'

// 上下展开：上箭头 + 下箭头
export default ({ radius }) => [
  rounded([[7.5, 9], [12, 4.5], [16.5, 9]], crisp(radius), false),
  rounded([[7.5, 15], [12, 19.5], [16.5, 15]], crisp(radius), false),
]
