import { rounded } from '../geometry'

// 松树：三层叠起的三角树冠 + 短树干
export default ({ radius }) => [
  rounded([[12, 2.5], [17.5, 9], [15, 9], [19, 14], [16, 14], [20, 19], [4, 19], [8, 14], [5, 14], [9, 9], [6.5, 9]], Math.min(radius, 1)),
  'M12 19V21.5',
]
