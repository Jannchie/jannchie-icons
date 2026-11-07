import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { clear, solid, spans, tile } from '../solid'

// 书架：左边一高一矮两本竖书 + 右边一本向左斜靠的书（左上角搭在矮书顶上）+ 书架横线
// 斜书是竖放的书绕左下角 (17, 20.5) 逆时针转 20° 得到的
const a = 20 * Math.PI / 180
const [c, s] = [Math.cos(a), Math.sin(a)]
const [px, py, w, h] = [17, 20.5, 3.75, 13]
const lean = [
  [px, py],
  [px + w * c, py - w * s],
  [px + w * c - h * s, py - w * s - h * c],
  [px - h * s, py - h * c],
]

export default ({ radius }) => {
  const r = Math.min(radius, 1)
  return [
    rounded([[4.5, 20.5], [4.5, 3.5], [8.5, 3.5], [8.5, 20.5]], r, false),
    rounded([[8.5, 20.5], [8.5, 7.5], [12.5, 7.5], [12.5, 20.5]], r, false),
    rounded(lean, r),
    'M3 20.5H21',
  ]
}

// 实心：两本竖书各画一块（见 solid.js 的 tile），中间留 GAP 的缝，每本四个角都收圆（底边中心线仍在 20.5，被书架横线盖住）；
// 斜书四周让出缝再画实心；书架横线最后画，不被缝切断
export const fill = ({ radius, stroke }) => {
  const r = Math.min(radius, 1)
  const h = stroke / 2
  const [tall, short] = spans(4.5, 12.5, [8.5], stroke)
  // 斜书搭在书架上的左下角至少收 0.5 的圆角：尖角模式下这个角斜接出去会从书架横线底下冒出一个小尖
  const leaning = rounded([[px, py, Math.max(r, 0.5)], ...lean.slice(1)], r)
  return [
    tile([tall[0], 3.5 - h, tall[1], 20.5 + h], r),
    tile([short[0], 7.5 - h, short[1], 20.5 + h], r),
    clear(leaning, GAP),
    solid(leaning),
    'M3 20.5H21',
  ]
}
