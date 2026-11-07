import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 保存（软盘）：右上切角的方框 + 上方快门 + 下方标签
export default ({ radius }) => [
  rounded([[3.5, 3.5], [16.5, 3.5], [20.5, 7.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 2)),
  rounded([[7.5, 3.5], [7.5, 7.5], [14.5, 7.5], [14.5, 3.5]], Math.min(radius, 1), false),
  rounded([[7.5, 20.5], [7.5, 13.5], [16.5, 13.5], [16.5, 20.5]], Math.min(radius, 1), false),
]

// 实心：软盘一块，挖掉快门和标签的边线，两条竖边分别穿出顶边、底边（停在外框中线上的线帽只擦到外缘，留一道细桥），
// 快门、标签各自成一块
export const fill = ({ radius }) => [
  solid(rounded([[3.5, 3.5], [16.5, 3.5], [20.5, 7.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 2))),
  knock([
    rounded([[7.5, 0], [7.5, 7.5], [14.5, 7.5], [14.5, 0]], Math.min(radius, 1), false),
    rounded([[7.5, 24], [7.5, 13.5], [16.5, 13.5], [16.5, 24]], Math.min(radius, 1), false),
  ]),
]
