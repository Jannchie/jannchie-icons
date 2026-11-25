import { meet, oval } from '../geometry'
import { eye } from '../scene'
import { knock, solid } from '../solid'

// 熊：正面头像。圆脑袋（圆心 (12, 13)、半径 7.75）和两只圆耳朵（圆心 (6, 6.5) / (18, 6.5)、半径 3）是一条闭合轮廓，耳朵是从脑袋上鼓出来的两段圆弧；
// 两只眼睛 + 一颗实心的椭圆鼻头 + 鼻头下隔开一段的一弯笑嘴（不画吻部的圈和人中：挤在一起粗字重下糊成一团，实心版像两颗门牙）
const [hx, hy, R] = [12, 13, 7.75]
const [ex, ey, r] = [6, 6.5, 3]
const f = v => +v.toFixed(3)
// 左耳的圆和脑袋的圆的两个交点：a 在头顶一侧，b 在脸侧
const [a, b] = meet([hx, hy], R, [ex, ey], r)
const P = ([x, y]) => `${f(x)} ${f(y)}`
const M = ([x, y]) => `${f(24 - x)} ${f(y)}`
const head = `M${P(b)}A${r} ${r} 0 1 1 ${P(a)}A${R} ${R} 0 0 1 ${M(a)}A${r} ${r} 0 1 1 ${M(b)}A${R} ${R} 0 1 1 ${P(b)}Z`
const features = [
  eye(9, 11.5),
  eye(15, 11.5),
  { d: oval(12, 14.5, 1.5, 1), fill: true, round: true },
]
const mouth = 'M10 16.75Q12 18.75 14 16.75'

export default () => [head, ...features, mouth]

// 实心：脑袋连耳朵一块，眼睛、鼻头、嘴挖空（尖角模式下也按圆角挖，同 cat）
export const fill = () => [solid(head), knock([...features, { d: mouth, round: true }])]
