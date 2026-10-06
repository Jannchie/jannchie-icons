import { crisp, rounded } from '../geometry'

// 发光二极管：二极管（整体下移）+ 右上方两道向外发光的小箭头
export default ({ radius }) => [
  'M2.5 14H21.5',
  rounded([[8, 8.5], [15, 14], [8, 19.5]], crisp(radius)),
  'M15.5 8.5V19.5',
  'M14.5 5.5L17 3',
  rounded([[15, 3], [17, 3], [17, 5]], crisp(radius), false),
  'M17.5 7.5L20 5',
  rounded([[18, 5], [20, 5], [20, 7]], crisp(radius), false),
]
