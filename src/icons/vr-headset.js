import { rounded } from '../geometry'

// VR 头显：圆角面罩，底边中间凹进去的鼻托
export default ({ radius }) => [
  rounded([[2.5, 7.5], [21.5, 7.5], [21.5, 16.5], [14.7, 16.5], [13.5, 14.5], [10.5, 14.5], [9.3, 16.5], [2.5, 16.5]], Math.min(radius, 2.5)),
]
