import { rounded } from '../geometry'
import { dot } from '../scene'

// 萨克斯：左上斜出的吹嘴 + 竖直主管 + 底部 U 形弯 + 右侧竖上去的管子末端接一个向上张开的梯形喇叭口 + 管身三个按键
export default ({ radius }) => [
  'M6.5 2.5L9.5 5.5V16A3.5 3.5 0 0 0 16.5 16V13.5',
  rounded([[15.75, 13.5], [14, 8.5], [21, 8.5], [17.25, 13.5]], Math.min(radius, 1)),
  dot(9.5, 8.5),
  dot(9.5, 11.25),
  dot(9.5, 14),
]
