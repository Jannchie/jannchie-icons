import { GAP } from '../clearance'
import { clear, solid } from '../solid'
import { mirror } from '../transform'

// 蝴蝶：俯视，左右对称。中间一根实心的身体（2 宽的胶囊，不受 .5 网格约束），每侧一大一小两片翅膀连成一条开口轮廓，
// 两端落在身体上；头顶两根触角从身体顶端斜出
const body = 'M11 8.5A1 1 0 0 1 13 8.5V18A1 1 0 0 1 11 18Z'
const wing = 'M12.75 9C14.5 5.5 20.5 3.5 21 7.5C21.25 10 19 12 15.5 12.5C18.5 13.25 19.75 15.5 18.75 17.75C17.75 20 14.25 19.5 12.75 15.5'
export default () => [
  wing,
  mirror(wing),
  { d: body, fill: true },
  'M12 8L14.5 3.5',
  'M12 8L9.5 3.5',
]

// 实心：两侧翅膀沿身体封口各成一块，在身体四周让出缝，再把身体画回去；触角照旧是线
export const fill = () => [
  solid([`${wing}Z`, `${mirror(wing)}Z`]),
  clear(body, GAP),
  solid(body),
  'M12 8L14.5 3.5',
  'M12 8L9.5 3.5',
]
