import { crisp, rounded } from '../geometry'

// 纵向折叠：中间一道横线（y 12.5），上下各一根箭头从外往中间收（箭杆 x 12.5，尖停在离横线 3 处）
export default ({ radius }) => [
  'M3.5 12.5H21.5',
  'M12.5 3.5V9.5',
  rounded([[9.5, 6.5], [12.5, 9.5], [15.5, 6.5]], crisp(radius), false),
  'M12.5 21.5V15.5',
  rounded([[9.5, 18.5], [12.5, 15.5], [15.5, 18.5]], crisp(radius), false),
]
