import { circle } from '../geometry'
import { dot } from '../scene'

// 病毒：圆形病毒体（半径 5）+ 八根刺突，每根末端一个圆点；刺突从 22.5° 起每隔 45° 一根，
// 都是斜的——没有横竖的刺突，圆心就可以放在 (12, 12) 不用顾及像素网格
// 刺突 5 → 7.5，圆点（直径 2.5）圆心在 8.25：外缘到 9.5，留在离边 2 的安全区内；内缘和病毒体隔得开，粗字重下不挤
// 病毒体里两个小点（左上大、右下小）表示表面的斑点
const [R, spike, knob] = [5, 7.5, 8.25]
const at = (deg, d) => [12 + d * Math.cos(deg * Math.PI / 180), 12 + d * Math.sin(deg * Math.PI / 180)].map(v => +v.toFixed(3))

export default () => {
  const angles = Array.from({ length: 8 }, (_, i) => 22.5 + i * 45)
  return [
    circle(12, 12, R),
    ...angles.map(a => `M${at(a, R).join(' ')}L${at(a, spike).join(' ')}`),
    ...angles.map(a => dot(...at(a, knob), 2.5)),
    dot(10.5, 10.75),
    dot(13.5, 13.25, 1.5),
  ]
}
