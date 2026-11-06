import { ring } from '../marks'
import { knock, solid } from '../solid'

// 篮球：圆 + 横竖两道中缝（落在 12.5 上） + 左右两道向内弯的弧缝
export default ({ radius }) => [
  ring(),
  'M12.5 3V21',
  'M3 12.5H21',
  'M5.6 5.6C8.25 8.25 8.25 15.75 5.6 18.4',
  'M18.4 5.6C15.75 8.25 15.75 15.75 18.4 18.4',
]

// 实心：球一块，挖掉四道缝
export const fill = ({ stroke }) => {
  // 缝线两端顺着切线往外多伸一个线宽，把球边切干净，不留连着的细丝
  const e = stroke * Math.SQRT1_2
  return [
    solid(ring()),
    knock([
      `M12.5 ${3 - stroke}V${21 + stroke}`,
      `M${3 - stroke} 12.5H${21 + stroke}`,
      `M${5.6 - e} ${5.6 - e}L5.6 5.6C8.25 8.25 8.25 15.75 5.6 18.4L${5.6 - e} ${18.4 + e}`,
      `M${18.4 + e} ${5.6 - e}L18.4 5.6C15.75 8.25 15.75 15.75 18.4 18.4L${18.4 + e} ${18.4 + e}`,
    ]),
  ]
}
