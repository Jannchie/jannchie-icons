import { blush, brows, eyes, face, mouth, roundEar } from '../chiikawa'

// 吉伊（chiikawa）：圆润的大福脸 + 长在头顶两个斜角上、往斜上方鼓出的小圆耳（和脸是一笔）+ 短眉 + 圆豆豆眼 + ω 嘴 + 腮红
const shape = { top: 6.5, bottom: 20.5, half: 9.25, waist: 14 }
export default () => [
  face(shape, { right: { from: 0.21, to: 0.41, draw: roundEar(1.6) }, left: { from: 0.59, to: 0.79, draw: roundEar(1.6) } }),
  ...brows(11.25, 3.5),
  ...eyes(13.5, 3.5),
  mouth(15.75),
  ...blush(15.5, 6.6),
]
