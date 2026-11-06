import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { clear, knock, solid } from '../solid'

// 书架：左边一高一矮两本竖书 + 右边一本向左斜靠的书（左上角搭在矮书顶上）+ 书架横线
// 斜书是竖放的书绕左下角 (17, 20.5) 逆时针转 20° 得到的
const a = 20 * Math.PI / 180
const [c, s] = [Math.cos(a), Math.sin(a)]
const [px, py, w, h] = [17, 20.5, 3.75, 13]
const lean = [
  [px, py],
  [px + w * c, py - w * s],
  [px + w * c - h * s, py - w * s - h * c],
  [px - h * s, py - h * c],
]

export default ({ radius }) => {
  const r = Math.min(radius, 1)
  return [
    rounded([[4.5, 20.5], [4.5, 3.5], [8.5, 3.5], [8.5, 20.5]], r, false),
    rounded([[8.5, 20.5], [8.5, 7.5], [12.5, 7.5], [12.5, 20.5]], r, false),
    rounded(lean, r),
    'M3 20.5H21',
  ]
}

// 实心：两本竖书各一块，中间共用的边挖开；斜书四周让出缝再画实心；书架横线最后画，不被缝切断
export const fill = ({ radius }) => {
  const r = Math.min(radius, 1)
  return [
    solid(rounded([[4.5, 20.5], [4.5, 3.5], [8.5, 3.5], [8.5, 20.5]], r)),
    solid(rounded([[8.5, 20.5], [8.5, 7.5], [12.5, 7.5], [12.5, 20.5]], r)),
    knock('M8.5 7.5V20.5'),
    clear(rounded(lean, r), GAP),
    solid(rounded(lean, r)),
    'M3 20.5H21',
  ]
}
