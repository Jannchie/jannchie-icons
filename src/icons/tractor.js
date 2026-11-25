import { circle, rounded } from '../geometry'
import { hole, stacked } from '../solid'

// 拖拉机（侧视、车头朝右）：左边的大后轮（圆心 (8, 15.5)、半径 4.5，带轮毂）、右边的小前轮（圆心 (17.5, 17.5)、半径 2.5）；
// 后轮上面是高高的驾驶室（4.5–11.5，顶到 4.5），往右是矮的发动机罩（到 19.5，顶在 10.5），罩前端落到前轮上；发动机罩上一根排气管；两轮之间一根车轴
// 驾驶室左边落在后轮的圆上（x = 4.5 处弧高约 12.67），发动机罩前端落在前轮的圆上（x = 19.5 处弧高 16）
const body = radius => rounded([[4.5, 12.67], [4.5, 4.5], [11.5, 4.5], [11.5, 10.5], [19.5, 10.5], [19.5, 16]], Math.min(radius, 1.5), false)
const rear = circle(8, 15.5, 4.5)
const hub = circle(8, 15.5, 1.5)
const front = circle(17.5, 17.5, 2.5)
const axle = 'M12.5 15.5H16'
const pipe = 'M15.5 10.5V6.5'

export default ({ radius }) => [body(radius), rear, hub, front, axle, pipe]

// 实心：车身（底边封口）一块，两个车轮在前，车身在车轮四周让出缝；后轮的轮毂挖成小孔；排气管照旧是线
export const fill = ({ radius, stroke }) => [
  ...stacked(`${body(radius)}H4.5Z`, [rear, front]),
  hole(circle(8, 15.5, 1.5 - stroke / 2)),
  pipe,
]
