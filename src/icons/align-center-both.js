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

// 实心：画布一块，挖掉对象方块的框（方块本身留实心）和四道刻度；刻度在外框那头缩一个线宽，外框不被挖出缺口
export const fill = ({ radius, stroke }) => [
  solid(rounded([[3, 3], [21, 3], [21, 21], [3, 21]], Math.min(radius, 2.5))),
  knock([
    rounded([[8, 8], [16, 8], [16, 16], [8, 16]], Math.min(radius, 1.5)),
    `M12 ${3 + stroke}V6`,
    `M12 18V${21 - stroke}`,
    `M${3 + stroke} 12H6`,
    `M18 12H${21 - stroke}`,
  ]),
]
