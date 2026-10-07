import { crisp, rounded } from '../geometry'
import { GROUND, groundLine } from '../scene'

// 城堡：两座带垛口的塔夹一段矮城墙，塔上一道箭窗，城墙正中拱门；垛口的角不随全局圆角
// 塔宽 6：垛 2、口 2、垛 2，竖边都落在 .5 上
const merlon = 4.5
const crenel = 6.5
const tower = l => [[l, merlon], [l + 2, merlon], [l + 2, crenel], [l + 4, crenel], [l + 4, merlon], [l + 6, merlon]]

export default ({ radius }) => {
  const r = crisp(radius)
  const sharp = pts => pts.map(([x, y]) => [x, y, r])
  return [
    groundLine,
    rounded([
      [3.5, GROUND],
      ...sharp(tower(3.5)),
      [9.5, 9.5, r],
      [14.5, 9.5, r],
      ...sharp(tower(14.5)),
      [20.5, GROUND],
    ], radius, false),
    'M6.5 9.5V11.5',
    'M17.5 9.5V11.5',
    'M10.5 20.5V16.5A1.5 1.5 0 0 1 13.5 16.5V20.5',
  ]
}
