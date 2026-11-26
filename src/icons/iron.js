import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 熨斗（侧视，尖头朝左）：一整块流线形的机身——尖头在左下 (3, 17.5)，顶面从尖头一路鼓上去到平顶（6.5），后背竖直（20.5），底板平直（17.5）；
// 机身上半挖一个把手孔（前边斜着，跟着机身的坡度），底板上面一道分界线（14.5，前端落在机身的弧上）
// 流线形的坡面 + 把手孔是熨斗的记号：方盒子上架一个方框把手像一台机器；和洗涤标志 laundry-iron（只有半边把手的符号）区分开
const body = 'M3 17.5C3.5 12.5 6.5 6.5 12 6.5H17.5C19.25 6.5 20.5 7.75 20.5 9.5V17.5Z'
const grip = radius => rounded([[11, 12.5], [17, 12.5], [17, 9.5], [13, 9.5]], Math.min(radius, 1))
// 分界线前端 (3.9, 14.5) 在机身前坡的弧上
const plate = 'M3.9 14.5H20.5'

export default ({ radius }) => [body, grip(radius), plate]

// 实心：机身一块，把手孔的框挖空，分界线整条挖穿（底板成为单独的一片）
export const fill = ({ radius }) => [solid(body), knock([grip(radius), 'M1 14.5H23'])]
