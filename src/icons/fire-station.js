import { crisp, rounded } from '../geometry'
import { dot, GROUND, groundLine, opening } from '../scene'
import { hole, solid } from '../solid'

// 消防站：平顶车库，两扇卷帘门各一道横缝；屋顶正中一座带四坡顶（顶点 2.5，坡高 2：再高尖顶就出了安全边）的瞭望钟楼（高 5），楼里挂一口小钟——
// 钟楼矮了钟会上下贴边
const tower = [[9.5, 9.5], [9.5, 4.5], [14.5, 4.5], [14.5, 9.5]]
const roof = [[8.5, 4.5], [12, 2.5], [15.5, 4.5]]
const bell = dot(12, 7, 1.5)
const doors = [8, 16]
const slats = { d: 'M5.5 16.5H10.5M13.5 16.5H18.5', thin: true }

export default ({ radius }) => [
  groundLine,
  rounded([[3.5, GROUND], [3.5, 9.5], [9.5, 9.5]], radius, false),
  rounded([[14.5, 9.5], [20.5, 9.5], [20.5, GROUND]], radius, false),
  rounded(tower, radius, false),
  rounded(roof, radius, false),
  'M9.5 9.5H14.5',
  bell,
  ...doors.map(x => rounded(opening(x, 5, 6.5), radius, false)),
  slats,
]

// 实心：车库、钟楼、四坡顶连成一整块（坡顶两端的檐角只用 crisp 小圆角，大圆角会把坡顶磨成圆包；车库底下两个角贴着地平线，不收圆角）；钟楼挖空（四壁和楼板各留一个线宽，和描边版一样），
// 钟挂回洞里；两扇卷帘门挖空（洞外扩半个线宽后是门框的中心线），横缝照旧是细线、两头接在门框上；地平线最后画
export const fill = ({ radius, stroke }) => {
  const h = stroke / 2
  return [
    solid([
      rounded([[3.5, GROUND, 0], [3.5, 9.5], [20.5, 9.5], [20.5, GROUND, 0]], radius),
      rounded(tower, radius),
      rounded([[...roof[0], crisp(radius)], roof[1], [...roof[2], crisp(radius)]], radius),
    ]),
    hole(`M${9.5 + stroke} ${4.5 + stroke}H${14.5 - stroke}V${9.5 - stroke}H${9.5 + stroke}Z`),
    bell,
    ...doors.map(x => hole(rounded(opening(x, 5 - stroke, 6.5 - h), Math.max(0, radius - h), false))),
    slats,
    groundLine,
  ]
}
