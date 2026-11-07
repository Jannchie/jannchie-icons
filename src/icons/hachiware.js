import { blush, brows, eyes, face, mouth, pointOn, pointedEar, soft, thin } from '../chiikawa'
import { knock, solid } from '../solid'

// 小八（hachiware）：圆润的大福脸 + 两只宽底尖耳（和脸是一笔；外侧边几乎竖直地接住脸的侧边，内侧边从靠近头顶中间斜上去，耳尖不超出脸宽）
// + 头顶花纹分界（从两侧耳根往中间下凹，到中线尖尖地向上收）+ 短眉 + 圆豆豆眼 + 闭着的 ω 嘴 + 腮红
const shape = { top: 6.5, bottom: 20.5, half: 9.25, waist: 14 }
const ears = { right: [0.1, 0.62], left: [0.38, 0.9] }
const sideL = pointOn(shape, 'lt', ears.left[0])
const sideR = pointOn(shape, 'tr', ears.right[1])
const head = () => face(shape, {
  right: { from: ears.right[0], to: ears.right[1], draw: pointedEar([16.6, 4.3], 0.85) },
  left: { from: ears.left[0], to: ears.left[1], draw: pointedEar([7.4, 4.3], 0.85) },
})
// 花纹分界从耳根起笔；out 是起笔处顺着切线往脸外多伸出的一段（实心版挖穿脸的侧边用）
const outward = ([x, y], [cx, cy], out) => {
  const l = Math.hypot(cx - x, cy - y)
  return out ? `M${+(x - (cx - x) / l * out).toFixed(2)} ${+(y - (cy - y) / l * out).toFixed(2)}L${x} ${y}` : `M${x} ${y}`
}
const features = (out = 0) => [
  thin(`${outward(sideL, [6.5, 11.3], out)}C6.5 11.3 9.8 11.3 12 8`),
  thin(`${outward(sideR, [17.5, 11.3], out)}C17.5 11.3 14.2 11.3 12 8`),
  ...brows(11.9, 3.5),
  ...eyes(13.9, 3.5),
  mouth(15.75),
  ...blush(15.6, 6.6),
]
export default () => [head(), ...features()]

// 实心：脸（连耳朵）填实，花纹分界、五官、腮红挖空（尖角模式下也是圆头，见 chiikawa.js 的 soft）；
// 分界线在耳根处顺着方向穿出脸的两侧（不停在轮廓的中心线上留细桥），头顶的花纹自成一块，正好读成两色的头
export const fill = () => [solid(head()), knock(soft(features(1.5)))]
