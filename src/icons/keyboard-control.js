import { crisp, rounded } from '../geometry'

// Control ⌃：向上的尖角，比 chevron-up 更宽、更靠上（键帽上的写法）
export default ({ radius }) => [
  rounded([[5, 15], [12, 8], [19, 15]], crisp(radius), false),
]
