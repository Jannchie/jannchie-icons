import { hole, knock, solid } from '../solid'

// 马戏团大篷：两边往下兜的尖顶篷布（顶点 (12, 5.5)，檐口 3–21，檐边垂到 13.5）+ 檐下收进来的直筒帐身（4.5–19.5，落到 20.5）
// + 帐身正中掀开的三角门帘 + 篷顶上一面朝右飘的小三角旗（实心）
const roof = 'M12 5.5C9.5 8.5 6.5 10.25 3 11.25L3.5 13.5H20.5L21 11.25C17.5 10.25 14.5 8.5 12 5.5Z'
const walls = 'M4.5 13.5V20.5H19.5V13.5'
const door = 'M9.5 20.5L12 14.5L14.5 20.5'
const flag = { d: 'M12 2.5L15.5 3.75L12 5Z', fill: true }
const pole = 'M12 5.5V2.5'

export default () => [roof, walls, door, pole, flag]

// 实心：篷顶、帐身各一块，檐口的接缝整条挖穿；门帘挖成一个三角的洞（往下挖穿帐身的底边）；旗和旗杆照旧
export const fill = ({ stroke }) => [
  solid([roof, `${walls}Z`]),
  knock('M1 13.5H23'),
  hole(`M${9.5 + stroke} 23L12 ${14.5 + stroke * 2.4}L${14.5 - stroke} 23Z`),
  pole,
  flag,
]
