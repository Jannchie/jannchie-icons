import { crisp, rounded } from '../geometry'
import { dot, GROUND, groundLine } from '../scene'
import { hole, solid, stacked } from '../solid'

// 清真寺：正中洋葱顶，顶尖一颗圆点压在尖上当顶饰（离开尖的话中间只剩一道窄缝）；两侧尖顶宣礼塔，正中拱门；宣礼塔塔尖不随全局圆角
const minaret = (cx, radius) => rounded([[cx - 1, GROUND], [cx - 1, 8.5], [cx, 5.5, crisp(radius)], [cx + 1, 8.5], [cx + 1, GROUND]], radius, false)
const dome = 'M7.5 11.5C7.5 8 11.5 7.5 12 5C12.5 7.5 16.5 8 16.5 11.5'

export default ({ radius }) => [
  groundLine,
  dome,
  'M7.5 11.5H16.5',
  `M7.5 11.5V${GROUND}`,
  `M16.5 11.5V${GROUND}`,
  dot(12, 4),
  minaret(4.5, radius),
  minaret(19.5, radius),
  `M10.5 ${GROUND}V17A1.5 1.5 0 0 1 13.5 17V${GROUND}`,
]

// 实心：礼拜殿、洋葱顶、两座宣礼塔各一块：洋葱顶画在礼拜殿前面，殿身在它下面让出 GAP 的缝；
// 宣礼塔离殿墙很近（粗字重下墨迹相碰），殿身两侧也给塔让出 GAP；拱门挖空；顶饰圆点和地平线照旧
export const fill = ({ radius, stroke }) => {
  const r = 1.5 - stroke / 2
  return [
    ...stacked(`M7.5 ${GROUND}V11.5H16.5V${GROUND}Z`, `${dome}Z`, [4.5, 19.5].map(x => `${minaret(x, radius)}Z`)),
    hole(`M${10.5 + stroke / 2} ${GROUND}V17A${r} ${r} 0 0 1 ${13.5 - stroke / 2} 17V${GROUND}Z`),
    dot(12, 4),
    groundLine,
  ]
}
