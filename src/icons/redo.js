import { crisp, rounded } from '../geometry'

// 重做：撤销的左右镜像
export default ({ radius }) => [
  rounded([[15, 4], [20, 9], [15, 14]], crisp(radius), false),
  'M20 9H9.5A5.5 5.5 0 0 0 9.5 20H13',
]
