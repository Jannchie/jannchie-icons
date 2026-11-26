import { circle, rounded } from '../geometry'
import { stacked } from '../solid'
import { rotate } from '../transform'

// 消防车（侧视、车头朝右，和 truck / ambulance 同一套车身）：后面是矮的车厢 2.5–14.5 × 11.5–17.5（底边并进轮廓，从后轮前方起笔，同 ambulance），
// 驾驶室接在前面、比车厢高（顶 8.5），前上方一道斜挡风；两个车轮做遮挡刀（同 truck）
// 车厢上一架往左上斜伸的云梯：横放的梯子（2–11.5 × 6.5–9，中间两根横档）绕右端 (11.5, 9) 顺时针转 20°，
// 梯子下面一根竖撑（10.5）立在车厢顶上，撑的上端正好落在转过以后的下梯杆上（10.5, 8.64）；梯子右上角（约 12.4, 6.7）在驾驶室顶的左上方，粗字重下也分得开
// 斜伸的梯子是消防车的记号；平放在车顶的梯子小尺寸下会被看成一排车窗
const P = [11.5, 9]
const ladder = rotate(rounded([[2, 6.5], [11.5, 6.5], [11.5, 9], [2, 9]], 0), 20, P)
const rungs = rotate('M5.17 6.5V9M8.33 6.5V9', 20, P)
const post = 'M10.5 11.5V8.64'
const rear = (radius, closed) => rounded([...(closed ? [] : [[9.5, 17.5]]), [2.5, 17.5], [2.5, 11.5], [14.5, 11.5], [14.5, 17.5]], Math.min(radius, 1.5), closed)
const cab = (radius, closed) => rounded([[14.5, 8.5], [18.5, 8.5], [21.5, 12.5], [21.5, 17.5], [14.5, 17.5]], Math.min(radius, 1.5), closed)

export default ({ radius }) => [
  rear(radius, false),
  cab(radius, false),
  ladder,
  rungs,
  post,
  { d: circle(7, 17.5, 2.25), cut: true, occlude: true },
  { d: circle(17.5, 17.5, 2.25), cut: true, occlude: true },
]

// 实心：驾驶室一块在后，车厢是完整的一块在前（同 truck），车轮四周让出缝、实心圆；云梯、竖撑照旧是线
export const fill = ({ radius }) => [
  ...stacked(cab(radius, true), rear(radius, true), [circle(7, 17.5, 2.25), circle(17.5, 17.5, 2.25)]),
  ladder,
  rungs,
  post,
]
