import { circle } from '../geometry'

// @：内圈 + 从内圈右侧下来再绕外圈一大圈的线
export default () => [
  circle(12, 12, 3.5),
  'M15.5 8.5V13A2.75 2.75 0 0 0 21 13A9 9 0 1 0 17.5 19.25',
]
