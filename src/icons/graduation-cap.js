import { crisp, rounded } from '../geometry'
import { dot } from '../scene'
import { stacked } from '../solid'

// 学位帽：上面一块压扁的菱形帽顶（2–22 × 4.5–13.5），下面是帽身（两侧竖边 6.5 / 17.5，底部向下鼓）；
// 右边一根流苏从帽顶边垂下，末端一个点压在线头上（隔开的话线头和点之间只剩一道窄缝）
const top = [[12, 4.5], [22, 9], [12, 13.5], [2, 9]]
// 菱形下边 (2, 9)–(12, 13.5) 上 x 处的 y
const edge = x => 9 + (Math.min(x, 24 - x) - 2) * 0.45
export default ({ radius }) => [
  rounded(top, crisp(radius)),
  `M6.5 ${edge(6.5)}V15.5C6.5 17.5 9 18.5 12 18.5C15 18.5 17.5 17.5 17.5 15.5V${edge(17.5)}`,
  `M19.5 ${edge(19.5)}V17.5`,
  dot(19.5, 17.5),
]

// 实心：帽顶菱形在前，完整的一块；帽身（顶上封口）在后，沿菱形让出 GAP 的缝（见 solid.js 的 stacked）——
// 缝顺着菱形下边走、两头自然穿出帽身两侧，不像挖一道线那样线帽停在帽身的两个上角、留下连着的细桥；流苏照旧是线 + 点，最后画
export const fill = ({ radius }) => [
  ...stacked(`M6.5 ${edge(6.5)}V15.5C6.5 17.5 9 18.5 12 18.5C15 18.5 17.5 17.5 17.5 15.5V${edge(17.5)}Z`, rounded(top, crisp(radius))),
  `M19.5 ${edge(19.5)}V17.5`,
  dot(19.5, 17.5),
]
