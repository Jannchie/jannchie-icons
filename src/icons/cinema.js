import { crisp, rounded, through } from '../geometry'
import { doorway, GROUND, groundLine, opening } from '../scene'
import { knock, solid } from '../solid'
import { rotate } from '../transform'

// 电影院：楼身是一块场记板的板身（平顶楼 4.5–19.5，顶在 9.5），门在正中；
// 楼顶是掀开的拍杆：一根 3 高的长条（4.5–19.5 × 6.5–9.5）绕左下角的铰点 (4.5, 9.5) 逆时针抬起 12°，杆上三道斜条纹。
// 掀开的场记板拍杆是记号：别的楼都是平顶或坡顶，场记板一眼就是电影
const hinge = [4.5, 9.5]
const lift = d => rotate(d, -12, hinge)
const body = [[4.5, GROUND, 0], [4.5, 9.5], [19.5, 9.5], [19.5, GROUND, 0]]
const clapper = radius => lift(rounded([[4.5, 6.5], [19.5, 6.5], [19.5, 9.5], [4.5, 9.5, crisp(radius)]], crisp(radius)))
// 条纹：杆上从下沿斜到上沿的三道（下端在 x = 7.5 / 11.5 / 15.5，往右斜 2）
const stripes = [7.5, 11.5, 15.5].map(x => [[x, 9.5], [x + 2, 6.5]])

export default ({ radius }) => [
  groundLine,
  rounded(body, radius, false),
  clapper(radius),
  ...stripes.map(([a, b]) => lift(through(a, b, 0))),
  rounded(opening(12, 3, 5), radius, false),
]

// 实心：楼身一块（门挖空），拍杆一块、三道条纹挖穿，分成四段；地平线最后画
export const fill = ({ radius, stroke }) => [
  solid(rounded(body, radius)),
  doorway(12, 3, 5, radius, stroke),
  solid(clapper(radius)),
  knock(stripes.map(([a, b]) => lift(through(a, b, stroke * 2)))),
  groundLine,
]
