import { rounded } from '../geometry'
import { dot, eye } from '../scene'
import { knock, solid } from '../solid'

// 狐狸：正面头像。一条闭合轮廓：两只竖起的大尖耳（耳尖 (4.5, 3.5) / (19.5, 3.5)）、耳朵之间平的头顶、
// 两腮最宽（3 / 21 在 11.5），往下直线收成尖下巴 (12, 20.5)；两只眼睛 + 下巴尖上的鼻头
const face = radius => rounded([[4.5, 3.5, 1], [9.5, 7.5], [14.5, 7.5], [19.5, 3.5, 1], [21, 11.5], [12, 20.5], [3, 11.5]], Math.max(1, Math.min(radius, 2)))
const features = [eye(8.5, 12), eye(15.5, 12), { ...dot(12, 16.75), round: true }]

export default ({ radius }) => [face(radius), ...features]

// 实心：脸一块，眼睛、鼻头挖空
export const fill = ({ radius }) => [solid(face(radius)), knock(features)]
