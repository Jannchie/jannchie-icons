import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 画布正中：画布外框（3–21，正方形，中心 12）+ 正中的对象方块（8–16）+ 四边中点伸向方块的短刻度
export default ({ radius }) => [
  rounded([[3, 3], [21, 3], [21, 21], [3, 21]], Math.min(radius, 2.5)),
  rounded([[8, 8], [16, 8], [16, 16], [8, 16]], Math.min(radius, 1.5)),
  'M12 3V6',
  'M12 18V21',
  'M3 12H6',
  'M18 12H21',
]

// 实心：画布一块，挖掉对象方块的框（方块本身留实心）和四道刻度；刻度从方块一直挖穿外框，画布分成四个 L 形的角，正中是方块
export const fill = ({ radius }) => [
  solid(rounded([[3, 3], [21, 3], [21, 21], [3, 21]], Math.min(radius, 2.5))),
  knock([
    rounded([[8, 8], [16, 8], [16, 16], [8, 16]], Math.min(radius, 1.5)),
    'M12 0V8',
    'M12 16V24',
    'M0 12H8',
    'M16 12H24',
  ]),
]
