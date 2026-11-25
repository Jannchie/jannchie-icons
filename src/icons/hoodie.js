import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 卫衣（连帽衫，正面）：衣身和 jacket 同一个版型（长袖垂到 17.5，衣身到 20.5）；领口上面一顶兜帽（从两肩拱到 2.75），
// 兜帽的前沿是一道从两肩兜下来的弧；前襟下半一个梯形的袋鼠兜；兜帽前沿垂下来两根抽绳
const outer = [[8.5, 5], [4.5, 6.5], [3, 17.5], [6.5, 17.5], [6.5, 20.5], [17.5, 20.5], [17.5, 17.5], [21, 17.5], [19.5, 6.5], [15.5, 5]]
const hood = 'C15.5 3.5 14 2.75 12 2.75C10 2.75 8.5 3.5 8.5 5'
const body = radius => `${rounded(outer, Math.min(radius, 1.5), false)}${hood}Z`
const neck = 'M8.5 5C9.5 7.5 14.5 7.5 15.5 5'
const pocket = radius => rounded([[9, 20.5], [9.5, 15.5], [14.5, 15.5], [15, 20.5]], Math.min(radius, 1), false)
const strings = ['M10.5 7.5V10.5', 'M13.5 7.5V10.5']
const seams = ['M6.5 17.5V10.5', 'M17.5 17.5V10.5']

export default ({ radius }) => [body(radius), neck, pocket(radius), ...strings, ...seams]

// 实心：卫衣一块，兜帽前沿的弧挖穿（兜帽成为单独的一片），袋鼠兜的轮廓往下挖穿下摆（兜成为单独的一片）
export const fill = ({ radius }) => [
  solid(body(radius)),
  knock([neck, rounded([[8.9, 23], [9.5, 15.5], [14.5, 15.5], [15.1, 23]], Math.min(radius, 1), false)]),
]
