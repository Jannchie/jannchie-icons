import { knock, solid } from '../solid'

// 墓碑：圆拱顶的石碑（6.5–17.5，拱顶到 3.5，落到地面 20.5）+ 碑面上一个十字架（竖 7–14，横 9.5–14.5 在 9.5）+ 一条地面线（3.5–20.5）
// 靠「拱顶的碑 + 十字」认出来
const stone = 'M6.5 20.5V9A5.5 5.5 0 0 1 17.5 9V20.5'
const cross = ['M12 7V14', 'M9.5 9.5H14.5']
const ground = 'M3.5 20.5H20.5'

export default () => [stone, ...cross, ground]

// 实心：石碑一块，十字架挖空；地面线照旧是线
export const fill = () => [solid(`${stone}Z`), knock(cross), ground]
