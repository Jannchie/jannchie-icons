import { circle, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 棋钟（读秒、对局计时）：横放的机身（3.5–20.5 × 8.5–18.5）+ 两个表盘（各一根斜指针）+ 顶上两个按钮，左边弹起、右边按下
// 横竖边都落在 .5 上；表盘中心 x 8.25 / 15.75、半径 2.25：离机身侧边 2.5、彼此相距 3，粗字重下也留得出空隙
const body = radius => rounded([[3.5, 8.5], [20.5, 8.5], [20.5, 18.5], [3.5, 18.5]], Math.min(radius, 2.5))
const faces = [circle(8.25, 13.5, 2.25), circle(15.75, 13.5, 2.25)]
const hands = ['M8.25 13.5L7.19 12.44', 'M15.75 13.5L16.81 12.44']
const buttons = radius => [
  rounded([[5.5, 8.5], [5.5, 5.5], [10.5, 5.5], [10.5, 8.5]], Math.min(radius, 0.75), false),
  rounded([[13.5, 8.5], [13.5, 6.5], [18.5, 6.5], [18.5, 8.5]], Math.min(radius, 0.75), false),
]

export default ({ radius }) => [body(radius), ...faces, ...hands, ...buttons(radius)]

// 实心：机身一块，挖掉表盘的圆圈（表盘留成实心圆）和指针；按钮也是实心
export const fill = ({ radius }) => [
  solid([body(radius), ...buttons(radius).map(d => `${d}Z`)]),
  knock([...faces, ...hands]),
]
