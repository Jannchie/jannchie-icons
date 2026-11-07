import { crisp, rounded } from '../geometry'
import { GROUND, groundLine } from '../scene'
import { hole, knock, solid } from '../solid'

// 城堡：两座带垛口的塔夹一段矮城墙，塔上一道箭窗，城墙正中拱门；垛口的角不随全局圆角
// 塔宽 6：垛 2、口 2、垛 2，竖边都落在 .5 上
const merlon = 4.5
const crenel = 6.5
const tower = l => [[l, merlon], [l + 2, merlon], [l + 2, crenel], [l + 4, crenel], [l + 4, merlon], [l + 6, merlon]]
const wall = (radius, closed) => {
  const r = crisp(radius)
  const sharp = pts => pts.map(([x, y]) => [x, y, r])
  return rounded([
    [3.5, GROUND, 0],
    ...sharp(tower(3.5)),
    [9.5, 9.5, r],
    [14.5, 9.5, r],
    ...sharp(tower(14.5)),
    [20.5, GROUND, 0],
  ], radius, closed)
}
const slits = ['M6.5 9.5V11.5', 'M17.5 9.5V11.5']

export default ({ radius }) => [
  groundLine,
  wall(radius, false),
  ...slits,
  'M10.5 20.5V16.5A1.5 1.5 0 0 1 13.5 16.5V20.5',
]

// 实心：塔和城墙连成的一整块（底下两个角贴着地平线，不收圆角），两道箭窗挖空；
// 拱门挖空（洞外扩半个线宽后是门框的中心线）；地平线最后画
export const fill = ({ radius, stroke }) => {
  const h = stroke / 2
  return [
    solid(wall(radius, true)),
    knock(slits),
    hole(`M${10.5 + h} ${GROUND}V16.5A${1.5 - h} ${1.5 - h} 0 0 1 ${13.5 - h} 16.5V${GROUND}Z`),
    groundLine,
  ]
}
