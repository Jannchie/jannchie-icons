import { circle } from '../geometry'
import { solid } from '../solid'

// 滑板（侧视）：两头翘起的板面（一条线，平的一段在 10.5，板头板尾翘到 8.5）+ 两组轮架（短竖线 7.5 / 16.5）+ 两个轮子（半径 2，挂在轮架下面，离板面 1）
const deck = 'M3 8.5C3.5 9.75 4.5 10.5 6 10.5H18C19.5 10.5 20.5 9.75 21 8.5'
const trucks = ['M7.5 10.5V13', 'M16.5 10.5V13']
const wheels = [circle(7.5, 15, 2), circle(16.5, 15, 2)]

export default () => [deck, ...trucks, ...wheels]

// 实心：两个轮子填实；板面和轮架照旧是线
export const fill = () => [deck, ...trucks, solid(wheels)]
