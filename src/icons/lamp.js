import { ring } from '../marks'
import { knock, solid } from '../solid'

// 灯（电路符号）：圆 + 内接的叉
const cross = ['M5.64 5.64L18.36 18.36', 'M18.36 5.64L5.64 18.36']

export default ({ radius }) => [
  ring(),
  ...cross,
]

// 实心：圆面填实，叉挖空、把圆面分成四块；叉的两端顺着斜线伸到圆面外缘之外（停在圆环中线上会留一道发丝），
// 斜线比描边版长出一个线宽，线帽整个落在圆面外
export const fill = ({ stroke }) => {
  const e = 12 + (9 + stroke) * Math.SQRT1_2
  const s = 24 - e
  return [
    solid(ring()),
    knock([`M${s} ${s}L${e} ${e}`, `M${e} ${s}L${s} ${e}`]),
  ]
}
