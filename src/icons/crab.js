import { eye } from '../scene'
import { knock, solid } from '../solid'
import { mirror } from '../transform'

// 螃蟹：正面。扁圆的蟹壳（圆心 (12, 14.5)、半径 6 × 4.5）+ 两只眼睛 + 从壳的上沿往两边举起来的一对大钳子（弯的钳臂 + 张着口的 C 形钳）
// + 壳两侧往外下方伸的蟹腿（每边三条）
const shell = 'M6 14.5A6 4.5 0 1 0 18 14.5A6 4.5 0 1 0 6 14.5Z'
const eyes = [eye(10, 13.5), eye(14, 13.5)]
// 左边的钳子和腿，右边是镜像
const arm = 'M7.75 11.3C6 10.75 5 9.75 4.75 8.5'
const claw = 'M6.9 5.4A2.5 2.5 0 1 0 7.2 7.2'
const legs = ['M6.05 15L3.25 15.5', 'M7 17.25L4.5 19.5', 'M9 18.6L8 21']
const left = [arm, claw, ...legs]
const limbs = [...left, ...left.map(d => mirror(d))]

export default () => [shell, ...eyes, ...limbs]

// 实心：蟹壳一块，眼睛挖空；钳子和腿照旧是线
export const fill = () => [solid(shell), knock(eyes), ...limbs]
