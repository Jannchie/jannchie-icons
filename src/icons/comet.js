import { circle } from '../geometry'
import { solid } from '../solid'

// 彗星（流星）：左下的圆彗核（圆心 (7.5, 16.5)、半径 3.5）+ 往右上拖出去的三道平行的彗尾（斜 45°）：正中一道最长、从彗核的圆上接出去，
// 两边各一道短的、和彗核隔开半格
const head = circle(7.5, 16.5, 3.5)
const tail = ['M9.975 14.025L19.5 4.5', 'M7.25 10.75L13 5', 'M13.25 16.75L19 11']

export default () => [head, ...tail]

// 实心：彗核填实；彗尾照旧是线
export const fill = () => [solid(head), ...tail]
