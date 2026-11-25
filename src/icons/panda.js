import { circle, meet, oval } from '../geometry'
import { rotate } from '../transform'

// 熊猫：正面头像。圆脑袋（圆心 (12, 13)、半径 7.75）+ 两只实心的黑耳朵（圆心 (6, 6.5) / (18, 6.5)、墨迹半径 3.5，只画露在脑袋外面的月牙）
// + 两块往外撇的实心黑眼圈（椭圆 1.6 × 2.3，各往外转 25°）+ 实心的小鼻头 + 鼻头下一道小弧嘴
const [hx, hy, R] = [12, 13, 7.75]
const [ex, ey, r] = [6, 6.5, 3.5]
const f = v => +v.toFixed(3)
const [a, b] = meet([hx, hy], R, [ex, ey], r)
const P = ([x, y]) => `${f(x)} ${f(y)}`
const M = ([x, y]) => `${f(24 - x)} ${f(y)}`
// 耳朵的月牙：耳朵的圆在脑袋外面的那一段 + 沿脑袋的圆弧回来
const ears = [
  `M${P(b)}A${r} ${r} 0 1 1 ${P(a)}A${R} ${R} 0 0 0 ${P(b)}Z`,
  `M${M(b)}A${r} ${r} 0 1 0 ${M(a)}A${R} ${R} 0 0 1 ${M(b)}Z`,
]
const patches = [rotate(oval(8.75, 12.25, 1.6, 2.3), 25, [8.75, 12.25]), rotate(oval(15.25, 12.25, 1.6, 2.3), -25, [15.25, 12.25])]
const nose = oval(12, 16, 1.1, 0.7)
const mouth = 'M10.75 17.75Q12 18.75 13.25 17.75'
const head = circle(hx, hy, R)

export default () => [
  head,
  ...[...ears, ...patches, nose].map(d => ({ d, fill: true, round: true })),
  mouth,
]

// 没有实心版：脑袋填实的话黑眼圈、黑耳朵只能反成白的，就不像熊猫了；描边版本身已经是黑白两色，实心变体直接用它
