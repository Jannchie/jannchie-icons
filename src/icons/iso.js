import { rounded } from '../geometry'
import { label } from '../letters'
import { knock, solid } from '../solid'

// 感光度：圆角方框 + 线条字母 ISO
export default ({ radius }) => [
  rounded([[2.5, 6.5], [21.5, 6.5], [21.5, 17.5], [2.5, 17.5]], Math.min(radius, 2.5)),
  ...label('iso', { left: 5.5, right: 18.5, top: 9 }),
]

// 实心：方框一块，字母挖空
export const fill = ({ radius }) => [
  solid(rounded([[2.5, 6.5], [21.5, 6.5], [21.5, 17.5], [2.5, 17.5]], Math.min(radius, 2.5))),
  knock(label('iso', { left: 5.5, right: 18.5, top: 9 })),
]
