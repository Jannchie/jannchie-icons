import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 矩形树图：方框里层层切分的矩形
export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 2)),
  'M12.5 3.5V20.5',
  'M3.5 12.5H12.5',
  'M12.5 9.5H20.5',
  'M16.5 9.5V20.5',
]

// 实心：方框一块，分隔线挖穿：碰到外框的一头伸出一个线宽，切成各自独立的块；丁字接头那头不伸
export const fill = ({ radius, stroke }) => [
  solid(rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 2))),
  knock([
    `M12.5 ${3.5 - stroke}V${20.5 + stroke}`,
    `M${3.5 - stroke} 12.5H12.5`,
    `M12.5 9.5H${20.5 + stroke}`,
    `M16.5 9.5V${20.5 + stroke}`,
  ]),
]
