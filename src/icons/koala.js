import { earedHead, oval } from '../geometry'
import { eye } from '../scene'
import { knock, solid } from '../solid'

// 考拉：正面头像，和 bear 同一种做法：圆脑袋（圆心 (12, 12.5)、半径 7）和两只大圆耳朵（圆心 (6, 8.25) / (18, 8.25)、半径 3.5）连成一条闭合轮廓；
// 两只眼睛 + 一颗竖着的大椭圆鼻头（实心）。和 bear 区分开：耳朵大、长在脑袋两侧往外支出去，鼻头又大又黑，没有嘴
const [hx, hy, R] = [12, 12.5, 7]
const [ex, ey, r] = [6, 8.25, 3.5]
const head = earedHead([hx, hy], R, [ex, ey], r)
const features = [eye(8.75, 11.25), eye(15.25, 11.25), { d: oval(12, 14.5, 1.5, 2.25), fill: true, round: true }]

export default () => [head, ...features]

// 实心：脑袋连耳朵一块，眼睛、鼻头挖空
export const fill = () => [solid(head), knock(features)]
