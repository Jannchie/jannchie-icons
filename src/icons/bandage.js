import { dot } from '../scene'
import { knock, solid } from '../solid'
import { rotate } from '../transform'

// 创可贴：先横着画（3–21 × 8.5–15.5，两头半圆），中间的药垫用两道竖线隔出（9.5 / 14.5，垂直接在上下边上），
// 药垫里两个透气孔点；再整体绕中心转 -45°
export default () => [
  ...[
    'M6.5 8.5H17.5A3.5 3.5 0 0 1 17.5 15.5H6.5A3.5 3.5 0 0 1 6.5 8.5Z',
    'M9.5 8.5V15.5M14.5 8.5V15.5',
  ].map(d => rotate(d, -45)),
  ...[[11, 11], [13, 13]].map(([x, y]) => dot(x, y, 1.5)),
]

// 实心：创可贴一块，挖掉药垫两侧的竖线（两端各缩一个线宽，药垫和两翼连成一块）和两个透气孔
export const fill = ({ stroke }) => [
  solid(rotate('M6.5 8.5H17.5A3.5 3.5 0 0 1 17.5 15.5H6.5A3.5 3.5 0 0 1 6.5 8.5Z', -45)),
  knock([
    rotate(`M9.5 ${8.5 + stroke}V${15.5 - stroke}M14.5 ${8.5 + stroke}V${15.5 - stroke}`, -45),
    ...[[11, 11], [13, 13]].map(([x, y]) => dot(x, y, 1.5)),
  ]),
]
