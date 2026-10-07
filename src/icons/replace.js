import { circle, crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 替换：左上、右下两个方块 + 两段互相交换的弯箭头
export default ({ radius, stroke }) => [
  rounded([[3.5, 3.5], [10.5, 3.5], [10.5, 10.5], [3.5, 10.5]], Math.min(radius, 1.5)),
  rounded([[13.5, 13.5], [20.5, 13.5], [20.5, 20.5], [13.5, 20.5]], Math.min(radius, 1.5)),
  'M12.5 6.5H15.5A2 2 0 0 1 17.5 8.5V11',
  rounded(arrow(17.5, 11, 'down', 2.25), crisp(radius), false),
  'M11.5 17.5H8.5A2 2 0 0 1 6.5 15.5V13',
  rounded(arrow(6.5, 13, 'up', 2.25), crisp(radius), false),
]
