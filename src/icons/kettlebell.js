import { circle } from '../geometry'
import { solid } from '../solid'

// 壶铃：圆球形的铃身（圆心 (12, 14.5)、半径 6）+ 铃身顶上的提把（一道方圆的拱，8.5–15.5，顶到 3.5，两脚落在铃身的圆上）
const ball = circle(12, 14.5, 6)
// 提把两脚落在圆上：x = 8.5 / 15.5 处弧高 14.5 − √(6² − 3.5²)
const foot = +(14.5 - Math.sqrt(36 - 12.25)).toFixed(3)
const handle = `M8.5 ${foot}V6.5A3 3 0 0 1 11.5 3.5H12.5A3 3 0 0 1 15.5 6.5V${foot}`

export default () => [ball, handle]

// 实心：铃身填实；提把照旧是线
export const fill = () => [solid(ball), handle]
