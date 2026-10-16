import { crisp, rounded } from '../geometry'
import { arrow } from '../media'
import base from './wall-half'

// 压低的墙：半墙（wall-half）+ 上方一支向下的箭头（竖线 x 11.5，2.5 → 9.5，尖端离墙顶 3）——墙被往下压到一半
export default opts => [
  ...base(opts),
  'M11.5 2.5V9.5',
  rounded(arrow(11.5, 9.5, 'down', 2.5), crisp(opts.radius), false),
]
