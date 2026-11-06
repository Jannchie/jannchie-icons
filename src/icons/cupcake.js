import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 纸杯蛋糕：云朵形奶油顶 + 上宽下窄的纸托 + 两道纸托褶
export default ({ radius }) => [
  'M6 12.5C4.5 10 6 8 8.5 8C9 5.5 10.5 4 12.5 4C15 4 16.5 6 16 8C18 8 19.5 10 18 12.5Z',
  rounded([[6, 12.5], [7.5, 20.5], [16.5, 20.5], [18, 12.5]], Math.min(radius, 1.5), false),
  'M10 12.5L10.5 20.5',
  'M14 12.5L13.5 20.5',
]

// 实心：奶油顶、纸托各一块，中间挖开一道缝；纸托的两道褶挖空，下端各缩一个线宽，纸托不被切成三条
export const fill = ({ radius, stroke }) => [
  solid('M6 12.5C4.5 10 6 8 8.5 8C9 5.5 10.5 4 12.5 4C15 4 16.5 6 16 8C18 8 19.5 10 18 12.5Z'),
  solid(rounded([[6, 12.5], [7.5, 20.5], [16.5, 20.5], [18, 12.5]], Math.min(radius, 1.5))),
  knock([`M${6 - stroke} 12.5H${18 + stroke}`, `M10 12.5L${10 + 0.5 * (8 - stroke) / 8} ${20.5 - stroke}`, `M14 12.5L${14 - 0.5 * (8 - stroke) / 8} ${20.5 - stroke}`]),
]
