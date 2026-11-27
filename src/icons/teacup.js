import { rounded } from '../geometry'
import { hole, knock, solid } from '../solid'

// 茶杯：一只又宽又浅的圆底杯（4.5–16.5，杯口 6.5，杯底 15.5）+ 右边一个小把手 + 底下一条托碟线（18.5）
// + 搭在杯沿上、垂在杯身外面的茶包标签：一小段线（9.5，从杯口垂到 9.5）吊着一块实心的小方签（8–11 × 9.5–12.5）
// 宽浅的杯子 + 托碟 + 茶包标签是茶杯的记号：和直筒杯身、冒热气的 coffee，带壶嘴壶盖的 teapot 区分开
const cup = 'M4.5 6.5H16.5V9C16.5 12.75 13.75 15.5 10.5 15.5C7.25 15.5 4.5 12.75 4.5 9Z'
const handle = 'M16.5 8.5H18A2 2 0 0 1 18 12.5H15.6'
const saucer = 'M3.5 18.5H17.5'
const string = 'M9.5 6.5V9.5'
const tag = radius => rounded([[8, 9.5], [11, 9.5], [11, 12.5], [8, 12.5]], Math.min(radius, 0.5))

export default ({ radius }) => [cup, handle, saucer, string, { d: tag(radius), fill: true }]

// 实心：杯身一块，标签挖成一个小方洞、吊线挖空；把手、托碟照旧是线
export const fill = ({ radius }) => [solid(cup), knock(string), hole(tag(radius)), handle, saucer]
