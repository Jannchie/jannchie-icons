import { GAP } from '../clearance'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 折扇：打开的扇面是一段圆环（扇钉在 (12, 17.5)，外沿半径 11、内沿半径 5.5，左右各张开 57°），一条闭合轮廓；
// 四根扇骨从扇钉放射出去：±57° 的两根接到扇面两边的下角（和扇面的侧边同一条线），±19° 的两根穿过扇面到外沿（扇面上的折痕）；
// 扇骨在扇钉处收拢，扇钉是一颗圆点（尖角模式下把收拢的线头盖住）
const [px, py, R, r] = [12, 17.5, 11, 5.5]
const f = v => +v.toFixed(3)
// 从正上方量的角度（往右为正）
const at = (deg, k) => `${f(px + k * Math.sin(deg * Math.PI / 180))} ${f(py - k * Math.cos(deg * Math.PI / 180))}`
const leaf = `M${at(-57, R)}A${R} ${R} 0 0 1 ${at(57, R)}L${at(57, r)}A${r} ${r} 0 0 0 ${at(-57, r)}Z`
const rib = (deg, from, to) => `M${at(deg, from)}L${at(deg, to)}`
const rivet = dot(px, py, 2.5)

export default () => [leaf, rib(-57, 0, r), rib(57, 0, r), rib(-19, 0, R), rib(19, 0, R), rivet]

// 实心：两个面——扇面（圆环那一段）和扇面以下收拢的扇骨（一整块小扇形，两条边和扇面的侧边在同一条线上），中间一道 GAP 宽的弧形缝；
// 扇面上两道折痕里外都挖穿，分成三片。扇骨不再一根根画成线（细线托着厚扇面，头重脚轻）
export const fill = ({ stroke }) => {
  const r0 = r - stroke - GAP
  return [
    solid(leaf),
    knock([-19, 19].map(deg => rib(deg, r - stroke * 1.5, R + stroke * 1.5))),
    solid(`M${px} ${py}L${at(-57, r0)}A${f(r0)} ${f(r0)} 0 0 1 ${at(57, r0)}Z`),
  ]
}
