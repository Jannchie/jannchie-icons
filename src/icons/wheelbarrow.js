import { GAP } from '../clearance'
import { circle, crisp, rounded } from '../geometry'
import { eye } from '../scene'
import { clear, solid } from '../solid'

// 独轮手推车（侧视、车头朝右）：一根车架从左上的把手 (2.5, 9) 斜下来，直指车轮（圆心 (17, 16)、半径 3.5，带轮毂）；
// 车斗坐在车架上：斗口水平（5.5–21 在 4.5），后壁落在车架上 (8, 11.47)，斗底就是车架那条斜线，前壁从斗口前角斜下来；
// 车轮嵌在车斗的前下角里——车架和前壁都在车轮处断开，线头落在车轮的圆上（(14.02, 14.16) / (19.1, 13.2)），不是挂在车斗下面；
// 车架半腰一条支腿（10.5），落到和车轮同一条地面（19.5）
// 靠「从斗底斜伸出来的把手 + 前面一个轮子 + 后面一条腿」认出来；把手顺着斗口水平伸出去的话像一辆购物车
const [wx, wy, wr] = [17, 16, 3.5]
const wheel = circle(wx, wy, wr)
const hub = eye(wx, wy, 1.5)
const tub = radius => rounded([[8, 11.47], [5.5, 4.5], [21, 4.5, crisp(radius)], [19.1, 13.2]], Math.min(radius, 1), false)
const frame = 'M2.5 9L14.02 14.16'
const leg = 'M10.5 12.58V19.5'

export default ({ radius }) => [tub(radius), frame, wheel, hub, leg]

// 实心：车斗一块（沿车架和前壁封口），车轮在前面、车斗在车轮四周让出缝，轮毂挖成小孔；把手和支腿照旧是线
export const fill = ({ radius }) => [
  solid(rounded([[8, 11.47, 0], [5.5, 4.5], [21, 4.5, crisp(radius)], [19.1, 13.2, 0], [14.02, 14.16, 0]], Math.min(radius, 1))),
  frame,
  leg,
  clear(wheel, GAP),
  solid(wheel),
  { ...hub, knock: true },
]
