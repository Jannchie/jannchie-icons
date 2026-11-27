import { GAP } from '../clearance'
import { circle, oval } from '../geometry'
import { clear, hole, solid } from '../solid'
import { rotate, translate } from '../transform'

// 铃鼓（斜着看）：椭圆的鼓面（圆心 (12, 7.5)、半径 8.75 × 4）+ 鼓面下面一圈深鼓框（高 8）+ 鼓框上三片小镲（正对着看的小圆片，半径 1.4，
// 嵌在侧壁半腰的槽里，顺着鼓框的弧度排开）；整个往左上抬 12°，像拿在手里摇的样子，转完往下挪一点，墨迹上下居中
// 靠「鼓框上一排圆的小镲」认出来：小镲画成短横线、鼓框太浅的话像冰球、药盒；drum 的鼓身上是竖的鼓绳，还有两根鼓棒
const t = d => translate(rotate(d, -12), 0.1, 0.5)
const face = t(oval(12, 7.5, 8.75, 4))
const wall = 'M3.25 7.5V15.5A8.75 4 0 0 0 20.75 15.5V7.5'
const zils = [[6.9, 14.75], [12, 15.5], [17.1, 14.75]].map(([x, y]) => t(circle(x, y, 1.4)))

export default () => [face, t(wall), ...zils]

// 实心：鼓框一块，三片小镲挖成圆洞（和描边版小圆的外缘一样大）；鼓面是完整的椭圆、叠在前面，鼓框沿鼓面让出缝
export const fill = () => [
  solid(t(`${wall}A8.75 4 0 0 1 3.25 7.5Z`)),
  hole(zils),
  clear(face, GAP),
  solid(face),
]
