import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 冰淇淋：半圆球 + 尖底蛋筒（9.5 到尖 20.5）+ 蛋筒上一道横纹；墨迹上下居中
export default ({ radius }) => [
  'M6.5 9.5A5.51 5.51 0 0 1 17.5 9.5Z',
  rounded([[6.5, 9.5], [12, 20.5], [17.5, 9.5]], Math.min(radius, 1), false),
  // 横纹两端正好落在蛋筒斜边上
  'M8.5 13.5H15.5',
]

// 实心：冰淇淋球、蛋筒各一块，中间挖开一道缝；蛋筒横纹也挖穿两侧斜边，蛋筒分成上沿一条和下面的尖底两块
export const fill = ({ radius, stroke }) => [
  solid('M6.5 9.5A5.51 5.51 0 0 1 17.5 9.5Z'),
  // 蛋筒上沿两个锐角至少给 0.5 的圆角：尖角模式下斜接出去会比描边版开口折线的方头宽
  solid(rounded([[6.5, 9.5, Math.max(0.5, Math.min(radius, 1))], [12, 20.5], [17.5, 9.5, Math.max(0.5, Math.min(radius, 1))]], Math.min(radius, 1))),
  knock([`M${6.5 - stroke} 9.5H${17.5 + stroke}`, `M${8.5 - 2 * stroke} 13.5H${15.5 + 2 * stroke}`]),
]
