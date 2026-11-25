import { dot } from '../scene'
import { knock, solid } from '../solid'

// 哨子：左边圆圆的哨腔（圆心 (8.5, 12.5)、半径 5）+ 从哨腔顶上往右伸出去的吹嘴（一段长方管，7.5–11.5，到 20.5），哨腔和吹嘴是一条闭合轮廓；
// 吹嘴上面一道出气口（短竖线，从管顶切下来）+ 哨腔正中的哨珠
// 吹嘴的下沿落回哨腔的圆上：y = 11.5 处在 x = 8.5 + √(5² − 1²)
const jx = +(8.5 + Math.sqrt(24)).toFixed(3)
const body = `M8.5 7.5H20.5V11.5H${jx}A5 5 0 1 1 8.5 7.5Z`
const vent = 'M12.5 7.5V9.5'
const pea = { ...dot(8.5, 12.5, 2.5), round: true }

export default () => [body, vent, pea]

// 实心：哨子一块，出气口从管顶外面切进来，哨珠挖空
export const fill = ({ stroke }) => [solid(body), knock([`M12.5 ${7.5 - stroke * 1.5}V9.5`, pea])]
