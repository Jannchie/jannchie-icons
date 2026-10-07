import { crisp } from '../geometry'
import { airframe, nose } from '../aircraft'

// 攻击机（A-10 式）：长机头、平直的宽弦主翼，机尾平尾两端是竖着的端板垂尾（俯视成一段沿机身方向的短边，整体像 H）
// （坐标按机头朝上写，见 aircraft.js）
export default ({ radius }) => nose([
  airframe([
    [12, 2],
    [13.5, 5],
    [13.5, 9],
    [21.5, 9.5, crisp(radius)],
    [21.5, 12.5, crisp(radius)],
    [13.5, 13],
    [13.5, 18.5],
    [17.5, 18.5],
    [17.5, 17.5, crisp(radius)],
    [18.5, 17.5, crisp(radius)],
    [18.5, 21.5, crisp(radius)],
    [12, 21.5],
  ], Math.min(radius, 0.75)),
])
