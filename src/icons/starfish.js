import { rounded } from '../geometry'
import { eye } from '../scene'
import { knock, solid } from '../solid'

// 海星：五条圆头的胖腕（腕尖在圆心 (12, 12.9)、半径 10.5 的圆上，腕之间的凹处在半径 5 的圆上，尖和凹处都是半径 2 的圆角，不随全局圆角变——海星没有尖角）
// + 身上六颗小圆点（正中一颗，每条腕上一颗）。圆头胖腕 + 小圆点是海星的记号：和尖角、空心的 star 区分开
const [cx, cy] = [12, 12.9]
const at = (deg, r) => [+(cx + r * Math.cos(deg * Math.PI / 180)).toFixed(3), +(cy + r * Math.sin(deg * Math.PI / 180)).toFixed(3)]
const body = rounded([...Array(5).keys()].flatMap(i => [[...at(-90 + i * 72, 10.5), 2], [...at(-54 + i * 72, 5), 2]]), 2)
const spots = [eye(cx, cy, 1.5), ...[...Array(5).keys()].map(i => eye(...at(-90 + i * 72, 4.75), 1.5))]

export default () => [body, ...spots]

// 实心：海星一块，小圆点挖空
export const fill = () => [solid(body), knock(spots)]
