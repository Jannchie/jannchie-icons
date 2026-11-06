import { circle, rounded } from '../geometry'
import { hole, knock, solid } from '../solid'

// 证件卡：横向圆角卡片（2.5–21.5 × 5.5–18.5），左半边一个头像（头 + 肩），右半边两行字
export default ({ radius }) => [
  rounded([[2.5, 5.5], [21.5, 5.5], [21.5, 18.5], [2.5, 18.5]], Math.min(radius, 2.5)),
  circle(8.5, 10.5, 2),
  'M5 16A3.5 3 0 0 1 12 16',
  'M14.5 10.5H18.5',
  'M14.5 13.5H17.5',
]

// 实心：卡片一块，头像的头和肩挖成洞（洞外扩半个线宽后正好是描边版的中心线），两行字挖空
export const fill = ({ radius, stroke }) => {
  const h = stroke / 2
  return [
    solid(rounded([[2.5, 5.5], [21.5, 5.5], [21.5, 18.5], [2.5, 18.5]], Math.min(radius, 2.5))),
    hole([circle(8.5, 10.5, 2 - h), `M${5 + h} ${16 - h}A${3.5 - h} ${3 - h} 0 0 1 ${12 - h} ${16 - h}Z`]),
    knock(['M14.5 10.5H18.5', 'M14.5 13.5H17.5']),
  ]
}
