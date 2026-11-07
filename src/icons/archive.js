import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 归档：盖子 + 箱体 + 把手
export default ({ radius, stroke }) => [
  // 箱体两侧比盖子各收进 2，接在盖子底边的直线段上，不会被吸到圆角上
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 8.5], [3.5, 8.5]], Math.min(radius, 1.5)),
  rounded([[5.5, 8.5], [5.5, 20.5], [18.5, 20.5], [18.5, 8.5]], Math.min(radius, 2), false),
  'M10 12.5H14',
]

// 实心：盖子、箱体各一块，中间挖开一道缝（盖子和箱体本来共用一条边，不挖就粘成一团）；把手挖空，
// 粗字重下缝变宽，把手往下挪，和缝之间至少留一个线宽
export const fill = ({ radius, stroke }) => {
  const handle = Math.max(12.5, 8.5 + 3 * stroke)
  return [
    solid(rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 8.5], [3.5, 8.5]], Math.min(radius, 1.5))),
    solid(`${rounded([[5.5, 8.5], [5.5, 20.5], [18.5, 20.5], [18.5, 8.5]], Math.min(radius, 2), false)}Z`),
    knock([`M3 ${8.5 + stroke}H21`, `M10 ${handle}H14`]),
  ]
}
