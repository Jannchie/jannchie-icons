import { crisp, rounded, through } from '../geometry'
import { knock, solid } from '../solid'
import { rotate } from '../transform'

// 风筝：菱形的风筝面（上短下长）+ 十字的骨架（竖骨、横骨，两端接在菱形的四个角上）+ 底角拖出去的一条弯弯的尾巴；
// 先竖着画，再绕 (12, 10.5) 顺时针转 30°：风筝往右上飞，尾巴甩在左下
const C = [12, 10.5]
const [TOP, RIGHT, BOTTOM, LEFT] = [[12, 2], [19, 8.5], [12, 19], [5, 8.5]]
const tilt = d => rotate(d, 30, C)
const face = radius => tilt(rounded([TOP, RIGHT, BOTTOM, LEFT], crisp(radius)))
const spars = [tilt(through(TOP, BOTTOM, 0)), tilt(through(LEFT, RIGHT, 0))]
// 尾巴从转过以后的底角 (7.75, 17.86) 接出去
const tail = 'M7.75 17.86C6.5 19 8.25 20 6.75 21.25'

export default ({ radius }) => [face(radius), ...spars, tail]

// 实心：风筝面一块，两根骨架两头都挖穿，分成四片；尾巴照旧是线
export const fill = ({ radius, stroke }) => [
  solid(face(radius)),
  knock([tilt(through(TOP, BOTTOM, stroke * 2)), tilt(through(LEFT, RIGHT, stroke * 2))]),
  tail,
]
