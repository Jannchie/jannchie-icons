import { rounded } from '../geometry'
import { solid } from '../solid'

// 火山：平顶的山体（底边 2.5–21.5 在 20.5，山顶 8.5–15.5 在 10.5），山顶往下凹成火山口；火山口上方三道喷出来的岩浆（正中一道竖直，两边各一道往外撇）
const mountain = radius => `${rounded([[8.5, 10.5, 0], [2.5, 20.5], [21.5, 20.5], [15.5, 10.5, 0]], Math.min(radius, 1.5), false)}C14 12 10 12 8.5 10.5Z`
const lava = ['M12 8V3.5', 'M9 7.5L7.5 4.5', 'M15 7.5L16.5 4.5']

export default ({ radius }) => [mountain(radius), ...lava]

// 实心：山体一块；岩浆照旧是线
export const fill = ({ radius }) => [solid(mountain(radius)), ...lava]
