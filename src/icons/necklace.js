import { rounded } from '../geometry'
import { solid } from '../solid'

// 项链：一条从两肩垂下来的链子（U 形的弧，4.5–19.5，垂到 14.5）+ 链子最低处挂着的一颗菱形吊坠（到 21.25）
const chain = 'M4.5 3.5C4.5 10 7.5 14.5 12 14.5C16.5 14.5 19.5 10 19.5 3.5'
const pendant = radius => rounded([[12, 14.5], [14.75, 17.75], [12, 21.25], [9.25, 17.75]], Math.min(radius, 0.5))

export default ({ radius }) => [chain, pendant(radius)]

// 实心：吊坠填实；链子照旧是线
export const fill = ({ radius }) => [chain, solid(pendant(radius))]
