import { blush, eyes, face, longEar, mouth, soft, thin } from '../chiikawa'
import { knock, solid } from '../solid'

// 乌萨奇（usagi）：圆润的大福脸 + 两只又长又直、靠得很近的兔耳（和脸是一笔）
// + 究极八字眉（从眼睛外下方往内上方弯的大弧）+ 圆豆豆眼 + ω 嘴中间往下垂半个向左鼓的小勾（撅起来的下嘴唇），兜到最低点就收住 + 腮红
const shape = { top: 8.5, bottom: 21.5, half: 9.25, waist: 15.25 }
const head = () => face(shape, { right: { from: 0.07, to: 0.28, draw: longEar(0.75) }, left: { from: 0.72, to: 0.93, draw: longEar(0.75) } })
const features = () => [
  thin('M6.6 14.1C6.6 12.5 7.6 11.2 9.1 11'),
  thin('M17.4 14.1C17.4 12.5 16.4 11.2 14.9 11'),
  ...eyes(15.25, 3.5),
  mouth(17.4),
  thin('M12 16.95C11.4 17.5 11.3 18.45 12 18.75C12.09 18.79 12.18 18.8 12.26 18.8'),
  ...blush(17.1, 6.6),
]
export default () => [head(), ...features()]

// 实心：脸（连耳朵）填实，眉、五官、腮红挖空（尖角模式下也是圆头，见 chiikawa.js 的 soft）
export const fill = () => [solid(head()), knock(soft(features()))]
