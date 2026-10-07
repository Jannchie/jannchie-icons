import { rounded } from '../geometry'

// 看板：外框（3.5–21.5 × 3.5–20.5，和 layout-* 同样整体右移半格）+ 三列高低不一的卡片条（竖线 7.5 起，离顶边 4）
export default ({ radius }) => [
  rounded([[3.5, 3.5], [21.5, 3.5], [21.5, 20.5], [3.5, 20.5]], Math.min(radius, 2.5)),
  'M8.5 7.5V16.5',
  'M12.5 7.5V12.5',
  'M16.5 7.5V14.5',
]
