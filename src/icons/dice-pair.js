import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { dot } from '../scene'
import { clear, knock, solid } from '../solid'

// 两颗骰子：前面一颗完整（三点斜排），后面一颗只画露出的左上部分（三个点）
export default ({ radius }) => [
  rounded([[9.5, 9.5], [20.5, 9.5], [20.5, 20.5], [9.5, 20.5]], Math.min(radius, 2)),
  dot(12.25, 12.25, 2.5),
  dot(15, 15, 2.5),
  dot(17.75, 17.75, 2.5),
  rounded([[14.5, 6.5], [14.5, 3.5], [3.5, 3.5], [3.5, 14.5], [6.5, 14.5]], Math.min(radius, 2), false),
  dot(6.5, 6.5, 2.5),
  dot(11.5, 6.5, 2.5),
  dot(6.5, 11.5, 2.5),
]

// 实心：后面一颗整块填实、挖掉三个点，在前面一颗四周让出缝（和角标的间隙一样）；前面一颗填实、挖掉三个点
export const fill = ({ radius }) => {
  const front = rounded([[9.5, 9.5], [20.5, 9.5], [20.5, 20.5], [9.5, 20.5]], Math.min(radius, 2))
  return [
    solid(rounded([[3.5, 3.5], [14.5, 3.5], [14.5, 14.5], [3.5, 14.5]], Math.min(radius, 2))),
    knock([dot(6.5, 6.5, 2.5), dot(11.5, 6.5, 2.5), dot(6.5, 11.5, 2.5)]),
    clear(front, GAP),
    solid(front),
    knock([dot(12.25, 12.25, 2.5), dot(15, 15, 2.5), dot(17.75, 17.75, 2.5)]),
  ]
}
