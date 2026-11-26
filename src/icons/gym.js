import { rounded } from '../geometry'
import { doorway, GROUND, groundLine, opening } from '../scene'
import { knock, solid } from '../solid'

// 健身房：拱顶的体育馆（墙 4.5 / 19.5，拱是半径 7.5 × 6 的半个椭圆，顶到 4.5），墙上一只横放的哑铃，门在下面正中。
// 哑铃照 dumbbell 的造法缩成线：里侧两片大杠铃片（9.5 / 14.5，高 5）、外侧两片小的（7.5 / 16.5，高 3），一根横杆穿过去接在外侧两片上。
// 哑铃是记号；拱顶和别的平顶、坡顶建筑区分开
const hall = `M4.5 ${GROUND}V10.5A7.5 6 0 0 1 19.5 10.5V${GROUND}`
const dumbbell = ['M7.5 11.5H16.5', 'M9.5 9V14', 'M14.5 9V14', 'M7.5 10V13', 'M16.5 10V13']

export default ({ radius }) => [
  groundLine,
  hall,
  ...dumbbell,
  rounded(opening(12, 3, 4), radius, false),
]

// 实心：楼身一块，哑铃挖空，门挖空；地平线最后画
export const fill = ({ radius, stroke }) => [
  solid(`${hall}Z`),
  knock(dumbbell),
  doorway(12, 3, 4, radius, stroke),
  groundLine,
]
