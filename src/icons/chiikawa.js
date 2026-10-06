import { blush, brows, eyes, face, mouth, roundEar } from '../chiikawa'

// 吉伊（chiikawa）：圆润的大福脸 + 长在头顶两个斜角上、往斜上方鼓出的小圆耳（和脸是一笔）+ 短眉 + 圆豆豆眼 + ω 嘴 + 腮红
const shape = { top: 6.5, bottom: 20.5, half: 9.25, waist: 14 }
export default () => [
  face(shape, { right: { from: 0.18, to: 0.44, draw: roundEar(2.1) }, left: { from: 0.56, to: 0.82, draw: roundEar(2.1) } }),
  ...brows(11.25, 3.5),
  ...eyes(13.5, 3.5),
  mouth(15.75),
  ...blush(15.5, 6.6),
]
