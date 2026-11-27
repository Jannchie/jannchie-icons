import { rounded, through } from '../geometry'
import { knock, solid } from '../solid'

// 太阳能板：斜架着的一块光伏板，从正面稍微仰视——上窄下宽的梯形（上边 6.5–17.5 在 3.5，下边 2.5–21.5 在 14.5），
// 板面两道往下撇开的竖线、一道横线（8.5，近大远小所以偏上）分成 3 × 2 六格电池片；板子底下一根立柱（12）落到底座（8.5–15.5 在 20.5）
// 靠「梯形 + 格子 + 支架」认出来
const TOP = [[6.5, 3.5], [17.5, 3.5]]
const BOTTOM = [[21.5, 14.5], [2.5, 14.5]]
const panel = radius => rounded([...TOP, ...BOTTOM], Math.min(radius, 1))
// 两道竖线：上下边各三等分
const COLS = [[[10.17, 3.5], [8.83, 14.5]], [[13.83, 3.5], [15.17, 14.5]]]
// 横线两端落在两条斜边上（y = 8.5 处 x = 4.68 / 19.32）
const ROW = [[4.68, 8.5], [19.32, 8.5]]
const stand = ['M12 14.5V20.5', 'M8.5 20.5H15.5']

export default ({ radius }) => [panel(radius), ...COLS.map(([a, b]) => through(a, b, 0)), through(...ROW, 0), ...stand]

// 实心：板子一块，三道格线两头都挖穿，分成六片电池片；支架照旧是线
export const fill = ({ radius, stroke }) => [
  solid(panel(radius)),
  knock([...COLS.map(([a, b]) => through(a, b, stroke * 2)), through(...ROW, stroke * 2)]),
  ...stand,
]
