// 民航客机（俯视，机头朝右）：起飞、降落图标共用
// 坐标按「机头朝上、轴 x = 12」写（见 aircraft.js 的 airframe / nose）；和军机的区别：机头圆钝（圆角 2），
// 主翼前缘后掠、后缘是一道和机身垂直的直线（✈ 的经典轮廓），机尾一对小平尾；不画发动机
import { crisp } from './geometry'
import { airframe, nose } from './aircraft'

export const plane = radius => nose([
  airframe([
    [12, 2.5, Math.min(radius, 2)],
    [13.5, 4.5],
    [13.5, 9],
    [21.5, 13.5, crisp(radius)],
    [21.5, 15.5],
    [13.5, 15.5],
    [13.5, 18.5],
    [16.5, 20.5, crisp(radius)],
    [16.5, 21.5],
    [12, 21.5],
  ], Math.min(radius, 1)),
])
