import { rounded } from '../geometry'

// VR 头显：圆角面罩，底边中间凹进去的鼻托
export default ({ radius }) => [
  rounded([[2.5, 7], [21.5, 7], [21.5, 17], [15, 17], [13.5, 14.5], [10.5, 14.5], [9, 17], [2.5, 17]], Math.min(radius, 2.5)),
]
