import { crisp, rounded } from '../geometry'

// 回车 ⏎：从右上竖直落下、拐向左的折线，左端 45° 箭头
export default ({ radius }) => [
  rounded([[18.5, 5.5], [18.5, 14.5], [5.5, 14.5]], radius, false),
  rounded([[9.5, 10.5], [5.5, 14.5], [9.5, 18.5]], crisp(radius), false),
]
