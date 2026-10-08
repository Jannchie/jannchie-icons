import { rounded } from '../geometry'

// 画布正中：画布外框（3–21，正方形，中心 12）+ 正中的对象方块（8–16）+ 四边中点伸向方块的短刻度
export default ({ radius }) => [
  rounded([[3, 3], [21, 3], [21, 21], [3, 21]], Math.min(radius, 2.5)),
  rounded([[8, 8], [16, 8], [16, 16], [8, 16]], Math.min(radius, 1.5)),
  'M12 3V6',
  'M12 18V21',
  'M3 12H6',
  'M18 12H21',
]
