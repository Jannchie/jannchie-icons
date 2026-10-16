import { circle, rounded } from '../geometry'

// 扶梯：梯身是闭合斜带——下平台（高 3）→ 45° 斜段（上边 x + y = 27，下边 x + y = 33）→ 上平台（高 3）；
// 斜带左上站一个人，画法同 elevator：圆头 + 半圆肩的上身，左边落在下平台上、右边落在斜段上。右下角的三角空白留给上下行箭头
const body = [[3.5, 20.5], [3.5, 17.5], [9.5, 17.5], [17.5, 9.5], [20.5, 9.5], [20.5, 12.5], [12.5, 20.5]]
export const escalator = radius => [
  rounded(body, Math.min(radius, 1)),
  circle(8.5, 5.25, 1.75),
  'M6.5 17.5V11A2 2 0 0 1 10.5 11V16.5',
]
export default ({ radius }) => escalator(radius)
