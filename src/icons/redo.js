import { crisp, rounded } from '../geometry'

// 重做：撤销的左右镜像
export default ({ radius }) => [
  rounded([[15, 4.5], [20, 9.5], [15, 14.5]], crisp(radius), false),
  'M20 9.5H9.5A5.5 5.5 0 0 0 9.5 20.5H13',
]
