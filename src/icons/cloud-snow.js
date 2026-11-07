import { solid } from '../solid'
import { cloud } from '../symbols'
import { dot, eye } from '../scene'

// 雪：云 + 两排错开的雪点
export default () => [
  ...cloud([12, 9.5], 2.2),
  ...[[8, 18], [12, 18], [16, 18], [10, 21], [14, 21]].map(([x, y]) => dot(x, y)),
]

// 实心：云一块，雪点是圆点（尖角模式下也是圆的，粗字重下不再变大）：方点在粗字重下连成一排方块、贴到云底
export const fill = () => [
  ...solid(cloud([12, 9.5], 2.2)),
  ...[[8, 18], [12, 18], [16, 18], [10, 21], [14, 21]].map(([x, y]) => eye(x, y)),
]
