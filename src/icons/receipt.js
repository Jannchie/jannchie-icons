import { circle, crisp, rounded } from '../geometry'

// 收据：底边锯齿的纸条 + 三行文字
export default ({ radius, stroke }) => [
  rounded([[5, 3], [19, 3], [19, 21], [16.67, 19.5], [14.33, 21], [12, 19.5], [9.67, 21], [7.33, 19.5], [5, 21]], Math.min(radius, 1.5)),
  'M8.5 8H15.5',
  'M8.5 11.5H15.5',
  'M8.5 15H12.5',
]
