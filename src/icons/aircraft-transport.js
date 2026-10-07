import { airframe, nose } from '../aircraft'

// 运输机：粗机身（半宽 2.5）、圆钝的机头，平直略带梢根比的上单翼，机尾一道宽平尾（T 尾俯视）
// （坐标按机头朝上写，见 aircraft.js）
export default ({ radius }) => nose([
  airframe([
    [12, 2.5, Math.min(radius, 2.5)],
    [14.5, 5],
    [14.5, 8.5],
    [21.5, 9.5],
    [21.5, 11.5],
    [14.5, 12.5],
    [14.5, 15.5],
    [13, 18.5],
    [17.5, 19],
    [17.5, 21.5],
    [12, 21.5],
  ], Math.min(radius, 1)),
])
