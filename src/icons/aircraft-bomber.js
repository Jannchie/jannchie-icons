import { crisp } from '../geometry'
import { airframe, nose } from '../aircraft'

// 战略轰炸机：长机身、大后掠的细长主翼（翼展撑满、翼弦窄），机尾一对小平尾；和战斗机比，翼更细长、机身更长
// （坐标按机头朝上写，见 aircraft.js）
export default ({ radius }) => nose([
  airframe([
    [12, 2],
    [13.5, 5],
    [13.5, 8.5],
    [21.5, 15, crisp(radius)],
    [21.5, 16.5],
    [13.5, 12.5],
    [13.5, 18],
    [17.5, 20.5, crisp(radius)],
    [17.5, 21.5],
    [12, 21.5],
  ], Math.min(radius, 1)),
])
