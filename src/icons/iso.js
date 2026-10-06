import { rounded } from '../geometry'
import { label } from '../letters'

// 感光度：圆角方框 + 线条字母 ISO
export default ({ radius }) => [
  rounded([[2.5, 6.5], [21.5, 6.5], [21.5, 17.5], [2.5, 17.5]], Math.min(radius, 2.5)),
  ...label('iso', { left: 5.5, right: 18.5, top: 9 }),
]
