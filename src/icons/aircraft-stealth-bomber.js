import { crisp } from '../geometry'
import { airframe, nose } from '../aircraft'

// 隐身轰炸机：没有机身和尾翼的飞翼；前缘一条直线斜到翼尖，后缘是平行于前缘的锯齿（W 形）
// （坐标按机头朝上写，见 aircraft.js）机头 5 到后缘 18.5，前后居中（转成机头朝右后左右留白相等）
export default ({ radius }) => nose([
  airframe([
    [12, 5],
    [21.5, 14.5, crisp(radius)],
    [21.5, 15.5],
    [18.5, 18.5, crisp(radius)],
    [15.5, 16, crisp(radius)],
    [12, 18.5, crisp(radius)],
  ], Math.min(radius, 1.5)),
])
