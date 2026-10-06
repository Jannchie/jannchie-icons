import { rounded } from '../geometry'
import { dot } from '../scene'

// 节拍器：梯形机身 + 底座横线 + 斜摆的摆杆 + 摆杆上的砝码
export default ({ radius }) => [
  rounded([[8.5, 3], [15.5, 3], [19, 21], [5, 21]], Math.min(radius, 1.5)),
  'M6.2 17H17.8',
  'M12 17L16 6',
  dot(14.4, 10.4, 3),
]
