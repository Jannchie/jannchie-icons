import { rounded } from '../geometry'
import { knock, solid } from '../solid'
import { rotate } from '../transform'

// 荧光笔：胖笔身 → 收窄的笔颈 → 斜切的扁头，先竖直画再顺时针转 30°；
// 笔头下方一道水平的荧光线（不跟着转），表示画出的高亮痕迹
export default ({ radius }) => {
  const r = Math.min(radius, 1.5)
  return [
    rotate(rounded([[8.5, 2.5], [15.5, 2.5], [15.5, 10], [8.5, 10]], r), 30),
    rotate(rounded([[8.5, 10], [10, 13.5], [14, 13.5], [15.5, 10]], Math.min(radius, 0.75), false), 30),
    rotate(rounded([[10, 13.5], [10, 17.5], [14, 15.5], [14, 13.5]], Math.min(radius, 0.75), false), 30),
    'M3.5 19.5H10',
  ]
}

// 实心：笔身、笔颈、笔头各一块，之间挖开两道缝；荧光线照旧是线
export const fill = ({ radius }) => {
  const r = Math.min(radius, 1.5)
  return [
    solid([
      rotate(rounded([[8.5, 2.5], [15.5, 2.5], [15.5, 10], [8.5, 10]], r), 30),
      rotate(rounded([[8.5, 10], [10, 13.5], [14, 13.5], [15.5, 10]], Math.min(radius, 0.75)), 30),
      rotate(rounded([[10, 13.5], [10, 17.5], [14, 15.5], [14, 13.5]], Math.min(radius, 0.75)), 30),
    ]),
    knock([rotate('M8 10H16', 30), rotate('M9.5 13.5H14.5', 30)]),
    'M3.5 19.5H10',
  ]
}
