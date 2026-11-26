import { rounded } from '../geometry'
import { eye } from '../scene'
import { solid } from '../solid'
import { rotate } from '../transform'

// 风铃（日式风铃）：一只圆鼓鼓的玻璃球（7–17 宽，顶到 4.5，往下收成 7.5–16.5 的口，口沿在 11.5）挂在顶上的短绳上；
// 口下面露出一颗舌珠，长绳底下挂一张短册（纸条，4 × 5.75），被风吹得往右上扬（绕绳端 (12, 15.5) 逆时针转 15°）
// 收口的玻璃球 + 舌珠 + 飘起来的纸条是记号：半球形的钟罩加纸条像一只餐盘盖挂了个价签，bell 是带宽口沿的通知铃
const hook = 'M12 2.75V4.5'
const globe = 'M7.5 11.5C5 8 7.5 4.5 12 4.5C16.5 4.5 19 8 16.5 11.5Z'
const cord = 'M12 11.5V15.5'
const bead = eye(12, 13.75, 2.25)
const strip = rotate(rounded([[10, 15.5], [14, 15.5], [14, 21.25], [10, 21.25]], 0.5), -15, [12, 15.5])

export default () => [hook, globe, cord, bead, strip]

// 实心：玻璃球、纸条各一块，挂绳和舌珠照旧
export const fill = () => [solid(globe), solid(strip), hook, cord, bead]
