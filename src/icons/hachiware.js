import { blush, brows, eyes, face, mouth, pointOn, pointedEar, thin } from '../chiikawa'

// 小八（hachiware）：圆润的大福脸 + 两只宽底尖耳（和脸是一笔；外侧边几乎竖直地接住脸的侧边，内侧边从靠近头顶中间斜上去，耳尖不超出脸宽）
// + 头顶花纹分界（从两侧耳根往中间下凹，到中线尖尖地向上收）+ 短眉 + 圆豆豆眼 + 闭着的 ω 嘴 + 腮红
const shape = { top: 6.5, bottom: 20.5, half: 9.25, waist: 14 }
const ears = { right: [0.1, 0.62], left: [0.38, 0.9] }
const sideL = pointOn(shape, 'lt', ears.left[0])
const sideR = pointOn(shape, 'tr', ears.right[1])
export default () => [
  face(shape, {
    right: { from: ears.right[0], to: ears.right[1], draw: pointedEar([16.6, 4.3], 0.85) },
    left: { from: ears.left[0], to: ears.left[1], draw: pointedEar([7.4, 4.3], 0.85) },
  }),
  thin(`M${sideL.join(' ')}C6.5 11.3 9.8 11.3 12 8`),
  thin(`M${sideR.join(' ')}C17.5 11.3 14.2 11.3 12 8`),
  ...brows(11.9, 3.5),
  ...eyes(13.9, 3.5),
  mouth(15.75),
  ...blush(15.6, 6.6),
]
