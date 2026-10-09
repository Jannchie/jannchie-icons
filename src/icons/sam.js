import { rounded } from '../geometry'
import { rotate } from '../transform'
import { body, track } from '../tank'

// 防空导弹发射车（SAM）：履带 + 车体（顶边 12.5，高 3），车头一个低矮驾驶舱（15.5–19，顶边 10.5）；
// 双联发射箱的铰点在车体顶边 (7.5, 12.5)（离车体后上角 3.5，仰起的箱尾不会悬到后角上方挤出窄缝）：箱子先水平画（长 10、厚 6，中间一道隔板分出两管，不画弹头——仰起后隔板的后端离车体顶边还有 2.6），
// 再绕铰点仰起 30°（箱子前上角落在 y 2.8，粗字重下离上缘还有 1.8）——箱子只在铰点碰到车体，其余部分都悬在车体上方；铰点那个角是硬棱，圆角会让箱子离开车体、挤出一道窄缝。不画撑杆：撑杆上端只能斜着接到箱底，尖角下会冒头
const PIVOT = [7.5, 12.5]
const up = d => rotate(d, -30, PIVOT)
const [L, top, mid, bottom] = [10, 6.5, 9.5, 12.5]
const X = PIVOT[0]
const pod = radius => [
  rounded([[X, top], [X + L, top], [X + L, bottom], [X, bottom, 0]], Math.min(radius, 1)),
  `M${X} ${mid}H${X + L}`,
].map(up)
export default ({ radius }) => [
  ...track(3, 21, 5),
  body([[5.5, 15.5], [4, 12.5], [15.5, 12.5], [15.5, 10.5], [19, 10.5], [20.5, 13.5], [18.5, 15.5]], radius),
  ...pod(radius),
]
