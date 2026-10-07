import { base } from '../chess'
import { crisp, rounded } from '../geometry'
import { dot } from '../scene'

// 国际象棋·后：五尖王冠 + 顶上一点 + 身子 + 底座
export default ({ radius }) => [
  rounded([[6.5, 7.5], [9.5, 11], [12, 6.5], [14.5, 11], [17.5, 7.5], [16, 14.5], [8, 14.5]], crisp(radius)),
  dot(12, 4.25),
  'M8.5 14.5L8 17.5',
  'M15.5 14.5L16 17.5',
  base(radius),
]
