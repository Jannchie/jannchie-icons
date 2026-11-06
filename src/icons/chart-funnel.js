import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 漏斗图：45° 斜边的漏斗 + 两道分层线
export default ({ radius }) => [
  // 顶边、颈口、底边都在 .5 上；颈口两角不倒圆，分层线两端正好落在角上，不会被吸歪
  rounded([[3.5, 3.5], [20.5, 3.5], [13.5, 10.5, 0], [13.5, 20.5], [10.5, 20.5], [10.5, 10.5, 0]], Math.min(radius, 1)),
  'M7.5 7.5H16.5',
  'M10.5 10.5H13.5',
]

// 实心：漏斗一块，两道分层线两头各伸出斜边一个线宽，把漏斗切成三层
export const fill = ({ radius, stroke }) => [
  solid(rounded([[3.5, 3.5], [20.5, 3.5], [13.5, 10.5, 0], [13.5, 20.5], [10.5, 20.5], [10.5, 10.5, 0]], Math.min(radius, 1))),
  knock([`M${7.5 - stroke} 7.5H${16.5 + stroke}`, `M${10.5 - stroke} 10.5H${13.5 + stroke}`]),
]
