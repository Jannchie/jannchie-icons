import { circle, crisp, rounded } from '../geometry'

// 收据：底边锯齿的纸条 + 三行文字
export default ({ radius, stroke }) => [
  rounded([[5.5, 3.5], [18.5, 3.5], [18.5, 21], [16.33, 19.5], [14.17, 21], [12, 19.5], [9.83, 21], [7.67, 19.5], [5.5, 21]], Math.min(radius, 1.5)),
  'M8.5 7.5H15.5',
  'M8.5 11.5H15.5',
  'M8.5 15.5H12.5',
]
