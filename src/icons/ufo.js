import { eye } from '../scene'
import { knock, stacked } from '../solid'

// 飞碟：扁扁的碟身（2.75–21.25 × 9.5–14.5，两头尖一点）+ 碟身顶上的圆座舱（8.5–15.5，顶到 5.5）+ 碟身上一排三个舷窗点
// + 碟底往下照的三道光束（正中一道竖直，两边各一道往外撇）
const disc = 'M2.75 11.5C2.75 10 6.5 9.5 12 9.5C17.5 9.5 21.25 10 21.25 11.5C21.25 13.5 17 14.5 12 14.5C7 14.5 2.75 13.5 2.75 11.5Z'
const dome = 'M8.5 9.65V9A3.5 3.5 0 0 1 15.5 9V9.65'
const lights = [eye(7.5, 12, 1.5), eye(12, 12.25, 1.5), eye(16.5, 12, 1.5)]
const beams = ['M12 16.5V20', 'M8.5 16.5L6.5 20', 'M15.5 16.5L17.5 20']

export default () => [disc, dome, ...lights, ...beams]

// 实心：座舱封口成一块，碟身在前，座舱在碟身四周让出缝；舷窗挖空；光束照旧是线
export const fill = () => [...stacked(`${dome}Z`, disc), knock(lights), ...beams]
