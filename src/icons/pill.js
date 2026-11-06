import { knock, solid } from '../solid'
import { rotate } from '../transform'

// 胶囊药：先横着画（4–20 × 8.5–15.5，两头是半径 3.5 的半圆），中间一道竖线分成两截，再整体绕中心转 -45°
// 分隔线两端垂直接在胶囊的上下边上，没有斜接的线头
export default () => [
  rotate('M7.5 8.5H16.5A3.5 3.5 0 0 1 16.5 15.5H7.5A3.5 3.5 0 0 1 7.5 8.5Z', -45),
  rotate('M12 8.5V15.5', -45),
]

// 实心：胶囊一块，挖掉中间的分隔线（两截分开）
export const fill = ({ stroke }) => [
  solid(rotate('M7.5 8.5H16.5A3.5 3.5 0 0 1 16.5 15.5H7.5A3.5 3.5 0 0 1 7.5 8.5Z', -45)),
  knock(rotate(`M12 ${8.5 - stroke}V${15.5 + stroke}`, -45)),
]
