import { oval } from '../geometry'
import { eye } from '../scene'
import { knock, solid } from '../solid'

// 蛇：一条来回盘成 S 形的蛇身（三段横线 19.5 / 12.5 / 5.5，两头用半圆接起来；尾巴在左下）+ 右上一颗椭圆的蛇头（11.75–17.75 × 3–8，带一只眼睛）
// + 蛇头前面分叉的信子。有轮廓、有眼睛的蛇头把它和一段弯管、一条路线区分开
const body = 'M3 19.5H13A3.5 3.5 0 0 0 13 12.5H9A3.5 3.5 0 0 1 9 5.5H11.75'
const head = oval(14.75, 5.5, 3, 2.5)
const pupil = eye(15.25, 5.5, 1.5)
const tongue = ['M17.75 5.5H19.75', 'M21 4.25L19.75 5.5L21 6.75']

export default () => [body, head, pupil, ...tongue]

// 实心：蛇头一块，眼睛挖空；蛇身和信子照旧是线
export const fill = () => [body, solid(head), knock(pupil), ...tongue]
