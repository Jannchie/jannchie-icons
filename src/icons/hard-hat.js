import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 安全帽：半圆的帽壳（4.5–19.5，圆心 (12, 13.5)、半径 7.5，顶到 6，直边落到帽檐上）+ 两头伸出去的帽檐（3–21 × 15.5–18.5）
// + 帽顶正中两道竖的加强筋（10.5 / 13.5，从帽壳的弧上落到 10.5）
const shell = 'M4.5 15.5V13.5A7.5 7.5 0 0 1 19.5 13.5V15.5'
const brim = radius => rounded([[3, 15.5], [21, 15.5], [21, 18.5], [3, 18.5]], Math.min(radius, 1.5))
// 加强筋的上端在帽壳的弧上：x = 10.5 / 13.5 处弧高 13.5 − √(7.5² − 1.5²)
const top = +(13.5 - Math.sqrt(7.5 ** 2 - 1.5 ** 2)).toFixed(3)
const ribs = [`M10.5 ${top}V10.5`, `M13.5 ${top}V10.5`]

export default ({ radius }) => [shell, brim(radius), ...ribs]

// 实心：帽壳、帽檐各一块，接缝整条挖穿；两道加强筋从帽顶外面切进来
export const fill = ({ radius, stroke }) => [
  solid([`${shell}Z`, brim(radius)]),
  knock(['M1 15.5H23', ...[10.5, 13.5].map(x => `M${x} ${top - stroke * 1.5}V10.5`)]),
]
