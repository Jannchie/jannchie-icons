import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 提灯：顶上的提环 + 梯形灯帽 + 灯罩（里面一团火苗）+ 底座
// 提环两端伸进灯帽里，和灯帽连成一体
const handle = 'M9.5 6.5V5.5A2.5 2.5 0 0 1 14.5 5.5V6.5'
const cap = radius => rounded([[7, 7.5], [9, 5.5], [15, 5.5], [17, 7.5]], Math.min(radius, 1))
const glass = radius => rounded([[7.5, 7.5], [16.5, 7.5], [16.5, 17.5], [7.5, 17.5]], Math.min(radius, 1))
const base = radius => rounded([[6.5, 17.5], [17.5, 17.5], [17.5, 20.5], [6.5, 20.5]], Math.min(radius, 1))
const flame = 'M12 15C10.9 15 10.25 14.3 10.25 13.4C10.25 12.5 11 11.75 12 10.5C13 11.75 13.75 12.5 13.75 13.4C13.75 14.3 13.1 15 12 15Z'

export default ({ radius }) => [handle, cap(radius), glass(radius), base(radius), flame]

// 实心：灯帽、灯罩、底座各一块，接缝挖开；火苗的轮廓挖掉，火苗本身留成实心
export const fill = ({ radius }) => [
  handle,
  solid([cap(radius), glass(radius), base(radius)]),
  knock(['M6 7.5H18', 'M6 17.5H18', flame]),
]
