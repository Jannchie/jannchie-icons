import { rounded } from '../geometry'
import { dot } from '../scene'

// 萨克斯：左上斜出的吹嘴 + 竖直主管 + 底部 U 形弯 + 右侧竖上去的管子末端接一个向上张开的梯形喇叭口 + 管身三个按键
// 主管在 x = 8、喇叭口最右到 19.5，墨迹左右上下都居中
export default ({ radius }) => [
  'M5 3.5L8 6.5V17A3.5 3.5 0 0 0 15 17V14.5',
  rounded([[14.25, 14.5], [12.5, 9.5], [19.5, 9.5], [15.75, 14.5]], Math.min(radius, 1)),
  dot(8, 9.5),
  dot(8, 12.25),
  dot(8, 15),
]
