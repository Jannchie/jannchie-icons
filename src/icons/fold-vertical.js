import { crisp, rounded } from '../geometry'

// 纵向折叠：中间一道横线（y 12），上下各一根箭头从外往中间收（箭杆 x 12，尖停在离横线 3 处）
export default ({ radius }) => [
  'M3 12H21',
  'M12 3V9',
  rounded([[9, 6], [12, 9], [15, 6]], crisp(radius), false),
  'M12 21V15',
  rounded([[9, 18], [12, 15], [15, 18]], crisp(radius), false),
]
