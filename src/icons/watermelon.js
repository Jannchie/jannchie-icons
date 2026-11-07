import { dot } from '../scene'
import { knock, solid } from '../solid'

// 西瓜（一瓣）：半圆瓜瓣 + 瓜皮线 + 三颗瓜子
// 瓜子排在和瓜皮同心（圆心 (12, 7.5)）、半径 3.75 的弧上，左右两颗在斜下 45° 处，中间一颗在正下方：
// 离瓜瓤上沿和瓜皮线差不多远，不挤在瓜皮边上；瓜子直径 1.5，粗字重下和上沿、瓜皮线也留得出空隙
const SEEDS = [[9.35, 10.15], [12, 11.25], [14.65, 10.15]]
const seeds = () => SEEDS.map(([x, y]) => dot(x, y, 1.5))
export default ({ radius }) => [
  'M3 7.5A9 9 0 0 0 21 7.5Z',
  'M5.5 7.5A6.5 6.5 0 0 0 18.5 7.5',
  ...seeds(),
]

// 实心：瓜瓣一块，挖掉瓜皮线（瓜皮和瓜瓤分开）和三颗瓜子；瓜子大小停在常规字重那一档（eye），粗字重下不会挤到瓜皮；
// 尖角模式下也是圆的
export const fill = ({ stroke }) => [
  solid('M3 7.5A9 9 0 0 0 21 7.5Z'),
  knock([`M5.5 ${7.5 - stroke}V7.5A6.5 6.5 0 0 0 18.5 7.5V${7.5 - stroke}`, ...seeds().map(p => ({ ...p, eye: true, round: true }))]),
]
