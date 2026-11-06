import { circle } from '../geometry'
import { hole, knock, solid } from '../solid'

// 披萨（一块）：尖朝下的扇形 + 饼边线 + 三片香肠（半径 1，排在饼的上半宽处，彼此、和饼边都留得出缝）
export default ({ radius }) => [
  'M4 6.5C9.5 3.5 14.5 3.5 20 6.5L12 21Z',
  'M5.4 9C10 7 14 7 18.6 9',
  circle(10, 10.75, 1),
  circle(14, 10.75, 1),
  circle(12, 14.75, 1),
]

// 实心：饼一块，饼边线挖空，三片香肠挖成圆洞（外扩半个线宽后和描边版香肠的中心线一样大；粗字重下半径收不到 0，最少留 0.25）
export const fill = ({ stroke }) => {
  const [u, v] = [4.6, 2].map(c => c / Math.hypot(4.6, 2) * stroke)
  return [
    solid('M4 6.5C9.5 3.5 14.5 3.5 20 6.5L12 21Z'),
    // 饼边线两端顺着切线往外多伸一个线宽，把饼切干净
    knock(`M${5.4 - u} ${9 + v}L5.4 9C10 7 14 7 18.6 9L${18.6 + u} ${9 + v}`),
    hole([[10, 10.75], [14, 10.75], [12, 14.75]].map(([x, y]) => circle(x, y, Math.max(0.25, 1 - stroke / 2)))),
  ]
}
