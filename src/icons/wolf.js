import { oval, rounded } from '../geometry'
import { eye } from '../scene'
import { knock, solid } from '../solid'

// 狼：正面头像。一条闭合轮廓：两只竖直高耸的尖耳（耳尖 (6.5, 2.5) / (17.5, 2.5)）、耳间平的头顶（7.5）、
// 两颊往外支出一撮尖毛（(3, 14.5) / (21, 14.5)）、再收进来成一段方方的长吻（9.5–14.5，底平在 20.5）；两只眼睛，眼睛上面两道往中间压下来的眉（凶一点，是狼不是狗）+ 吻端的椭圆鼻头
// 和 fox（耳朵往外撇、脸是倒三角、下巴是尖的）、dog（垂耳）区分开：竖耳、颊毛、方吻、压低的眉
const face = radius => rounded([[6.5, 2.5, 0.75], [9.5, 7.5], [14.5, 7.5], [17.5, 2.5, 0.75], [18.5, 9.5], [21, 14.5, 0.5], [17.5, 15], [14.5, 20.5], [9.5, 20.5], [6.5, 15], [3, 14.5, 0.5], [5.5, 9.5]], Math.max(1, Math.min(radius, 1.5)))
const features = [
  eye(9.25, 12),
  eye(14.75, 12),
  { d: oval(12, 17.25, 1.5, 1), fill: true, round: true },
  { d: 'M7.25 9.25L10.75 10.25', round: true },
  { d: 'M16.75 9.25L13.25 10.25', round: true },
]

export default ({ radius }) => [face(radius), ...features]

// 实心：脸一块，眼睛、眉、鼻头挖空
export const fill = ({ radius }) => [solid(face(radius)), knock(features)]
