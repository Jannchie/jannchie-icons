import { base } from '../chess'
import { crisp, rounded } from '../geometry'
import { dot } from '../scene'

// 国际象棋·后：五尖王冠 + 顶上一点 + 身子 + 底座
export default ({ radius }) => [
  rounded([[6.5, 7.5], [9.5, 11], [12, 6.5], [14.5, 11], [17.5, 7.5], [16, 14], [8, 14]], crisp(radius)),
  dot(12, 4.25),
  'M8.5 14L8 17.5',
  'M15.5 14L16 17.5',
  base(radius),
]
