import { crisp, rounded } from '../geometry'

// 发光二极管：二极管（整体下移）+ 右上方两道向外发光的小箭头
export default ({ radius }) => [
  'M2.5 13.5H21.5',
  rounded([[8.5, 8], [15, 13.5], [8.5, 19]], crisp(radius)),
  'M15.5 8V19',
  'M15 6L17.5 3.5',
  rounded([[15.5, 3.5], [17.5, 3.5], [17.5, 5.5]], crisp(radius), false),
  'M18 8L20.5 5.5',
  rounded([[18.5, 5.5], [20.5, 5.5], [20.5, 7.5]], crisp(radius), false),
]
