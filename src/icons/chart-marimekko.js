import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 马赛克图（Marimekko）：方框里三列宽度不等，每列再按不同比例横向切分；
// 相邻两列的切分线上下错开至少 3，免得两个丁字接头挤在竖线同一处
export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 2)),
  'M10.5 3.5V20.5',
  'M15.5 3.5V20.5',
  'M3.5 8.5H10.5',
  'M10.5 11.5H15.5',
  'M15.5 7.5H20.5',
  'M15.5 15.5H20.5',
]

// 实心：方框一块，分隔线挖穿：碰到外框的一头伸出一个线宽，切成各自独立的块；丁字接头那头不伸，免得咬进隔壁一列
export const fill = ({ radius, stroke }) => [
  solid(rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 2))),
  knock([
    `M10.5 ${3.5 - stroke}V${20.5 + stroke}`,
    `M15.5 ${3.5 - stroke}V${20.5 + stroke}`,
    `M${3.5 - stroke} 8.5H10.5`,
    'M10.5 11.5H15.5',
    `M15.5 7.5H${20.5 + stroke}`,
    `M15.5 15.5H${20.5 + stroke}`,
  ]),
]
