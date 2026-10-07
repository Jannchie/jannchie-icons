import { crisp } from '../geometry'
import { airframe, nose } from '../aircraft'

// 隐身轰炸机：没有机身和尾翼的飞翼；前缘一条直线斜到翼尖，后缘是平行于前缘的锯齿（W 形）
// （坐标按机头朝上写，见 aircraft.js）
export default ({ radius }) => nose([
  airframe([
    [12, 5.5],
    [21.5, 15, crisp(radius)],
    [21.5, 16],
    [18.5, 19, crisp(radius)],
    [15.5, 16.5, crisp(radius)],
    [12, 19, crisp(radius)],
  ], Math.min(radius, 1.5)),
])
