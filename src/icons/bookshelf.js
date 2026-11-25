import { rounded } from '../geometry'

// 书架：方框（墨迹 3–21，线宽变粗往里长）+ 正中一层隔板（12）分成上下两格；每格里立着两本书（竖线）和一本斜靠着的书，都落在格子的底板上
// 上格的书靠左、斜书在右；下格反过来
// 没有实心版：框里再挖书，白线和隔板的缝连成一把梳子；实心变体直接用描边版
export default ({ radius, stroke }) => {
  const h = stroke / 2
  const [l, t, r, b] = [3 + h, 3 + h, 21 - h, 21 - h]
  return [
    rounded([[l, t], [r, t], [r, b], [l, b]], Math.min(radius, 2)),
    `M${l} 12H${r}`,
    'M7.5 12V7', 'M10.5 12V6.5', 'M13.5 12L16.5 7',
    `M16.5 ${b}V16`, `M13.5 ${b}V15.5`, `M10.5 ${b}L7.5 16`,
  ]
}
