import { circle } from '../geometry'
import { stacked } from '../solid'

// 沙拉：一只碗（碗口 3–21 在 12.5，碗底到 20.5）+ 碗口上冒出来的两片尖叶子（左边一片大的往左上斜，中间一片往右上斜）
// + 右边一颗小番茄（圆，半径 2.25，和中间那片叶子留出实心版也看得见的缝）。叶子、番茄的底都落在碗口上；左右不对称，免得两片叶子看成一对耳朵
const bowl = 'M3 12.5H21C21 17 17 20.5 12 20.5C7 20.5 3 17 3 12.5Z'
const leaves = [
  'M8 12.5C4.5 12 3 8.5 4 5C7.5 6 9.5 9 8 12.5Z',
  'M11 12.5C10 9.5 10.5 6.5 12.5 4.5C14 7 13.75 10 11 12.5Z',
]
const tomato = circle(18.25, 10.25, 2.25)

export default () => [bowl, ...leaves, tomato]

// 实心：叶子、番茄各一块，碗在前、它们在碗口上让出缝
export const fill = () => stacked([...leaves, tomato], bowl)
