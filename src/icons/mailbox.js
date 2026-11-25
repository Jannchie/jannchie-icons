import { knock, solid } from '../solid'

// 信箱（立在路边的拱顶信箱）：横放的拱顶箱体（3.5–20.5 × 4.5–13.5，两头的顶角都是半径 4 的圆拱）+ 左端的箱门（一道从箱顶弯下来的拱线，11.5）
// + 箱门上一道投信口 + 箱体右边一面竖起来的小旗 + 箱底正中的立柱（落到 20.75）
const box = 'M3.5 13.5V8.5A4 4 0 0 1 7.5 4.5H16.5A4 4 0 0 1 20.5 8.5V13.5Z'
// 箱门的拱线从 (7.5, 4.5) 起笔；实心版从箱顶上方接同一段拱线
const arch = 'A4 4 0 0 1 11.5 8.5V13.5'
const door = `M7.5 4.5${arch}`
const slot = 'M6 9.5H9'
const flag = 'M17.5 7.5H15.5V10.5'
const post = 'M12 13.5V20.75'

export default () => [box, door, slot, flag, post]

// 实心：箱体一块，箱门的拱线上下都挖穿（箱门成为单独的一片），投信口和小旗挖空；立柱照旧是线
export const fill = () => [solid(box), knock([`M7.5 2V4.5${arch}V16`, slot, flag]), post]
