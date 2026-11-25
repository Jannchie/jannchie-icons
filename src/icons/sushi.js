import { rounded, through } from '../geometry'
import { knock, solid } from '../solid'

// 寿司（三文鱼握寿司，侧视）：下面一块饭团（5.5–18.5 × 13.5–18.5）+ 盖在上面的一片鱼生（拱起来的一片，2.5–21.5，顶到 6.5，
// 两头垂下来盖过饭团的肩，底边平贴在饭团上）+ 鱼生上三道从拱顶斜切到底边的纹路（三文鱼的油花）
// 两层 + 贯穿的斜纹是握寿司的记号，和三层的汉堡、带切口的面包区分开
const fish = 'M2.5 12C2.5 8.75 6.5 6.5 12 6.5C17.5 6.5 21.5 8.75 21.5 12C21.5 12.85 20.85 13.5 20 13.5H4C3.15 13.5 2.5 12.85 2.5 12Z'
const rice = radius => rounded([[5.5, 13.5], [5.5, 18.5], [18.5, 18.5], [18.5, 13.5]], Math.min(radius, 2), false)
// 每道纹路的两个端点：上端落在鱼生的拱顶上，下端落在底边上
const STRIPES = [[[9.75, 6.65], [7.75, 13.5]], [[14, 6.6], [12, 13.5]], [[18.25, 7.75], [16.25, 13.5]]]

export default ({ radius }) => [fish, rice(radius), ...STRIPES.map(([a, b]) => through(a, b, 0))]

// 实心：鱼生、饭团各一块，交界整条挖穿；三道纹路从拱顶外面一直切到交界，鱼生分成四片
export const fill = ({ radius, stroke }) => [
  solid([fish, `${rice(radius)}Z`]),
  knock(['M1 13.5H23', ...STRIPES.map(([a, b]) => through(a, b, stroke * 2, 0))]),
]
