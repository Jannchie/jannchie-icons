import { ring } from '../marks'
import { eye } from '../scene'
import { knock, solid } from '../solid'

// 噤声（闭嘴、保密、压低声音）：圆脸 + 两只眼睛 + 拉上拉链的嘴——一道横线上三道短竖线（拉链齿）
// 和 mood-empty 的一字嘴的区别就在这三道齿；齿用 detail 的细线，间隔 2，16px 下也分得开
const eyes = [eye(9, 9.75), eye(15, 9.75)]
const mouth = 'M8 15.5H16'
const teeth = [10, 12, 14].map(x => ({ d: `M${x} 14.15V16.85`, detail: true }))

export default () => [ring(), ...eyes, mouth, ...teeth]

// 实心：脸一块，眼睛、嘴和拉链齿挖空
export const fill = () => [solid(ring()), knock([...eyes, mouth, ...teeth])]
