import { crisp } from '../geometry'
import { airframe, nose } from '../aircraft'

// 战斗机：尖机头、细长机身，大后掠的三角形主翼，机尾一对小平尾；主翼后缘直接收回机身，和平尾之间留一段机身，不切尖缺口
// 尖角（机头、翼尖、平尾尖）用 crisp，不随全局圆角变钝（坐标按机头朝上写，见 aircraft.js）
export default ({ radius }) => nose([
  airframe([
    [12, 2, crisp(radius)],
    [13.5, 6],
    [13.5, 9.5],
    [21.5, 16, crisp(radius)],
    [21.5, 17.5],
    [13.5, 16.5],
    [13.5, 18],
    [17.5, 20.5, crisp(radius)],
    [17.5, 21.5],
    [12, 21.5],
  ], Math.min(radius, 1)),
])
